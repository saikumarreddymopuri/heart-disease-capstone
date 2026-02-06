import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GlassCard from '../components/ui/GlassCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

// Mock Data for Demo
const featureImportance = [
  { name: 'Thal', value: 85, color: '#06b6d4' },
  { name: 'CA (Vessels)', value: 78, color: '#3b82f6' },
  { name: 'Chest Pain', value: 72, color: '#8b5cf6' },
  { name: 'Max HR', value: 65, color: '#ec4899' },
  { name: 'Age', value: 58, color: '#f43f5e' },
  { name: 'Cholesterol', value: 45, color: '#f59e0b' },
];

const riskDistribution = [
  { name: 'High Risk', value: 45, fill: '#ef4444' },
  { name: 'Low Risk', value: 55, fill: '#10b981' },
];

const GlobalInsights = () => {
  return (
    <div className="min-h-screen p-6 lg:p-10">
      <Navbar />
      
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 text-sm mb-2 inline-block">← Back to Dashboard</Link>
            <h1 className="text-4xl font-black tracking-tight">GLOBAL <span className="text-cyan-500">ANALYTICS</span></h1>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs text-slate-400">
            Model: <span className="text-cyan-400 font-mono">XGBoost + EBM v2.4</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Feature Importance Chart */}
          <GlassCard className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-cyan-400">📈</span> Feature Importance (XAI)
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false} 
                  />
                  <Tooltip 
                    cursor={{fill: '#ffffff05'}}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {featureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-xs text-slate-500 italic">
              * This chart shows how much each medical factor influences the overall AI decision-making process.
            </p>
          </GlassCard>

          {/* Risk Distribution Pie */}
          <div className="space-y-8">
            <GlassCard>
              <h3 className="text-xl font-bold mb-4">Patient Risk Ratio</h3>
              <div className="h-[200px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">45%</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">High Risk</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">55%</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500">Low Risk</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-blue-600/20 to-purple-600/20">
              <h4 className="font-bold text-sm text-cyan-300">Explainability Insight</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                EBM models suggest that <strong>Thalassemia</strong> and <strong>Major Vessels (CA)</strong> are the top drivers for predictions.
              </p>
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GlobalInsights;