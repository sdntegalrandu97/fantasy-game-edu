import React, { useState } from 'react';
import GameBoard, { SPECIAL_TILES } from '../components/GameBoard';
import ThreeDice from '../components/ThreeDice';
import confetti from 'canvas-confetti';
import { Trophy, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

const QUESTIONS_BANK = [
  { q: "Berapakah hasil dari 15 x 4?", a: ["50", "60", "70", "80"], correct: 1, exp: "15 dikali 4 sama dengan 60." },
  { q: "Ibu kota Negara Kesatuan Republik Indonesia adalah?", a: ["Surabaya", "Bandung", "Jakarta", "Semarang"], correct: 2, exp: "Jakarta merupakan pusat pemerintahan saat ini." },
  { q: "Planet terdekat dari Matahari adalah?", a: ["Merkurius", "Venus", "Bumi", "Mars"], correct: 0, exp: "Merkurius adalah planet pertama paling dekat dari matahari." },
  { q: "Alat pernapasan pada ikan adalah?", a: ["Paru-paru", "Trakea", "Insang", "Kulit"], correct: 2, exp: "Ikan bernapas menggunakan insang." },
  { q: "Lawan kata dari perkataan 'Jujur' adalah?", a: ["Berani", "Bohong", "Sombong", "Kikir"], correct: 1, exp: "Bohong adalah kebalikan dari jujur." }
];

export default function GameArena() {
  const [players, setPlayers] = useState([
    { id: '1', player_name: 'Pemain 1 (Ksatria)', position: 1 },
    { id: '2', player_name: 'Pemain 2 (Penyihir)', position: 1 }
  ]);
  const [activeTurn, setActiveTurn] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [winner, setWinner] = useState(null);

  // Lempar Dadu
  const handleRollDice = () => {
    if (isRolling || currentQuestion || feedback || winner) return;
    setIsRolling(true);
    const randomRoll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(randomRoll);
  };

  // Setelah Dadu Berhenti Berputar -> Munculkan Soal Kuis
  const onRollComplete = () => {
    setIsRolling(false);
    const randomQ = QUESTIONS_BANK[Math.floor(Math.random() * QUESTIONS_BANK.length)];
    setCurrentQuestion(randomQ);
  };

  // Siswa Menjawab Soal
  const handleAnswer = (chosenIndex) => {
    const isCorrect = chosenIndex === currentQuestion.correct;
    const curPlayer = players[activeTurn];
    let nextPos = curPlayer.position;
    let message = "";

    if (isCorrect) {
      nextPos += diceValue;
      if (nextPos > 100) nextPos = curPlayer.position; // Aturan kotak 100 tepat

      // Cek Tangga atau Seluncuran
      if (SPECIAL_TILES[nextPos]) {
        const special = SPECIAL_TILES[nextPos];
        if (special.type === 'ladder') {
          message = `🎉 Hebat! Naik ${special.name} dari kotak ${nextPos} melesat ke kotak ${special.to}!`;
          nextPos = special.to;
        } else {
          message = `🌊 Ups! Terpeleset ${special.name} dari kotak ${nextPos} turun ke kotak ${special.to}!`;
          nextPos = special.to;
        }
      }

      setFeedback({ isCorrect: true, text: "Jawaban BENAR! Pion melangkah maju.", bonus: message });
    } else {
      setFeedback({ isCorrect: false, text: "Kurang tepat! Kunci: " + currentQuestion.a[currentQuestion.correct], exp: currentQuestion.exp });
    }

    // Update Posisi Pion
    const updated = [...players];
    updated[activeTurn].position = nextPos;
    setPlayers(updated);

    // Cek Juara Kotak 100
    if (nextPos === 100) {
      setWinner(curPlayer.player_name);
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
    }

    // Giliran Berikutnya
    setTimeout(() => {
      setCurrentQuestion(null);
      setFeedback(null);
      if (nextPos !== 100) {
        setActiveTurn((prev) => (prev === 0 ? 1 : 0));
      }
    }, 2800);
  };

  const currentPlayer = players[activeTurn];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
      {/* 1. PAPAN 100 KOTAK */}
      <GameBoard players={players} activePlayerIndex={activeTurn} />

      {/* 2. PANEL DADU & STATUS PERMAINAN */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col items-center space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Giliran Bermain:</span>
          <div className="text-xl font-black text-amber-400 mt-1">{currentPlayer.player_name}</div>
          <div className="text-xs text-cyan-300 font-bold mt-1">Saat ini di Kotak: {currentPlayer.position} / 100</div>
        </div>

        {/* DADU 3D INTERAKTIF */}
        <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
          <ThreeDice targetValue={diceValue} isRolling={isRolling} onRollComplete={onRollComplete} size={150} />
        </div>

        {/* TOMBOL LEMPAR DADU */}
        {!currentQuestion && !feedback && !winner && (
          <button
            onClick={handleRollDice}
            disabled={isRolling}
            className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-2xl shadow-xl transition-all active:scale-95 text-base"
          >
            {isRolling ? '🎲 Mengocok Dadu...' : `🎲 LEMPAR DADU (${currentPlayer.player_name})`}
          </button>
        )}

        {/* MODAL KARTU PERTANYAAN EDUKASI */}
        {currentQuestion && !feedback && (
          <div className="w-full bg-slate-800 border-2 border-indigo-500 p-4 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Jawab dengan Benar Agar Pion Maju!</span>
            </div>
            <p className="text-sm font-bold text-white">{currentQuestion.q}</p>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {currentQuestion.a.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-2.5 rounded-xl bg-slate-700 hover:bg-indigo-600 text-left text-xs font-semibold text-white transition-all flex items-center space-x-2"
                >
                  <span className="w-5 h-5 rounded bg-slate-600 flex items-center justify-center font-bold text-[10px]">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK HASIL JAWABAN */}
        {feedback && (
          <div className="w-full bg-slate-800/90 border border-slate-700 p-4 rounded-2xl text-center space-y-2">
            {feedback.isCorrect ? (
              <>
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-sm font-black text-emerald-400">{feedback.text}</div>
                {feedback.bonus && <p className="text-xs text-cyan-300 font-bold">{feedback.bonus}</p>}
              </>
            ) : (
              <>
                <XCircle className="w-10 h-10 text-rose-400 mx-auto" />
                <div className="text-sm font-black text-rose-400">{feedback.text}</div>
                <p className="text-[11px] text-slate-300 italic">{feedback.exp}</p>
              </>
            )}
          </div>
        )}

        {/* PODIUM JUARA */}
        {winner && (
          <div className="w-full bg-amber-500/20 border-2 border-amber-400 p-4 rounded-2xl text-center space-y-2">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-amber-300">SELAMAT KEPADA JUARA!</h3>
            <p className="text-sm font-bold text-white">{winner} mencapai Kotak 100!</p>
          </div>
        )}
      </div>
    </div>
  );
}