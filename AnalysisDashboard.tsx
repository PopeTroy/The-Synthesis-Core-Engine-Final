import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LoadingState, HistoryItem, SynthesisResponse, PRCEStabilityNode } from '../types.ts';
import { analyzeTopic } from '../services/geminiService.ts';
import { IntegrityChart } from './IntegrityChart.tsx';
import { MetricCard } from './MetricCard.tsx';
import { ParameterReference } from './ParameterReference.tsx';
import { TheoryFramework } from './TheoryFramework.tsx';
import { SynthesisCalendar } from './SynthesisCalendar.tsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AnalysisDashboardProps {
  onNewAnalysis: (item: HistoryItem) => void;
  history: HistoryItem[];
}

interface CommandLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'critical' | 'success' | 'warning';
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ onNewAnalysis, history }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [isExporting, setIsExporting] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<HistoryItem | null>(null);
  const [clarification, setClarification] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [prceNodes, setPrceNodes] = useState<PRCEStabilityNode[]>([]);
  const [commandLogs, setCommandLogs] = useState<CommandLog[]>([]);
  const [stabilizingNodeId, setStabilizingNodeId] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const resultsAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (loading === LoadingState.ANALYZING) {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + (Math.random() * 8), 85));
      }, 150);
    } else if (loading === LoadingState.FINALIZING) {
      setLoadingProgress(90);
      interval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 3, 100));
      }, 40);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (prceNodes.length === 0 || loading !== LoadingState.IDLE) return;
    const decayInterval = setInterval(() => {
      setPrceNodes(prev => prev.map(node => {
        if (stabilizingNodeId === node.node_id) return node;
        const decayFactor = node.status === 'CRITICAL' ? 0.12 : 0.04;
        const nextTime = Math.max(0, node.time_to_collapse - decayFactor);
        let nextStatus = node.status;
        if (nextTime < 25 && node.status === 'NOMINAL') {
          nextStatus = 'CRITICAL';
          addLog(`ALERT: PRCE_NODE ${node.node_id} INTEGRITY BREACHED`, 'critical');
        }
        return { ...node, time_to_collapse: nextTime, status: nextStatus as any };
      }));
    }, 1000);
    return () => clearInterval(decayInterval);
  }, [prceNodes, loading, stabilizingNodeId]);

  useEffect(() => {
    if (currentAnalysis) setPrceNodes(currentAnalysis.data.prce_diagnostics);
  }, [currentAnalysis]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandLogs]);

  const addLog = (message: string, type: CommandLog['type']) => {
    setCommandLogs(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toLocaleTimeString(), message, type }].slice(-50));
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading !== LoadingState.IDLE) return;
    setLoading(LoadingState.ANALYZING);
    setClarification(null);
    setCommandLogs([]);
    addLog(`INITIALIZING UPLINK... TARGET: ${input.toUpperCase()}`, 'info');
    try {
      const data = await analyzeTopic(input);
      setLoading(LoadingState.FINALIZING);
      addLog('DATA PACKETS RECEIVED. DECODING 5D GEOMETRY...', 'success');
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (data.clarification_required) {
        setClarification(data.clarification_message || "Structural dissonance detected.");
        setLoading(LoadingState.IDLE);
        return;
      }
      const newItem: HistoryItem = { id: Math.random().toString(36).substr(2, 9), topic: input, timestamp: Date.now(), data };
      setCurrentAnalysis(newItem);
      onNewAnalysis(newItem);
      setInput('');
      setLoading(LoadingState.IDLE);
    } catch (err) {
      setLoading(LoadingState.ERROR);
      addLog('UPLINK COLLAPSED: RE-ESTABLISHING CONNECTION...', 'critical');
      setTimeout(() => setLoading(LoadingState.IDLE), 3000);
    }
  };

  const triggerStabilization = async (nodeId: string) => {
    const node = prceNodes.find(n => n.node_id === nodeId);
    if (!node || node.status === 'NOMINAL') return;
    setStabilizingNodeId(nodeId);
    addLog(`INJECTING STABILITY VECTOR TO ${nodeId}...`, 'warning');
    await new Promise(r => setTimeout(r, 1200));
    setPrceNodes(prev => prev.map(n => n.node_id === nodeId ? { ...n, status: 'NOMINAL', time_to_collapse: 99.99 } : n ));
    addLog(`${nodeId} STABILIZED AT 100% INTEGRITY.`, 'success');
    setStabilizingNodeId(null);
  };

  const formatWithBrackets = (text: string) => {
    const parts = text.split(/(\[.*?\])/);
    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return <span key={i} className="text-cyan-400 font-bold italic inline-block mt-0.5 ml-1 text-[10px] tracking-wider px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20 uppercase">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const getButtonText = () => {
    switch (loading) {
      case LoadingState.ANALYZING: return 'ANALYZING';
      case LoadingState.FINALIZING: return 'SYNCING';
      case LoadingState.ERROR: return 'FAULT';
      default: return 'INJECT';
    }
  };

  return (
    <div className="max-w-[1700px] mx-auto px-8 py-20 flex flex-col gap-32 relative z-10">
      {/* Central Input Portal */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="glass-panel p-1 rounded-[3rem] glow-border-purple relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent"></div>
          <div className="p-12 sm:p-16 rounded-[2.8rem] relative z-10">
            <div className="flex items-center gap-6 mb-10">
              <div className="h-[2px] w-16 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              <h2 className="text-[11px] font-black mono text-cyan-400 tracking-[1em] uppercase glow-text-cyan">Structural Injection Portal</h2>
            </div>
            <form onSubmit={handleAnalyze} className="relative">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Target Topic for Multi-Dimensional Synthesis..." 
                className="w-full bg-slate-950/50 border border-white/5 rounded-3xl px-10 py-10 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 text-3xl font-light tracking-tight text-white placeholder:text-slate-600 transition-all duration-700 shadow-2xl" 
                disabled={loading !== LoadingState.IDLE} 
              />
              <button 
                type="submit" 
                disabled={loading !== LoadingState.IDLE || !input.trim()} 
                className={`absolute right-4 top-4 bottom-4 px-12 rounded-2xl font-black uppercase tracking-[0.5em] text-[12px] transition-all duration-700 ${loading !== LoadingState.IDLE ? 'bg-slate-800 text-slate-500 cursor-wait' : 'bg-white text-slate-950 hover:bg-cyan-400 hover:text-black shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95'}`}
              >
                {getButtonText()}
                {(loading === LoadingState.ANALYZING || loading === LoadingState.FINALIZING) && (
                  <div className="absolute bottom-0 left-0 h-1 bg-cyan-500 transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
                )}
              </button>
            </form>
            {clarification && (
              <div className="mt-10 p-8 bg-amber-500/10 border border-amber-500/30 rounded-3xl animate-in fade-in zoom-in duration-700">
                <span className="text-[10px] mono font-black text-amber-500 uppercase tracking-widest block mb-4">Input Dissonance Reported</span>
                <p className="text-amber-200 text-lg italic">"{clarification}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {currentAnalysis ? (
          <>
            <div className="lg:col-span-8 space-y-32" ref={resultsAreaRef}>
              <div className="glass-panel rounded-[4rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden relative">
                <div className="p-12 sm:p-20">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-24 gap-12">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                        <span className="text-[11px] font-black mono tracking-[0.8em] uppercase text-cyan-400 glow-text-cyan">Synthesis Matrix Finalized</span>
                      </div>
                      <h3 className="text-6xl sm:text-8xl font-black text-white uppercase tracking-tighter italic leading-none mb-4">Audit <span className="text-purple-500">Node</span></h3>
                      <p className="text-slate-500 mono text-[10px] tracking-[0.5em] font-bold">STABILITY_ID: {currentAnalysis.id.toUpperCase()}</p>
                    </div>
                    <button onClick={() => addLog('PDF Archive generation bypassed for UI speed.', 'info')} className="bg-slate-900 border border-white/10 px-8 py-5 rounded-2xl hover:bg-white hover:text-black transition-all group">
                       <span className="text-[10px] mono font-black uppercase tracking-[0.4em]">Export Archive</span>
                    </button>
                  </div>

                  {/* Contrast Bridge: 3D vs 5D */}
                  <div className="mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                      {/* 3D Panel */}
                      <div className="bg-slate-950/80 border border-white/5 rounded-[3rem] p-12 group hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-center mb-10 opacity-40 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] mono font-black text-slate-400 uppercase tracking-widest">3D Consensus Logic</span>
                          <span className="text-xl font-black text-slate-600 italic">LIMITS</span>
                        </div>
                        <div className="space-y-6">
                           {currentAnalysis.data.dimensional_contrast.reality_3d.map((l, i) => (
                             <div key={i} className="flex gap-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-2"></span>
                                <p className="text-slate-400 text-sm italic font-medium">{l}</p>
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* 5D Panel */}
                      <div className="bg-purple-900/10 border border-purple-500/40 rounded-[3rem] p-12 shadow-[0_0_50px_rgba(139,92,246,0.1)] group hover:border-cyan-400/50 transition-all relative overflow-hidden">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px]"></div>
                        <div className="flex justify-between items-center mb-10 relative z-10">
                          <span className="text-[9px] mono font-black text-cyan-400 uppercase tracking-widest glow-text-cyan">5D Raw Potential</span>
                          <span className="text-xl font-black text-white italic">RADIANT</span>
                        </div>
                        <div className="space-y-6 relative z-10">
                           {currentAnalysis.data.dimensional_contrast.reality_4d_5d.map((l, i) => (
                             <div key={i} className="flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] mt-2"></div>
                                <p className="text-white text-base font-bold tracking-tight">{l}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 bg-white/5 p-10 rounded-[2.5rem] border-l-4 border-cyan-400">
                       <span className="text-[10px] mono font-black text-slate-500 uppercase tracking-[0.4em] block mb-4">Structural Bridge Alignment</span>
                       <p className="text-white text-xl font-light italic leading-relaxed">
                          {formatWithBrackets(currentAnalysis.data.dimensional_contrast.comparison_logic)}
                       </p>
                    </div>
                  </div>

                  {/* Core Metrics Visuals */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center mb-32">
                    <div className="glass-panel p-8 rounded-[3.5rem] border border-white/5 relative group overflow-hidden">
                       <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       <IntegrityChart data={currentAnalysis.data} />
                    </div>
                    <div className="space-y-12">
                      <div className="bg-slate-950 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                        <h4 className="text-[11px] font-black text-purple-400 mono uppercase tracking-[0.5em] mb-8">Persistence Vector</h4>
                        <div className="flex items-end justify-between mb-4">
                           <span className="text-7xl font-black text-white italic tracking-tighter">{currentAnalysis.data.probability_of_success}%</span>
                           <span className="text-[10px] mono text-slate-500 uppercase font-black tracking-widest pb-4">Synergy</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" style={{ width: `${currentAnalysis.data.probability_of_success}%` }}></div>
                        </div>
                      </div>
                      <p className="text-slate-400 text-2xl font-light italic leading-relaxed border-l-2 border-slate-800 pl-10">
                        "{currentAnalysis.data.verdict}"
                      </p>
                    </div>
                  </div>

                  {/* PRCE Kernel Terminal */}
                  <div className="mb-32">
                    <div className="flex items-center justify-between mb-12">
                       <h4 className="text-[11px] font-black text-cyan-400 mono tracking-[1em] uppercase glow-text-cyan">PRCE Tactical Command</h4>
                       <div className="flex items-center gap-10">
                          <div className="flex flex-col items-end">
                             <span className="text-[9px] mono font-black text-slate-500 uppercase tracking-widest">System Integrity</span>
                             <span className="text-3xl font-black text-white italic">100% NOMINAL</span>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                       {prceNodes.map((node) => (
                         <div key={node.node_id} className={`glass-panel p-10 rounded-[2.5rem] border transition-all duration-700 relative group overflow-hidden ${node.status === 'CRITICAL' ? 'border-red-500/30' : 'border-white/5 hover:border-cyan-500/30'}`}>
                           {stabilizingNodeId === node.node_id && (
                             <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl z-30 flex flex-col items-center justify-center">
                               <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-6"></div>
                               <span className="text-[10px] mono font-black text-cyan-400 tracking-[0.4em] uppercase">Stabilizing...</span>
                             </div>
                           )}
                           <div className={`absolute top-0 right-0 px-6 py-2 text-[8px] mono font-black rounded-bl-2xl ${node.status === 'CRITICAL' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-emerald-500/10 text-emerald-400'}`}>{node.status}</div>
                           <h5 className="text-base font-black text-white uppercase tracking-tight italic mb-8">{node.node_id.replace(/_/g, ' ')}</h5>
                           <div className="space-y-4 mb-10">
                              <div className="flex justify-between text-[10px] mono uppercase font-black tracking-widest">
                                 <span className="text-slate-600">Integrity Decay</span>
                                 <span className={node.time_to_collapse < 30 ? 'text-red-500' : 'text-cyan-400'}>{node.time_to_collapse.toFixed(2)}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden shadow-inner">
                                 <div className={`h-full transition-all duration-1000 ${node.time_to_collapse < 30 ? 'bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'}`} style={{ width: `${node.time_to_collapse}%` }}></div>
                              </div>
                           </div>
                           <button onClick={() => triggerStabilization(node.node_id)} disabled={node.status === 'NOMINAL'} className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.5em] transition-all ${node.status === 'CRITICAL' ? 'bg-red-600 text-white hover:scale-105 active:scale-95' : 'bg-white/5 text-slate-700 cursor-default'}`}>Stabilize Node</button>
                         </div>
                       ))}
                    </div>

                    <div className="bg-slate-950/90 rounded-[3rem] border border-white/5 p-12 shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                       <h5 className="text-[10px] font-black text-slate-600 mono tracking-[0.8em] uppercase mb-10">Quantum_Log_Stream.sys</h5>
                       <div className="h-72 overflow-y-auto space-y-4 custom-scrollbar font-mono text-[11px] leading-relaxed">
                          {commandLogs.map(log => (
                            <div key={log.id} className="flex gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
                               <span className="text-slate-700">[{log.timestamp}]</span>
                               <span className={log.type === 'critical' ? 'text-red-500' : log.type === 'success' ? 'text-emerald-400 glow-text-emerald' : log.type === 'warning' ? 'text-amber-500' : 'text-cyan-500'}>{log.message}</span>
                            </div>
                          ))}
                          <div ref={terminalEndRef} />
                       </div>
                    </div>
                  </div>

                  <SynthesisCalendar data={currentAnalysis.data.diagnostic_calendar} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-32">
                    <div className="glass-panel p-12 rounded-[3.5rem] group hover:border-red-500/20 transition-all">
                      <h4 className="text-[11px] font-black text-red-500 mono mb-12 uppercase tracking-[1em]">Entropy Signatures</h4>
                      <div className="space-y-10">
                        {currentAnalysis.data.frictions.map((f, i) => (
                          <div key={i} className="flex gap-6 items-start">
                             <span className="text-red-900 mono font-black text-[11px] mt-1 shrink-0">ER_{i.toString().padStart(2, '0')}</span>
                             <p className="text-slate-400 text-sm italic font-medium leading-relaxed">{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-panel p-12 rounded-[3.5rem] group hover:border-emerald-500/20 transition-all">
                      <h4 className="text-[11px] font-black text-emerald-500 mono mb-12 uppercase tracking-[1em]">Repair Flow</h4>
                      <div className="space-y-12">
                        {currentAnalysis.data.counter_measures.map((cm, i) => (
                          <div key={i} className="flex gap-8">
                             <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mono text-sm font-black shrink-0 border border-emerald-500/20 shadow-lg">{i+1}</div> 
                             <div className="flex-1 text-slate-300 text-sm leading-relaxed">{formatWithBrackets(cm)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                <MetricCard label="NODES" value={currentAnalysis.data.nodes} color="purple" />
                <MetricCard label="PROC" value={currentAnalysis.data.protocols} color="violet" />
                <MetricCard label="FILTR" value={currentAnalysis.data.filters} color="indigo" />
                <MetricCard label="TIME" value={currentAnalysis.data.time_space} color="blue" />
                <MetricCard label="OVRW" value={currentAnalysis.data.dimensional_overwrite} color="pink" />
                <MetricCard label="TYPE" value={currentAnalysis.data.prophetic_typology} color="emerald" />
              </div>
            </div>

            {/* Sidebar Chronicle */}
            <div className="lg:col-span-4 h-full">
              <div className="glass-panel rounded-[3rem] border border-white/5 flex flex-col h-full sticky top-32 max-h-[calc(100vh-200px)] overflow-hidden shadow-2xl">
                <div className="p-12 border-b border-white/5 bg-slate-900/50 flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase mono tracking-[0.8em] text-white italic">History</h4>
                  <span className="text-[9px] mono text-cyan-400 font-black">{history.length} SYNCED</span>
                </div>
                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                  {history.map((item) => (
                    <button key={item.id} onClick={() => setCurrentAnalysis(item)} className={`w-full text-left p-10 rounded-[2.5rem] border transition-all duration-700 relative group overflow-hidden ${currentAnalysis.id === item.id ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                      {currentAnalysis.id === item.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-400"></div>}
                      <div className="text-lg font-black text-white italic truncate mb-4 uppercase">{item.topic}</div>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 mono font-black">
                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                        <span className="text-cyan-400 glow-text-cyan">{item.data.resonance}% RESONANCE</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-12 py-96 flex flex-col items-center justify-center bg-slate-950/40 rounded-[5rem] border border-white/5 shadow-2xl w-full">
            <div className="w-40 h-40 rounded-full bg-slate-900/50 border border-white/5 flex items-center justify-center mb-16 relative animate-energy">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500 opacity-20"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/></svg>
            </div>
            <p className="text-sm mono uppercase tracking-[1.5em] text-slate-600 font-black">Waiting for Astra Injection...</p>
          </div>
        )}
      </div>

      <TheoryFramework />
      <ParameterReference />
    </div>
  );
};