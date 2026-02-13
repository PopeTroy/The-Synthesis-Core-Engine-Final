import React from 'react';

interface ParameterDef {
  id: string;
  name: string;
  symbol: string;
  description: string;
  example: string;
  color: string;
}

const parameters: ParameterDef[] = [
  {
    id: 'nodes',
    name: 'Nodes (Structural Integrity)',
    symbol: 'N',
    description: 'The strength and clarity of the foundational components. It measures how solid the basic building blocks of the subject are.',
    example: 'Think of a building\'s steel frame. If the nodes are high (90+), the frame is solid and can support a skyscraper.',
    color: 'border-purple-200 text-purple-700 bg-purple-50'
  },
  {
    id: 'protocols',
    name: 'Protocols (Procedural Efficiency)',
    symbol: 'P',
    description: 'The sets of rules and the speed at which they are executed. It measures how smoothly things move from point A to point B.',
    example: 'Think of an airport. High protocols mean you pass security in 5 minutes with no errors.',
    color: 'border-violet-200 text-violet-700 bg-violet-50'
  },
  {
    id: 'filters',
    name: 'Filters (Control Stability)',
    symbol: 'F',
    description: 'The system\'s ability to block out "noise," misinformation, or bad actors while letting the truth through.',
    example: 'Like a water purification plant. High filters keep the water crystal clear even if the river is muddy.',
    color: 'border-indigo-200 text-indigo-700 bg-indigo-50'
  },
  {
    id: 'time_space',
    name: 'Time-Space (Temporal Logistics)',
    symbol: 'T',
    description: 'Scalability and future-proofing. It measures if the subject can survive over long periods and grow without breaking.',
    example: 'A city grid built to handle twice the population 50 years before they actually arrive.',
    color: 'border-blue-200 text-blue-700 bg-blue-50'
  },
  {
    id: 'dimensional_overwrite',
    name: 'Law of Dimensional Overwrite',
    symbol: 'D',
    description: 'The capacity of the subject to redefine its own reality, transcend existing constraints, or "overwrite" paradigms.',
    example: 'The ability to change the rules of the world entirely rather than just playing within them.',
    color: 'border-pink-200 text-pink-700 bg-pink-50'
  },
  {
    id: 'prophetic_typology',
    name: 'Prophetic Typology',
    symbol: 'Y',
    description: 'Archetypal recurrences where past patterns foreshadow future outcomes. Aligns with historical scripts.',
    example: 'Recognizing a "dot-com bubble" pattern in a new industry and predicting the trajectory.',
    color: 'border-emerald-200 text-emerald-700 bg-emerald-50'
  }
];

export const ParameterReference: React.FC = () => {
  return (
    <div className="mt-20 space-y-10">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-black mono tracking-[0.5em] text-slate-300 uppercase">Reference Library</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-100 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {parameters.map((param) => (
          <div key={param.id} className={`bg-white border-l-4 ${param.color} p-8 rounded-r-3xl transition-all hover:translate-y-[-4px] hover:shadow-lg group shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black mono opacity-40 uppercase tracking-widest">Axiom: {param.symbol}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border ${param.color} shadow-sm`}>
                {param.symbol}
              </div>
            </div>
            <h3 className="font-black text-slate-900 mb-3 uppercase text-base tracking-tight group-hover:text-purple-700 transition-colors">{param.name}</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
              {param.description}
            </p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:border-purple-100 transition-all">
              <span className="text-[9px] font-black mono text-slate-400 uppercase block mb-2 tracking-[0.2em]">Contextual Translation</span>
              <p className="text-[12px] text-slate-700 italic leading-snug">
                {param.example}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};