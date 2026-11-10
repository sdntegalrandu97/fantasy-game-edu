import React from 'react';

export const SPECIAL_TILES = {
  4: { to: 14, type: 'ladder' },
  9: { to: 31, type: 'ladder' },
  20: { to: 38, type: 'ladder' },
  28: { to: 84, type: 'ladder' },
  17: { to: 7, type: 'slide' },
  54: { to: 34, type: 'slide' },
  62: { to: 19, type: 'slide' },
  87: { to: 24, type: 'slide' },
  99: { to: 78, type: 'slide' },
};

export const getTileCoordinates = (tileNumber) => {
  const idx = tileNumber - 1;
  const row = Math.floor(idx / 10);
  let col = idx % 10;
  if (row % 2 === 1) col = 9 - col;
  return { x: col * 10 + 5, y: 95 - row * 10 };
};

export default function GameBoard({ players = [], activePlayerIndex = 0 }) {
  const tiles = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="relative w-full max-w-[650px] aspect-square rounded-3xl p-3 bg-gradient-to-br from-indigo-900 to-slate-950 shadow-2xl border-4 border-amber-400/40 select-none">
      <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-1 rounded-2xl p-2 bg-slate-900/80">
        {tiles.slice().reverse().map((_, idx) => {
          const rowFromTop = Math.floor(idx / 10);
          const rowNumber = 9 - rowFromTop;
          const colIndex = idx % 10;
          const actualTile = rowNumber % 2 === 1 ? rowNumber * 10 + (10 - colIndex) : rowNumber * 10 + colIndex + 1;
          const special = SPECIAL_TILES[actualTile];

          return (
            <div
              key={actualTile}
              className={`relative flex items-center justify-center rounded-lg font-bold text-xs
                ${actualTile === 100 ? 'bg-amber-400 text-slate-950 font-black animate-pulse' : ''}
                ${actualTile === 1 ? 'bg-emerald-500 text-white' : ''}
                ${special?.type === 'ladder' ? 'bg-indigo-600/70 text-cyan-200' : ''}
                ${special?.type === 'slide' ? 'bg-rose-600/60 text-rose-200' : ''}
                ${actualTile !== 100 && actualTile !== 1 && !special ? (actualTile % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700/60') : ''}
              `}
            >
              <span>{actualTile}</span>
              {special?.type === 'ladder' && <span className="absolute bottom-0.5 right-0.5 text-[8px] text-cyan-300">↗{special.to}</span>}
              {special?.type === 'slide' && <span className="absolute bottom-0.5 right-0.5 text-[8px] text-rose-300">↘{special.to}</span>}
            </div>
          );
        })}
      </div>

      {players.map((p, index) => {
        const coords = getTileCoordinates(p.position || 1);
        return (
          <div
            key={p.id || index}
            style={{ left: `${coords.x}%`, top: `${coords.y}%`, transform: 'translate(-50%, -50%)' }}
            className="absolute transition-all duration-700 pointer-events-none z-20 flex flex-col items-center"
          >
            <span className="px-1 text-[9px] bg-black/80 rounded text-white">{p.player_name}</span>
            <div className={`w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-950
              ${index === activePlayerIndex ? 'animate-bounce ring-2 ring-cyan-400' : ''}
            `}>
              {index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
}