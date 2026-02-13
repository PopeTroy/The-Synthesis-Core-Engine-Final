import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { SynthesisResponse } from '../types';

interface IntegrityChartProps {
  data: SynthesisResponse;
}

export const IntegrityChart: React.FC<IntegrityChartProps> = ({ data }) => {
  const chartData = [
    { subject: 'STRU', A: data.nodes },
    { subject: 'PROT', A: data.protocols },
    { subject: 'FILT', A: data.filters },
    { subject: 'TEMP', A: data.time_space },
    { subject: 'OVRW', A: data.dimensional_overwrite },
    { subject: 'ARCH', A: data.prophetic_typology },
    { subject: 'SYNC', A: data.resonance },
    { subject: 'DRAG', A: 100 - data.bottlenecks },
    { subject: 'STAB', A: 100 - data.corruption },
  ];

  return (
    <div className="w-full h-80 sm:h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#1e293b" strokeDasharray="5 5" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 800 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Synthesis"
            dataKey="A"
            stroke="#06b6d4"
            strokeWidth={3}
            fill="#8b5cf6"
            fillOpacity={0.2}
            animationDuration={2000}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};