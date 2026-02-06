import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Navbar from '../components/Navbar';
import axios from 'axios';
import XAIExplanation from '../components/XAIExplanation';

const fields = [
  { id: "age", label: "Patient Age", type: "number", placeholder: "e.g. 45" },
  { id: "sex", label: "Sex (1:M, 0:F)", type: "number", placeholder: "0 or 1" },
  { id: "cp", label: "Chest Pain Type", type: "number", placeholder: "0-3" },
  { id: "trestbps", label: "Resting BP", type: "number", placeholder: "mm Hg" },
  { id: "chol", label: "Cholesterol", type: "number", placeholder: "mg/dl" },
  { id: "fbs", label: "Fasting Blood Sugar", type: "number", placeholder: "> 120 (1/0)" },
  { id: "restecg", label: "Resting ECG", type: "number", placeholder: "0-2" },
  { id: "thalach", label: "Max Heart Rate", type: "number", placeholder: "e.g. 150" },
  { id: "exang", label: "Exercise Angina", type: "number", placeholder: "1/0" },
  { id: "oldpeak", label: "ST Depression", type: "number", placeholder: "e.g. 1.2" },
  { id: "slope", label: "Slope of ST", type: "number", placeholder: "0-2" },
  { id: "ca", label: "Major Vessels", type: "number", placeholder: "0-3" },
  { id: "thal", label: "Thalassemia Type", type: "number", placeholder: "1-3" }
];

const ManualEntry = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (id, val) => setForm({ ...form, [id]: val });

  const handlePredict = async () => {
    setLoading(true);
    const payload = {};
    fields.forEach(f => payload[f.id] = Number(form[f.id] || 0));

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/predict-explain", payload);
      setResult(res.data);
      setExplanation(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentField = fields[step];
  const progress = ((step + 1) / fields.length) * 100;

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <Navbar />
      
      <div className="max-w-4xl mx-auto mt-12">
        <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-6">
          ← Back to Dashboard
        </Link>

        {!result ? (
          <GlassCard className="relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            
            <div className="py-8">
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Parameter {step + 1} of 13</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">{currentField.label}</h2>
              
              <input
                type={currentField.type}
                placeholder={currentField.placeholder}
                value={form[currentField.id] || ""}
                onChange={(e) => handleChange(currentField.id, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-2xl focus:border-cyan-500/50 outline-none transition-all"
                autoFocus
              />

              <div className="flex justify-between mt-10">
                <button 
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30"
                >
                  Previous
                </button>

                {step < fields.length - 1 ? (
                  <button 
                    onClick={() => setStep(step + 1)}
                    className="px-8 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-bold"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={handlePredict}
                    className="px-8 py-2 rounded-lg bg-green-600 hover:bg-green-500 font-bold neon-glow"
                  >
                    {loading ? "Analyzing..." : "Generate Analysis"}
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Prediction Result Header */}
            <GlassCard className={`text-center border-t-4 ${result.prediction === 1 ? 'border-t-red-500' : 'border-t-green-500'}`}>
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-500">Diagnostic Result</h2>
              <div className="text-5xl font-black mt-2 mb-4">
                {result.prediction === 1 ? <span className="text-red-500">HIGH RISK</span> : <span className="text-green-500">LOW RISK</span>}
              </div>
              <p className="text-slate-400">Confidence: {(result.risk_probability * 100).toFixed(2)}%</p>
              <button onClick={() => setResult(null)} className="mt-6 text-xs text-cyan-400 hover:underline">Restart Diagnosis</button>
            </GlassCard>

            {/* XAI Explanation Section */}
            {explanation && (
              <XAIExplanation 
                topFeatures={explanation.top_features} 
                doctorExplanation={explanation.doctor_explanation} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualEntry;