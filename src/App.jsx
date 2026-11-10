import React, { useState } from 'react';
import SuperAdminPanel from './pages/SuperAdminPanel';
import HostScreen from './pages/HostScreen';
import StudentScreen from './pages/StudentScreen';
import { ShieldCheck, Smartphone } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('HOME');
  const [activeRoomId, setActiveRoomId] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <span className="font-black text-amber-400 tracking-wider">FANTASY EDU LADDERS</span>
        <div className="flex space-x-2">
          <button onClick={() => setView('SUPER_ADMIN')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-bold flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Lisensi</span>
          </button>
          <button onClick={() => setView('STUDENT')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-bold flex items-center space-x-1">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Layar Siswa</span>
          </button>
        </div>
      </nav>

      {view === 'SUPER_ADMIN' && <SuperAdminPanel />}
      {view === 'STUDENT' && <StudentScreen />}
      {view === 'HOST' && <HostScreen roomId={activeRoomId} />}
      {view === 'HOME' && (
        <div className="flex flex-col items-center justify-center p-8 min-h-[80vh] text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-amber-400">Petualangan Ular Tangga Edukasi</h1>
          <p className="text-slate-400 max-w-lg text-sm">Game kuis 3D interaktif multiplayer diakses langsung lewat web browser.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setView('SUPER_ADMIN')} className="px-6 py-3.5 bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg">
              Buka Panel Lisensi (Super Admin)
            </button>
            <button onClick={() => setView('STUDENT')} className="px-6 py-3.5 bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-lg">
              Masuk Arena Siswa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}