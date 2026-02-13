import React from 'react';

interface MetricCardProps {
  label: string;
  value: number;
  color: 'purple' | 'violet' | 'indigo' | 'blue' | 'pink' | 'emerald' | 'cyan' | 'red';
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, color }) => {
  const colors = {
    purple: 'from-purple-600 to-purple-400',
    violet: 'from-violet-600 to-violet-400',
    indigo: 'from-indigo-600 to-indigo-400',
    blue: 'from-blue-600 to-blue-400',
    pink: 'from-pink-600 to-pink-400',
    emerald: 'from-emerald-600 to-emerald-400',
    cyan: 'from-cyan-600 to-cyan-400',
    red: 'from-red-600 to-red-400',
  };

  const textColors = {
    purple: 'text-purple-400',
    violet: 'text-violet-400',
    indigo: 'text-indigo-400',
    blue: 'text-blue-400',
    pink: 'text-pink-400',
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    red: 'text-red-400',
  };

  const shadowColors = {
    purple: 'shadow-purple-500/20',
    violet: 'shadow-violet-500/20',
    indigo: 'shadow-indigo-500/20',
    blue: 'shadow-blue-500/20',
    pink: 'shadow-pink-500/20',
    emerald: 'shadow-emerald-500/20',
    cyan: 'shadow-cyan-500/20',
    red: 'shadow-red-500/20',
  };

  return (
    <div className={`bg-slate-950/80 border border-white/5 p-10 rounded-[2.5rem] hover:border-white/10 transition-all duration-700 group overflow-hidden relative shadow-2xl`}>
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors[color]} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-1000`}></div>
      <div className="flex justify-between items-end mb-8 relative z-10">
        <span className="text-[10px] text-slate-500 mono font-black tracking-[0.6em] uppercase group-hover:text-slate-300 transition-colors">{label}</span>
        <span className={`text-4xl font-black ${textColors[color]} italic tracking-tighter`}>{value}<span className="text-xs opacity-30 ml-1 font-mono">%</span></span>
      </div>
      <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden relative z-10">
        <div 
          className={`h-full bg-gradient-to-r ${colors[color]} ${shadowColors[color]} shadow-[0_0_10px_currentColor] transition-all duration-[2s] ease-out rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};