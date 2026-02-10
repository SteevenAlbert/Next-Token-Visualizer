import React from 'react';
import { TokenProb } from '../utils/math';

interface VisualizerProps {
    data: TokenProb[];
}

const Visualizer: React.FC<VisualizerProps> = ({ data }) => {
    return (
        <fieldset className="border border-[#538786] rounded-md p-4 bg-white/50 backdrop-blur-sm shadow-sm">
            <legend className="text-[#538786] font-bold px-2 text-lg">Next Token Probabilities</legend>
            
            <div className="h-[300px] flex justify-around gap-2 items-end pt-4 pb-2">
                {data.map((item, index) => (
                    <div key={`${item.token}-${index}`} className="flex flex-col items-center w-[9%] h-full group">
                        
                        {/* Bar Container - flex grow to fill space above label */}
                        <div className="flex-grow w-full flex items-end justify-center relative bg-gray-100/30 rounded-t-sm overflow-hidden">
                            {/* The Bar */}
                            <div 
                                className="w-full bg-[#E6907D] transition-all duration-700 ease-in-out relative hover:bg-[#d67a65]"
                                style={{ 
                                    height: `${item.probability * 100}%`,
                                    opacity: item.active ? 1 : 0 // Should strictly be 0 height if not active, but opacity 0 handles visual hiding gracefully 
                                }}
                            >
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                                    {(item.probability * 100).toFixed(4)}%
                                </div>
                            </div>
                        </div>

                        {/* Label */}
                        <div 
                            className="mt-2 text-center text-xs sm:text-sm font-medium transition-opacity duration-500 ease-in-out truncate w-full"
                            style={{ 
                                color: item.active ? '#538786' : '#9ca3af',
                                opacity: item.active ? 1 : 0.5 
                            }}
                        >
                            <div className="truncate font-bold">{item.token}</div>
                            <div className="text-[10px] sm:text-xs font-normal opacity-80">
                                {(item.probability * 100).toFixed(2)}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default Visualizer;