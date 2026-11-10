import React from 'react';

export const SPECIAL_TILES = {
  // Tangga Ajaib (Naik)
  4: { to: 14, type: 'ladder', name: 'Jembatan Awan' },
  9: { to: 31, type: 'ladder', name: 'Pohon Kristal' },
  20: { to: 38, type: 'ladder', name: 'Tangga Kastil' },
  28: { to: 84, type: 'ladder', name: 'Mata Air Emas' },
  51: { to: 67, type: 'ladder', name: 'Tangga Bintang' },
  71: { to: 91, type: 'ladder', name: 'Gerbang Cahaya' },
  // Seluncuran Ceria (Turun)
  17: { to: 7, type: 'slide', name: 'Seluncuran Air' },
  54: { to: 34, type: 'slide', name: 'Air Terjun Busa' },
  62: { to: 19, type: 'slide', name: 'Perosotan Daun' },
  87: { to: 24, type: 'slide', name: 'Seluncuran Pelangi' },
  99: { to: 78, type: 'slide', name: 'Kabut Lembah' },
};

export const getTileCoordinates = (tileNumber) => {
  const idx = Math.min(Math.max(tileNumber, 1), 100) - 1;
  const row = Math.floor(idx / 10);
  let col = idx % 10;
  if (row % 2 === 1) col = 9 - col;
  return { x: col * 10 + 5, y: 95 - row * 10 };
};

export default function GameBoard({ players = [], activePlayerIndex = 0 }) {
  const tiles = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="relative w-full max-w-[620px] aspect-square rounded-3xl p-3 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 shadow-2xl border-4 border-amber-400/40 select-none">
      <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-1 rounded-2xl p-2 bg-slate-900/80">
        {tiles.slice().reverse().map((_, idx) => {
          const rowFromTop = Math.floor(idx / 10);
          const rowNumber = 9 - rowFromTop;
          const colIndex = idx % 10;
          const actualTile = rowNumber % 2 === 1 ? rowNumber * 10 + (10 - colIndex) : rowNumber * 10 + colIndex + 1;
          const special = SPECIAL_TILES[actualTile];
          const isFinish = actualTile === 100;
          const isStart = actualTile === 1;

          return (
            <div
              key={actualTile}
              className={`relative flex items-center justify-center rounded-lg font-bold text-xs
                ${isFinish ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black animate-pulse' : ''}
                ${isStart ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white' : ''}
                ${special?.type === 'ladder' ? 'bg-indigo-600/70 text-cyan-200 border border-cyan-400/40' : ''}
                ${special?.type === 'slide' ? 'bg-rose-600/60 text-rose-200 border border-rose-400/40' : ''}
                ${!isFinish && !isStart && !special ? (actualTile % 2 === 0 ? 'bg-slate-800/90 text-slate-300' : 'bg-slate-700/60 text-slate-200') : ''}
              `}
            >
              <span>{actualTile}</span>
              {special?.type === 'ladder' && <span className="absolute bottom-0.5 right-0.5 text-[8px] text-cyan-300 font-mono">↗{special.to}</span>}
              {special?.type === 'slide' && <span className="absolute bottom-0.5 right-0.5 text-[8px] text-rose-300 font-mono">↘{special.to}</span>}
              {isFinish && <span className="absolute -top-1 right-0 text-xs">🏆</span>}
            </div>
          );
        })}
      </div>

      {/* Render Pion Pemain Melompat */}
      {players.map((p, index) => {
        const coords = getTileCoordinates(p.position || 1);
        const offsetX = index === 0 ? -1.5 : 1.5;
        const colors = [
          'bg-gradient-to-tr from-cyan-400 to-blue-600 border-cyan-200 text-white',
          'bg-gradient-to-tr from-amber-400 to-orange-600 border-amber-200 text-slate-950'
        ];

        return (
          <div
            key={p.id || index}
            style={{ left: `${coords.x + offsetX}%`, top: `${coords.y}%`, transform: 'translate(-50%, -50%)' }}
            className="absolute transition-all duration-700 pointer-events-none z-20 flex flex-col items-center"
          >
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-950/90 rounded text-white border border-white/20 whitespace-nowrap shadow-md mb-0.5">
              {p.player_name}
            </span>
            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full ${colors[index % 2]} border-2 flex items-center justify-center text-xs font-black shadow-lg
              ${index === activePlayerIndex ? 'ring-4 ring-amber-400 animate-bounce' : ''}
            `}>
              {index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
}