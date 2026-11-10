import React, { useState } from 'react';
import GameArena from './pages/GameArena';
import SuperAdminPanel from './pages/SuperAdminPanel';
import StudentScreen from './pages/StudentScreen';
import { Gamepad2, ShieldCheck, Smartphone } from 'lucide-react';

export default function App() {
  // DEFAULT LANGSUNG TAMPILKAN PAPAN PERMAINAN!
  const [tab, setTab] = useState('GAME');

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      {/* HEADER NAVIGASI JELAS */}
      <header className="p-4 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-black text-amber-400 tracking-wider">FANTASY EDU LADDERS</span>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">3D LIVE</span>
        </div>

        {/* 3 MENU UTAMA */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTab('GAME')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all
              ${tab === 'GAME' ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}
            `}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>🎮 Arena Papan 100 Kotak</span>
          </button>

          <button
            onClick={() => setTab('STUDENT')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all
              ${tab === 'STUDENT' ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}
            `}
          >
            <Smartphone className="w-4 h-4" />
            <span>📱 Layar HP Siswa</span>
          </button>

          <button
            onClick={() => setTab('ADMIN')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all
              ${tab === 'ADMIN' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}
            `}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>🔑 Admin Lisensi</span>
          </button>
        </div>
      </header>

      {/* ISI KONTEN UTAMA */}
      <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
        {tab === 'GAME' && <GameArena />}
        {tab === 'STUDENT' && <StudentScreen />}
        {tab === 'ADMIN' && <SuperAdminPanel />}
      </main>
    </div>
  );
}