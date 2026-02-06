import React, { useState } from 'react';
import GlassCard from './ui/GlassCard';

const XAIExplanation = ({ topFeatures, doctorExplanation }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  const handleSpeak = () => {
  if ('speechSynthesis' in window) {
    // If it's already speaking, we STOP it completely
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
      return; // Exit here so it doesn't restart
    }

    // Clear any previous queues just in case
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(doctorExplanation);
    
    // Voice settings (Optional: for a more professional doctor tone)
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(-1);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        // Logic to find the word index for highlighting
        const wordIdx = doctorExplanation.substring(0, charIndex).trim().split(/\s+/).length - 1;
        setCurrentWordIndex(wordIdx >= 0 ? wordIdx : 0);
      }
    };

    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser doesn't support text-to-speech.");
  }
};

  return (
    // Added flex-col for mobile and items-start to prevent stretching
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full mt-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* LEFT: Doctor's Note - scrollable if too long */}
      <GlassCard className="flex-1 w-full lg:w-1/2 overflow-hidden flex flex-col max-h-[600px]">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#020617]/50 backdrop-blur-md py-2 z-10">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="text-purple-400">🩺</span> Doctor's Note
          </h3>
          <button 
            onClick={handleSpeak}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              isSpeaking ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'
            }`}
          >
            {isSpeaking ? '⏹️ Stop' : '🔊 Listen'}
          </button>
        </div>
        
        <div className="text-slate-300 leading-relaxed text-base overflow-y-auto pr-2 custom-scrollbar">
          {doctorExplanation.split(" ").map((word, idx) => (
            <span 
              key={idx} 
              className={`transition-all duration-200 mr-1 inline-block ${
                idx === currentWordIndex ? 'text-cyan-300 font-bold scale-110' : ''
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* RIGHT: Key Risk Factors */}
      <GlassCard className="w-full lg:w-[400px] shrink-0 h-fit">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-yellow-400">⚡</span> Risk Drivers
        </h3>
        <div className="space-y-3">
          {topFeatures.map(([feature, impact], idx) => (
            <div key={idx} className="group flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-white/10 transition-all">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-tighter">{feature}</span>
                <span className="text-[10px] text-slate-600 italic">Impact Score: {impact.toFixed(2)}</span>
              </div>
              <div className={`text-[10px] px-3 py-1 rounded-md font-black uppercase tracking-widest border ${
                impact > 0 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'
              }`}>
                {impact > 0 ? '↑ High' : '↓ Low'}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default XAIExplanation;