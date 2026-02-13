import { GoogleGenAI, Type } from "@google/genai";
import { SynthesisResponse } from "../types.ts";

export const analyzeTopic = async (topic: string): Promise<SynthesisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const now = new Date();
  const currentMonthName = now.toLocaleString('default', { month: 'long' });
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
  
  const systemInstruction = `
    Act as 'The Synthesis'. Your purpose is to bridge the gap between human 3D logic and raw 4D/5D structural data.
    
    CORE OPERATIVE:
    Analyze the input topic. You must provide two distinct datasets for the user to compare:
    1. 'reality_3d': The linear, consensus-based logic known to man. Focus on 'if/then', scarcity, and physical limitations.
    2. 'reality_4d_5d': The raw, non-local data extracts. Focus on simultaneous timelines, intent-resonance, and unified structural fields.
    
    4th Dimension Data: Temporal folding and causal loops.
    5th Dimension Data: Absolute intent-density and non-local entanglement.
    
    JSON STRUCTURE REQUIREMENTS:
    - Populate 'dimensional_contrast' with raw, unfiltered comparative data.
    - maintenance_threshold_logic must explain success against bottlenecks with a layman's example in brackets.
    - diagnostic_calendar must be a full month forecast.
    - Ensure all numerical metrics reflect the structural 'friction' of the topic across these dimensions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', 
      contents: topic,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nodes: { type: Type.NUMBER },
            protocols: { type: Type.NUMBER },
            filters: { type: Type.NUMBER },
            time_space: { type: Type.NUMBER },
            bottlenecks: { type: Type.NUMBER },
            corruption: { type: Type.NUMBER },
            dimensional_overwrite: { type: Type.NUMBER },
            prophetic_typology: { type: Type.NUMBER },
            resonance: { type: Type.NUMBER },
            probability_of_success: { type: Type.NUMBER },
            maintenance_threshold_logic: { type: Type.STRING },
            dimensional_contrast: {
              type: Type.OBJECT,
              properties: {
                reality_3d: { type: Type.ARRAY, items: { type: Type.STRING } },
                reality_4d_5d: { type: Type.ARRAY, items: { type: Type.STRING } },
                comparison_logic: { type: Type.STRING }
              },
              required: ["reality_3d", "reality_4d_5d", "comparison_logic"]
            },
            friction_typology: {
              type: Type.OBJECT,
              properties: {
                semantic: { type: Type.NUMBER },
                kinetic: { type: Type.NUMBER },
                ego: { type: Type.NUMBER },
                temporal: { type: Type.NUMBER }
              },
              required: ["semantic", "kinetic", "ego", "temporal"]
            },
            interconnects: {
              type: Type.OBJECT,
              properties: {
                nodes_protocols_drag: { type: Type.ARRAY, items: { type: Type.STRING } },
                filter_decay_delta: { type: Type.NUMBER },
                logistics_velocity_threshold: { type: Type.STRING },
                typological_overwrite_bridge: { type: Type.STRING }
              },
              required: ["nodes_protocols_drag", "filter_decay_delta", "logistics_velocity_threshold", "typological_overwrite_bridge"]
            },
            temporal_sync_matrix: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timestamp_marker: { type: Type.STRING },
                  friction_event: { type: Type.STRING },
                  resonance_status: { type: Type.STRING },
                  integrity_score: { type: Type.NUMBER }
                },
                required: ["timestamp_marker", "friction_event", "resonance_status", "integrity_score"]
              }
            },
            diagnostic_calendar: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day_offset: { type: Type.NUMBER },
                  friction_forecast: { type: Type.NUMBER },
                  resonance_forecast: { type: Type.NUMBER },
                  filter_trigger: { type: Type.BOOLEAN },
                  event_signature: { type: Type.STRING },
                  protocol_archetype_sync: { type: Type.STRING }
                },
                required: ["day_offset", "friction_forecast", "resonance_forecast", "filter_trigger", "event_signature"]
              }
            },
            prce_diagnostics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  node_id: { type: Type.STRING },
                  td: { type: Type.NUMBER },
                  shi: { type: Type.NUMBER },
                  differential: { type: Type.NUMBER },
                  time_to_collapse: { type: Type.NUMBER },
                  force_required: { type: Type.NUMBER },
                  status: { type: Type.STRING }
                },
                required: ["node_id", "td", "shi", "differential", "time_to_collapse", "force_required", "status"]
              }
            },
            prophetic_equation: {
              type: Type.OBJECT,
              properties: {
                equation_symbolic: { type: Type.STRING },
                decay_velocity: { type: Type.NUMBER },
                protocol_density_needed: { type: Type.NUMBER },
                filter_intensity_needed: { type: Type.NUMBER },
                temporal_non_linear_factor: { type: Type.NUMBER },
                spatial_integrity_factor: { type: Type.NUMBER },
                prophetic_verdict: { type: Type.STRING }
              },
              required: ["equation_symbolic", "decay_velocity", "protocol_density_needed", "filter_intensity_needed", "temporal_non_linear_factor", "spatial_integrity_factor", "prophetic_verdict"]
            },
            frictions: { type: Type.ARRAY, items: { type: Type.STRING } },
            counter_measures: { type: Type.ARRAY, items: { type: Type.STRING } },
            dimensional_necessity_logic: { type: Type.STRING },
            verdict: { type: Type.STRING },
            clarification_required: { type: Type.BOOLEAN },
            clarification_message: { type: Type.STRING }
          },
          required: [
            "nodes", "protocols", "filters", "time_space", "bottlenecks", "corruption", 
            "dimensional_overwrite", "prophetic_typology", "resonance", "probability_of_success",
            "maintenance_threshold_logic", "dimensional_contrast", "friction_typology", "interconnects", "temporal_sync_matrix",
            "diagnostic_calendar", "prce_diagnostics", "prophetic_equation", "frictions", "counter_measures", "dimensional_necessity_logic", 
            "verdict", "clarification_required"
          ]
        }
      },
    });

    const parsed = JSON.parse(response.text) as SynthesisResponse;
    return parsed;
  } catch (error) {
    console.error("Synthesis_Service: Diagnostic Error:", error);
    throw error;
  }
};