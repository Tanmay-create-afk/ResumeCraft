# Resume Builder Web Application

A full-stack Resume Builder built with **React + Vite + Tailwind CSS** (Frontend) and **Node.js + Express + MongoDB** (Backend).

---

## 🚀 Getting Started

### 1. Frontend Setup
Navigate to the `Frontend` folder and run:
```bash
cd Frontend
npm install    # (already installed)
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

#### Frontend Features:
- **Live Split-screen Preview**: Changes reflect instantly on the right-hand preview panel.
- **Auto-save**: Resumes are automatically saved in browser `localStorage`.
- **Multiple Templates**: Switch between **Modern Professional** and **Minimal ATS**.
- **Color Customization**: Choose accent colors for your template.
- **One-Click PDF Export**: High-resolution PDF generation using `html2canvas` + `jspdf`.
- **Restore & Clear**: Pre-filled with realistic sample data and a quick clear option.

---

### 2. Backend Setup
Navigate to the `backend` folder and run:
```bash
cd backend
npm install    # (already installed)
npm run dev    # or 'npm start'
```
Backend runs on **[http://localhost:5000](http://localhost:5000)**.

#### Database Configuration:
Inside `backend/.env`, set your MongoDB connection string:
- Local MongoDB: `mongodb://127.0.0.1:27017/resumebuilder`
- MongoDB Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/resumebuilder`

---

## 📡 API Endpoints

### Authentication
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Log in and receive a JWT token (`email`, `password`) |

### Resumes (Protected with Bearer Token)
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/resumes` | Get all saved resumes for the authenticated user |
| `POST` | `/api/resumes` | Create and save a new resume |
| `PUT` | `/api/resumes/:id` | Update an existing resume |
| `DELETE` | `/api/resumes/:id` | Delete a saved resume |
