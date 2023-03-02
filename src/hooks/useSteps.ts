import { FormEvent, useState } from "react";
import { swap } from "../utils/utils";

enum ElementState {
    Default = "default",
    Changing = "changing",
    Modified = "modified"
}
  
interface LettersStep {
    letters: string[];
    index?: number;
    state?: ElementState;
}

export const useSteps = () => {
    const [steps, setSteps] = useState<LettersStep[]>([]);
    const [currentStep, setCurrentStep] = useState<LettersStep | null>(null);
    const [stepsIndex, setStepsIndex] = useState(0);

    const onFormSubmit = (e: FormEvent<HTMLFormElement>, items: string) => {
        e.preventDefault();
    
        setCurrentStep(null);
        setStepsIndex(0);
        setSteps(getSteps(items));
    }

    const getSteps = (source: string): LettersStep[] => {
        const letters = source.split("");
        const steps: LettersStep[] = [];
        
        if (letters.length === 0) {
            return steps;
        }
        
        steps.push({
            letters: [...letters]
        });
        
        let leftIndex = 0;
        let rightIndex = letters.length - leftIndex - 1;
        
        while (leftIndex <= rightIndex) {
            steps.push({
            letters: [...letters],
            index: leftIndex,
            state: ElementState.Changing
            });

            swap(letters, leftIndex, rightIndex);

            steps.push({
            letters: [...letters],
            index: leftIndex,
            state: ElementState.Modified
            });
        
            leftIndex++;
            rightIndex--;
        }
        
        steps.push({
            letters: [...letters]
        });
        
        return steps;
    };
    return { getSteps }
    
}