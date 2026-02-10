import React, { useState, useMemo } from 'react';
import ControlPanel from './components/ControlPanel';
import Visualizer from './components/Visualizer';
import InfoSection from './components/InfoSection';
import { SCENARIOS } from './data/scenarios';
import { calculateDistribution } from './utils/math';

const App: React.FC = () => {
    // Default to the first scenario: "The cat sat on the..."
    const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);
    
    // Default values matched to user request/demo
    const [temperature, setTemperature] = useState<number>(1.0);
    const [topK, setTopK] = useState<number>(10);
    const [topP, setTopP] = useState<number>(1.0); // Default to 1.0 (allow all) to see full distribution initially

    // Derived state
    const currentScenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];

    // Calculate probabilities
    const probabilityData = useMemo(() => {
        return calculateDistribution(
            currentScenario.tokens,
            currentScenario.baseLogits,
            temperature,
            topK,
            topP
        );
    }, [currentScenario, temperature, topK, topP]);

    return (
        <div className="min-h-screen py-10 px-4 md:px-8 max-w-4xl mx-auto flex flex-col gap-6">
            <header className="text-center mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-[#538786] mb-2 tracking-tight">
                    Next Token Probability
                </h1>
                <p className="text-[#E6907D] font-medium text-lg">
                    Visualizing Temperature, Top-K & Top-P
                </p>
            </header>

            <main className="space-y-8">
                <ControlPanel 
                    scenarios={SCENARIOS}
                    selectedScenarioId={selectedScenarioId}
                    onScenarioChange={setSelectedScenarioId}
                    temperature={temperature}
                    onTemperatureChange={setTemperature}
                    topK={topK}
                    onTopKChange={setTopK}
                    topP={topP}
                    onTopPChange={setTopP}
                />

                <Visualizer data={probabilityData} />

                <InfoSection />
            </main>
            
            <footer className="text-center text-[#538786]/50 text-xs mt-10">
                Created for Lebanon Conference 2026
            </footer>
        </div>
    );
};

export default App;