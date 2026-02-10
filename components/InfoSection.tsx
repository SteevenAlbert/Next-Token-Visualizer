import React, { useState } from 'react';

const InfoSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-4 border border-[#538786]/20 rounded-md overflow-hidden bg-white/40">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 py-3 bg-[#538786]/10 hover:bg-[#538786]/20 text-[#538786] font-bold flex items-center gap-2 transition-colors"
            >
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                Understand this visualization
            </button>
            
            {isOpen && (
                <div className="p-4 text-gray-700 text-sm leading-relaxed space-y-4 animate-fadeIn">
                    <p>
                        This visualization shows the probabilities for the top 10 most likely next tokens
                        for the selected prompt, and how those probabilities are affected by changing the
                        <em> temperature</em>, <em>top-k</em>, and <em>top-p</em> parameters.
                    </p>
                    
                    <div className="bg-white/60 p-4 rounded-md border border-[#538786]/10">
                        <h4 className="font-bold text-[#538786] mb-2 text-base">Parameters</h4>
                        <ul className="space-y-3 list-disc pl-5">
                            <li>
                                <strong className="text-[#E6907D]">Temperature</strong>: Controls randomness. 
                                A temperature of 1.0 is the default. Increasing (>1.0) flattens the distribution, making rare tokens more likely (more creative/chaotic). 
                                Decreasing (&lt;1.0) sharpens it, making the most likely token even more dominant (more predictable).
                            </li>
                            <li>
                                <strong className="text-[#E6907D]">Top-K</strong>: Limits the choice to the top K most likely tokens.
                                If Top-K is 1, the model always picks the single most likely word (Greedy Decoding). If 10, it considers all 10 shown here.
                            </li>
                            <li>
                                <strong className="text-[#E6907D]">Top-P (Nucleus Sampling)</strong>: Selects the smallest set of tokens whose cumulative probability exceeds P. 
                                For example, if P=0.9, we add up tokens starting from the most likely until the sum reaches 90%, then discard the rest. 
                                This dynamically adjusts the number of options based on confidence.
                            </li>
                        </ul>
                    </div>

                    <p className="italic text-gray-500 text-xs">
                        Note: This is a simulation using pre-defined logits to demonstrate the mathematical effects of sampling parameters. 
                        In a real LLM, there are thousands of possible tokens.
                    </p>
                </div>
            )}
        </div>
    );
};

export default InfoSection;