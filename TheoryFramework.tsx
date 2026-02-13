import React from 'react';

export const TheoryFramework: React.FC = () => {
  return (
    <div className="mt-20 space-y-16 pb-12 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
      
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-black mono tracking-[0.5em] text-purple-700 uppercase">Architectural Audit</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-100 to-transparent"></div>
        </div>
        <p className="text-[11px] text-slate-500 mono uppercase tracking-[0.2em] max-w-4xl leading-relaxed border-l-2 border-purple-200 pl-6">
          A high-precision structural integrity diagnostic designed to map and repair systemic vulnerabilities. This audit serves humanity by ensuring that the frameworks of our society remain resonant and stable across temporal shifts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-lg font-black text-slate-900 uppercase flex items-center gap-3">
            <span className="text-purple-600 mono">01.</span> Probability Vectors
          </h3>
          <div className="bg-white p-8 rounded-[2rem] relative overflow-hidden border border-slate-100 shadow-sm">
             <div className="absolute -right-6 -top-6 opacity-[0.03] mono text-[120px] font-black select-none text-purple-600">Σ</div>
             <p className="text-slate-800 text-base leading-relaxed mb-6 font-medium">
               Diagnostics represent <span className="text-purple-700 font-black italic underline decoration-purple-200 underline-offset-4">Persistence Potential</span>.
             </p>
             <ul className="space-y-6">
               <li className="flex gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100 group-hover:bg-purple-100 transition-all">
                    <span className="mono text-purple-600 font-black text-xs">R:B</span>
                 </div>
                 <div className="flex-1">
                   <span className="text-purple-800 font-black uppercase block mb-1 tracking-widest text-[10px]">Resonance Conflict</span>
                   <p className="text-xs text-slate-500 leading-relaxed">
                     The frequency of synergy. When Resonance > Drag, the system exists in a state of self-sustaining coherence.
                   </p>
                 </div>
               </li>
               <li className="flex gap-4 group">
                 <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 border border-violet-100 group-hover:bg-violet-100 transition-all">
                    <span className="mono text-violet-600 font-black text-xs">N:D</span>
                 </div>
                 <div className="flex-1">
                   <span className="text-violet-800 font-black uppercase block mb-1 tracking-widest text-[10px]">Structural Exit</span>
                   <p className="text-xs text-slate-500 leading-relaxed">
                     Nodes anchor the reality; Overwrite transcends it. A system with high Nodes but zero Overwrite is mathematically destined for terminal decay.
                   </p>
                 </div>
               </li>
             </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-black text-slate-900 uppercase flex items-center gap-3">
            <span className="text-pink-600 mono">02.</span> Overwrite Logic
          </h3>
          <div className="bg-white p-8 rounded-[2rem] relative overflow-hidden border border-slate-100 shadow-sm">
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
              Friction is the tax of linear existence. Beyond a specific threshold, a system's internal drag becomes greater than its output capacity.
            </p>
            <div className="mt-4 p-6 bg-pink-50 border border-pink-100 rounded-2xl relative">
              <span className="font-black text-pink-700 uppercase text-[10px] tracking-[0.3em] block mb-2">The Law</span> 
              <p className="text-xs text-pink-800/70 italic leading-relaxed">
                Coherence is not maintained by fixing parts, but by shifting the dimension of the whole. We overwrite the logic where the friction was defined.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-[0.3em]">Typology & Restore</h3>
            <p className="text-[10px] text-purple-400 mono uppercase font-bold tracking-[0.5em]">Systemic Audit Contextual Alignment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-3xl relative group overflow-hidden border border-slate-100 hover:border-cyan-200 hover:shadow-md transition-all">
              <h4 className="text-[11px] font-black text-cyan-600 mono mb-3 uppercase tracking-widest">SEMANTIC</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Restore via <span className="text-cyan-800 font-bold">Logic Re-mapping</span> 
                <span className="text-slate-400 italic block mt-2">[Synchronizing internal definitions]</span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl relative group overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
              <h4 className="text-[11px] font-black text-blue-600 mono mb-3 uppercase tracking-widest">KINETIC</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Restore via <span className="text-blue-800 font-bold">Protocol Flux</span> 
                <span className="text-slate-400 italic block mt-2">[Automating mechanical drag]</span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl relative group overflow-hidden border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all">
              <h4 className="text-[11px] font-black text-purple-600 mono mb-3 uppercase tracking-widest">ETHICAL</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Restore via <span className="text-purple-800 font-bold">Moral Overwrite</span> 
                <span className="text-slate-400 italic block mt-2">[Hard-coding transparency rules]</span>
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl relative group overflow-hidden border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all">
              <h4 className="text-[11px] font-black text-amber-600 mono mb-3 uppercase tracking-widest">TEMPORAL</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Restore via <span className="text-amber-800 font-bold">Prophetic Sync</span> 
                <span className="text-slate-400 italic block mt-2">[Aligning immediate actions]</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};