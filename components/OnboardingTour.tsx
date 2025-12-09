
import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { ONBOARDING_STEPS } from '../constants';

interface OnboardingTourProps {
    onComplete: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const step = ONBOARDING_STEPS[stepIndex];

    const handleNext = () => {
        if (stepIndex < ONBOARDING_STEPS.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            onComplete();
        }
    };

    // Note: In a real implementation, we would calculate the position of the `target` ID element.
    // For this demo, we'll use a centered modal approach that highlights the concept.
    
    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-[2px] animate-in fade-in duration-300">
             {/* Highlight Effect (Simulated) */}
             <div className="absolute inset-0 pointer-events-none">
                {/* We could use SVG masks here for true spotlight effect */}
             </div>

             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative border-2 border-[#00d09c] animate-in slide-in-from-bottom-10 zoom-in-95 duration-300 m-4">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase text-[#00d09c] tracking-wider">
                        Step {stepIndex + 1} of {ONBOARDING_STEPS.length}
                    </span>
                    <button onClick={onComplete} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={18} />
                    </button>
                 </div>
                 
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {step.content}
                 </p>

                 <div className="flex items-center justify-between">
                     <div className="flex gap-1">
                         {ONBOARDING_STEPS.map((_, i) => (
                             <div key={i} className={`h-1.5 rounded-full transition-all ${i === stepIndex ? 'w-6 bg-[#00d09c]' : 'w-1.5 bg-gray-200 dark:bg-slate-700'}`}></div>
                         ))}
                     </div>
                     <button 
                        onClick={handleNext}
                        className="bg-[#00d09c] hover:bg-[#00b386] text-white px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95"
                     >
                        {stepIndex === ONBOARDING_STEPS.length - 1 ? 'Finish' : 'Next'}
                        <ArrowRight size={16} />
                     </button>
                 </div>
             </div>
        </div>
    );
};

export default OnboardingTour;
