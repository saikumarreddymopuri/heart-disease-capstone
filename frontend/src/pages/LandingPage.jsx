import React from 'react';
import { useNavigate } from 'react-router-dom';
import heartVideo from '../assets/heart.mp4';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heartVideo} type="video/mp4" />
      </video>

      {/* Dynamic Overlay - Left side focus gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10"></div>

      {/* Content moved to the Left Side */}
      <div className="relative z-20 px-10 md:px-24 max-w-4xl">
        <div className="mb-6 inline-block p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase">
            Advanced Diagnostic Interface
          </span>
        </div>
        
        {/* Updated Title according to your requirement */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
          CARDIOVASCULAR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            RISK PREDICTION
          </span> <br />
          <span className="text-3xl md:text-5xl font-light text-slate-300">WITH XAI / EBM</span>
        </h1>
        
        <p className="text-slate-400 text-base md:text-lg max-w-lg mb-10 font-light leading-relaxed">
          Leveraging Explainable Boosting Machines (EBM) and Machine Learning to provide transparent, doctor-centric cardiac risk insights.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="group relative px-10 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <span className="relative z-10 uppercase tracking-widest">Initialize System</span>
          <div className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
        </button>
      </div>

      {/* Floating System Info on bottom right (Professional Touch) */}
      <div className="absolute bottom-10 right-10 z-20 hidden md:block border-l border-white/20 pl-4">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Network Status</p>
        <p className="text-xs font-mono text-cyan-500">Secure AI Node Active</p>
      </div>
    </div>
  );
};

export default LandingPage;