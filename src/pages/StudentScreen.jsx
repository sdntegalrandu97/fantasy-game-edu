import React, { useState } from 'react';
import ThreeDice from '../components/ThreeDice';

export default function StudentScreen() {
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);

  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <form onSubmit={()=>setJoined(true)} className="bg-slate-900 p-6 rounded-3xl max-w-sm w-full space-y-4">
          <h2 className="text-xl font-black text-amber-400 text-center">Masuk Game Siswa</h2>
          <input placeholder="6-Digit PIN (Cth: 849201)" required value={pin} onChange={e=>setPin(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl text-center font-mono text-lg" />
          <input placeholder="Nama Lengkap Siswa" required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-800 p-3 rounded-xl text-sm" />
          <button type="submit" className="w-full bg-amber-400 text-slate-950 font-bold p-3 rounded-xl">Masuk Arena</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-amber-400 font-bold text-lg">{name}</h3>
        <p className="text-xs text-slate-400">Terkoneksi ke PIN: {pin}</p>
      </div>
      <ThreeDice targetValue={4} size={160} />
      <button className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-2xl text-lg">
        🎲 LEMPAR DADU HP
      </button>
    </div>
  );
}