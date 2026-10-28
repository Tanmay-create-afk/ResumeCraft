import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json({ limit: '10mb' }));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://tanmayyawalkar3_db_user:dkE08MRqWr0Xenr7@ac-zx3aohw-shard-00-00.qhkt9lz.mongodb.net:27017,ac-zx3aohw-shard-00-01.qhkt9lz.mongodb.net:27017,ac-zx3aohw-shard-00-02.qhkt9lz.mongodb.net:27017/resumecraft?ssl=true&replicaSet=atlas-yyapov-shard-0&authSource=admin';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_resume_builder_2026';

let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState >= 1) {
    return cachedDb;
  }
  cachedDb = await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 8000,
  });
  return cachedDb;
}

// Ensure DB is connected for every request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Resume Schema
const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, default: 'My Professional Resume' },
    isPublic: { type: Boolean, default: false },
    shareSlug: { type: String, sparse: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Auth Middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(400).json({ message: 'User already exists with this email address' });
    }
    const user = await User.create({ name: name.trim(), email: cleanEmail, password });
    console.log(`✅ Successfully created user in Atlas: ${user.email} (${user._id})`);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: err.message || 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error during login' });
  }
});

// Current User Profile
app.get('/api/auth/me', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

// Get All Resumes
app.get('/api/resumes', protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resumes' });
  }
});

// Save / Create Resume
app.post('/api/resumes', protect, async (req, res) => {
  try {
    const { title, data } = req.body;
    const resume = await Resume.create({
      userId: req.user._id,
      title: title || 'My Professional Resume',
      data: data || {},
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save resume' });
  }
});

// Update Resume
app.put('/api/resumes/:id', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    if (req.body.title !== undefined) resume.title = req.body.title;
    if (req.body.data !== undefined) resume.data = req.body.data;
    const updated = await resume.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update resume' });
  }
});

// Delete Resume
app.delete('/api/resumes/:id', protect, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete resume' });
  }
});

export default app;
