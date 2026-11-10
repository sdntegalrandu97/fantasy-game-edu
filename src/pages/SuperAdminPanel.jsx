import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ShieldCheck, UserPlus } from 'lucide-react';

export default function SuperAdminPanel() {
  const [licenses, setLicenses] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  const fetchLicenses = async () => {
    const { data } = await supabase.from('licenses').select('*').order('created_at', { ascending: false });
    if (data) setLicenses(data);
  };

  useEffect(() => { fetchLicenses(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await supabase.rpc('admin_generate_license', {
      p_buyer_name: buyerName,
      p_buyer_email: buyerEmail,
      p_duration_days: 365,
      p_max_rooms: 3
    });
    setBuyerName(''); setBuyerEmail('');
    fetchLicenses();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-amber-400 flex items-center space-x-2">
        <ShieldCheck className="w-7 h-7" />
        <span>Panel Lisensi Pembeli (Super Admin)</span>
      </h1>
      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-2xl">
        <input placeholder="Nama Pembeli / Sekolah" required value={buyerName} onChange={e=>setBuyerName(e.target.value)} className="bg-slate-800 p-2.5 rounded-xl text-sm" />
        <input placeholder="Email Pembeli" required value={buyerEmail} onChange={e=>setBuyerEmail(e.target.value)} className="bg-slate-800 p-2.5 rounded-xl text-sm" />
        <button type="submit" className="bg-amber-400 text-slate-950 font-bold p-2.5 rounded-xl text-sm">Buat Lisensi</button>
      </form>
      <div className="bg-slate-900 rounded-2xl p-4">
        <h2 className="text-sm font-bold text-slate-400 mb-3">Daftar Lisensi Aktif:</h2>
        <div className="space-y-2">
          {licenses.map(lic => (
            <div key={lic.id} className="bg-slate-800 p-3 rounded-xl flex justify-between items-center text-sm">
              <div>
                <span className="font-mono text-amber-400 font-bold">{lic.license_key}</span>
                <span className="ml-2 text-slate-300">({lic.buyer_name})</span>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Aktif</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}