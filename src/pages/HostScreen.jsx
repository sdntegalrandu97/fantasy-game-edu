import React, { useState } from 'react';
import GameBoard from '../components/GameBoard';
import ThreeDice from '../components/ThreeDice';

export default function HostScreen() {
  const [players] = useState([
    { id: '1', player_name: 'Player 1', position: 1 },
    { id: '2', player_name: 'Player 2', position: 1 }
  ]);
  const [diceVal, setDiceVal] = useState(1);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setDiceVal(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <GameBoard players={players} activePlayerIndex={0} />
      <ThreeDice targetValue={diceVal} isRolling={rolling} onRollComplete={()=>setRolling(false)} size={140} />
      <button onClick={roll} disabled={rolling} className="px-6 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl">
        {rolling ? 'Dadu Berputar...' : 'Lempar Dadu'}
      </button>
    </div>
  );
}