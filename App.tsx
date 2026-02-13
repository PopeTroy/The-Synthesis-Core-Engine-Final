import React, { useState, useEffect, useCallback } from 'react';
import { AnalysisDashboard } from './components/AnalysisDashboard.tsx';
import { LoadingState, HistoryItem } from './types.ts';

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('synthesis_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("The Synthesis: Chronicle Corrupted", e);
      }
    }
  }, []);

  const saveToHistory = useCallback((item: HistoryItem) => {
    setHistory(prev => {
      const next = [item, ...prev].slice(0, 50);
      localStorage.setItem('synthesis_history', JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col bg-[#020617] text-slate-100 selection:bg-purple-500/30">
      <header className="border-b border-white/5 bg-[#020617]/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur-md opacity-20 group-hover:opacity-60 transition duration-700"></div>
              <div className="relative w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                The Synthesis <span className="text-purple-500">Engine</span>
              </h1>
              <p className="text-[9px] text-cyan-400/60 mono leading-none tracking-[0.5em] font-bold">V5.0.0_OBSIDIAN_PULSE</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-12 text-[10px] font-black tracking-[0.3em] mono uppercase">
            <a href="#" className="text-white border-b-2 border-cyan-500 pb-1">Uplink</a>
            <a href="#history" className="text-slate-500 hover:text-purple-400 transition-all">Chronicle</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-all">Integrity</a>
          </nav>

          <div className="flex items-center gap-8">
             <div className="hidden sm:block text-right">
                <div className="text-[9px] text-purple-500/50 mono font-black">CORE_SYNC</div>
                <div className="text-xs text-cyan-400 mono font-bold glow-text-cyan">UNIFIED</div>
             </div>
             <div className="h-8 w-[1px] bg-white/10"></div>
             <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto relative">
        <AnalysisDashboard onNewAnalysis={saveToHistory} history={history} />
      </main>

      <footer className="py-8 px-12 border-t border-white/5 bg-slate-950/80 backdrop-blur-2xl mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-slate-500 mono flex gap-12 uppercase font-black tracking-widest">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Gemini_Pro_Ultra</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> 5D_Uplink_Active</span>
          </div>
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.8em] font-bold">STABILITY_CODE_SOLARIS</p>
        </div>
      </footer>
    </div>
  );
};

export default App;