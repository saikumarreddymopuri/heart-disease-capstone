import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import VoiceVisualizer from '../components/VoiceVisualizer';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <Navbar />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        
        {/* LEFT: Instructions Box */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="border-l-4 border-l-cyan-500">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-cyan-400">📋</span> Diagnostic Guide
            </h2>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex gap-3">
                <span className="text-cyan-500 font-bold">01.</span>
                Choose between Voice or Manual input.
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-500 font-bold">02.</span>
                Provide patient vitals like Age, BP, and Cholesterol.
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-500 font-bold">03.</span>
                AI will process and provide Explainable (XAI) insights.
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="bg-cyan-500/5 border-cyan-500/20">
            <p className="text-xs text-cyan-300 uppercase tracking-widest font-bold mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">XGBoost & EBM Models Active</span>
            </div>
          </GlassCard>
        </div>

        {/* RIGHT: Main Interaction Area */}
        <div className="lg:col-span-8 space-y-8">
          <GlassCard className="flex flex-col items-center justify-center py-16 text-center border-dashed border-white/20">
            <div 
              onClick={() => setIsListening(!isListening)}
              className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${isListening ? 'bg-red-500/20 neon-glow' : 'bg-white/5 hover:bg-white/10'}`}
            >
              <span className="text-4xl">{isListening ? '🛑' : '🎙️'}</span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold">
              {isListening ? 'Listening to Vitals...' : 'Tap to Speak Symptoms'}
            </h3>
            <p className="text-slate-500 mt-2">Example: "Patient is 60 years old with chest pain..."</p>
            
            <div className="mt-8">
              <VoiceVisualizer isListening={isListening} />
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => navigate('/manual-input')}
              className="glass-card p-8 cursor-pointer hover:bg-white/5 transition-all border border-white/10 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform inline-block mb-4">📝</span>
              <h4 className="text-xl font-bold">Manual Entry</h4>
              <p className="text-slate-400 text-sm mt-2">Precision input for all 13 clinical parameters.</p>
            </div>

            <div 
              onClick={() => navigate('/insights')}
              className="glass-card p-8 cursor-pointer hover:bg-white/5 transition-all border border-white/10 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform inline-block mb-4">📊</span>
              <h4 className="text-xl font-bold">Global Insights</h4>
              <p className="text-slate-400 text-sm mt-2">Analyze population data and feature importance.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;