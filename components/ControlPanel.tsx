import React from 'react';
import { Scenario } from '../data/scenarios';

interface ControlPanelProps {
    scenarios: Scenario[];
    selectedScenarioId: string;
    onScenarioChange: (id: string) => void;
    temperature: number;
    onTemperatureChange: (val: number) => void;
    topK: number;
    onTopKChange: (val: number) => void;
    topP: number;
    onTopPChange: (val: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    scenarios,
    selectedScenarioId,
    onScenarioChange,
    temperature,
    onTemperatureChange,
    topK,
    onTopKChange,
    topP,
    onTopPChange,
}) => {
    return (
        <fieldset className="border border-[#538786] rounded-md p-4 mb-6 bg-white/50 backdrop-blur-sm shadow-sm">
            <legend className="text-[#538786] font-bold px-2 text-lg">Parameters</legend>
            
            <div className="space-y-4">
                {/* Prompt Selection */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label htmlFor="prompt" className="font-semibold text-[#538786] min-w-[100px]">Prompt</label>
                    <div className="flex-grow relative">
                        <select 
                            id="prompt"
                            value={selectedScenarioId}
                            onChange={(e) => onScenarioChange(e.target.value)}
                            className="w-full p-2 rounded border border-[#538786]/30 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#538786] transition-shadow"
                        >
                            {scenarios.map(s => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sliders Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {/* Temperature */}
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="temperature" className="font-semibold text-[#538786]">Temperature</label>
                            <span className="font-mono text-[#538786] bg-white px-2 py-0.5 rounded border border-[#538786]/20 min-w-[4.5ch] text-right">
                                {temperature.toFixed(2)}
                            </span>
                        </div>
                        <input 
                            id="temperature" 
                            type="range" 
                            min="0.01" 
                            max="5.0" 
                            step="0.01" 
                            value={temperature}
                            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Top-K */}
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="topk" className="font-semibold text-[#538786]">Top-K</label>
                            <span className="font-mono text-[#538786] bg-white px-2 py-0.5 rounded border border-[#538786]/20 min-w-[3ch] text-right">
                                {topK}
                            </span>
                        </div>
                        <input 
                            id="topk" 
                            type="range" 
                            min="1" 
                            max="10" 
                            step="1" 
                            value={topK}
                            onChange={(e) => onTopKChange(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Top-P */}
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="topp" className="font-semibold text-[#538786]">Top-P</label>
                            <span className="font-mono text-[#538786] bg-white px-2 py-0.5 rounded border border-[#538786]/20 min-w-[4.5ch] text-right">
                                {topP.toFixed(2)}
                            </span>
                        </div>
                        <input 
                            id="topp" 
                            type="range" 
                            min="0.01" 
                            max="1.0" 
                            step="0.01" 
                            value={topP}
                            onChange={(e) => onTopPChange(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export default ControlPanel;