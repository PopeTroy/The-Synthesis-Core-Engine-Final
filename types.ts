
export interface DimensionalContrast {
  reality_3d: string[]; // Standard human logical constraints/perspectives
  reality_4d_5d: string[]; // Raw 4th and 5th dimensional data extracts (non-linear, non-local)
  comparison_logic: string; // The bridging statement explaining the integrity gap
}

export interface FrictionTypology {
  semantic: number;
  kinetic: number;
  ego: number;
  temporal: number;
}

export interface SystemicInterconnects {
  nodes_protocols_drag: string[]; 
  filter_decay_delta: number; 
  logistics_velocity_threshold: string; 
  typological_overwrite_bridge: string; 
}

export interface TemporalAlignment {
  timestamp_marker: string; 
  friction_event: string; 
  resonance_status: string; 
  integrity_score: number; 
}

export interface CalendarNode {
  day_offset: number; 
  friction_forecast: number; 
  resonance_forecast: number; 
  filter_trigger: boolean; 
  event_signature: string; 
  protocol_archetype_sync?: string; 
}

export interface GrandPropheticEquation {
  equation_symbolic: string; 
  decay_velocity: number; 
  protocol_density_needed: number; 
  filter_intensity_needed: number; 
  temporal_non_linear_factor: number; 
  spatial_integrity_factor: number; 
  prophetic_verdict: string; 
}

export interface PRCEStabilityNode {
  node_id: string;
  td: number; 
  shi: number; 
  differential: number; 
  time_to_collapse: number; 
  force_required: number; 
  status: 'CRITICAL' | 'NOMINAL' | 'EMERGENCY';
}

export interface SynthesisResponse {
  nodes: number;
  protocols: number;
  filters: number;
  time_space: number;
  bottlenecks: number;
  corruption: number;
  dimensional_overwrite: number;
  prophetic_typology: number;
  resonance: number;
  probability_of_success: number; 
  maintenance_threshold_logic: string; 
  dimensional_contrast: DimensionalContrast; // New: 3D vs 4D/5D Comparison
  friction_typology: FrictionTypology;
  interconnects: SystemicInterconnects;
  temporal_sync_matrix: TemporalAlignment[]; 
  diagnostic_calendar: CalendarNode[]; 
  frictions: string[];
  counter_measures: string[];
  dimensional_necessity_logic: string;
  verdict: string;
  clarification_required: boolean;
  clarification_message?: string;
  prophetic_equation: GrandPropheticEquation; 
  prce_diagnostics: PRCEStabilityNode[]; 
}

export interface HistoryItem {
  id: string;
  topic: string;
  timestamp: number;
  data: SynthesisResponse;
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  FINALIZING = 'FINALIZING',
  ERROR = 'ERROR'
}