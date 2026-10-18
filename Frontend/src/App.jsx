import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-slate-50 text-slate-800 font-jakarta">

          <Navbar />
          <div className="flex-1">
            <AppRoutes />
          </div>
        </div>
      </ResumeProvider>
    </BrowserRouter>
  );
}
