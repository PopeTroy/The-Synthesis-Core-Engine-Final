import React from 'react';
import { CalendarNode } from '../types';

interface SynthesisCalendarProps {
  data: CalendarNode[];
}

export const SynthesisCalendar: React.FC<SynthesisCalendarProps> = ({ data }) => {
  const now = new Date();
  const currentMonth = now.toLocaleString('default', { month: 'long' });
  const currentYear = now.getFullYear();
  
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const paddingSlots = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="text-[11px] font-black text-slate-900 mono uppercase tracking-[1em] flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-purple-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            Temporal Synchronization Grid
          </h4>
          <span className="text-[12px] mono text-purple-600 font-bold mt-1 uppercase tracking-[0.4em] pl-9">
            {currentMonth} <span className="text-slate-300">/</span> {currentYear}
          </span>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 text-[9px] mono font-bold uppercase tracking-[0.2em] bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-sm"></div> Friction</div>
           <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm"></div> Resonance</div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-blue-500 shadow-sm"></div> Filter Target</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px mb-4 opacity-40">
        {weekDays.map(day => (
          <div key={day} className="text-[10px] mono font-black text-slate-400 text-center py-2 uppercase tracking-[0.3em]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {paddingSlots.map((i) => (
          <div key={`pad-${i}`} className="aspect-square opacity-0"></div>
        ))}
        {data.map((node) => (
          <div 
            key={node.day_offset} 
            className={`relative aspect-square bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-2 sm:p-3 flex flex-col justify-between group hover:border-purple-300 hover:shadow-lg transition-all duration-500 cursor-crosshair overflow-hidden ${node.filter_trigger ? 'ring-2 ring-blue-100 ring-inset' : ''}`}
          >
             <div className="flex justify-between items-start relative z-10">
                <span className="text-[9px] sm:text-[11px] mono font-black text-slate-300 group-hover:text-purple-600 transition-colors duration-500">{node.day_offset}</span>
                {node.filter_trigger && (
                  <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-sm shadow-md animate-pulse"></div>
                )}
             </div>

             <div className="flex flex-col gap-1 sm:gap-2 relative z-10 mt-auto">
                <div className="h-0.5 sm:h-1 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                   <div className="h-full bg-pink-500 transition-all duration-1000" style={{ width: `${node.friction_forecast * 10}%` }}></div>
                </div>
                <div className="h-full sm:h-1 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                   <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${node.resonance_forecast * 10}%` }}></div>
                </div>
             </div>

             {/* Optimized Compact Hover Detail - Light Mode */}
             <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-1 sm:p-2 text-center z-20 backdrop-blur-sm border border-purple-100 overflow-hidden">
                <span className="text-[7px] sm:text-[8px] mono font-black text-slate-900 uppercase mb-0.5 sm:mb-1 tracking-tighter leading-tight line-clamp-2 max-w-full px-1">
                  {node.event_signature}
                </span>
                
                {node.filter_trigger && (
                  <div className="flex flex-col items-center w-full mt-0.5">
                    <div className="w-6 sm:w-8 h-[1px] bg-slate-100 mb-1 shrink-0"></div>
                    <span className="text-[7px] sm:text-[9px] font-bold text-blue-700 italic bg-blue-50 px-1 py-0.5 rounded w-full line-clamp-2 leading-[1.1]">
                      {node.protocol_archetype_sync || 'SYNC...'}
                    </span>
                    <span className="text-[6px] sm:text-[7px] font-black bg-slate-900 px-1.5 py-0.5 rounded-full text-white uppercase mt-1 shadow-md tracking-widest leading-none shrink-0">
                      DEPLOY
                    </span>
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white bg-gradient-to-r from-purple-50 via-white to-transparent border border-purple-100 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] flex items-center gap-4 sm:gap-8 shadow-xl relative overflow-hidden group">
         <div className="absolute -left-10 top-0 w-32 h-32 bg-purple-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
         <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[1.2rem] sm:rounded-[1.5rem] bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
         </div>
         <div className="flex-1">
            <h5 className="text-[9px] sm:text-[10px] font-black text-blue-700 uppercase tracking-[0.6em] mb-1 sm:mb-2">Protocol Directive</h5>
            <p className="text-[11px] sm:text-[13px] text-slate-600 font-medium leading-relaxed max-w-3xl">
              Target nodes highlight critical temporal interference. On these markers, the <span className="text-slate-900 font-black underline decoration-purple-300 decoration-2 underline-offset-4">Synthesis Core</span> must deploy specific protocol-archetype pairings to neutralize systemic entropy for this cycle.
            </p>
         </div>
      </div>
    </div>
  );
};