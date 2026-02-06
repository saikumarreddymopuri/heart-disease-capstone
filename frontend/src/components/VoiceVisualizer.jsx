import React from 'react';

const VoiceVisualizer = ({ isListening }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 bg-cyan-400 rounded-full transition-all duration-300 ${
            isListening ? 'animate-bounce' : 'h-2'
          }`}
          style={{ animationDelay: `${i * 0.1}s`, height: isListening ? '2rem' : '0.5rem' }}
        ></div>
      ))}
    </div>
  );
};

export default VoiceVisualizer;