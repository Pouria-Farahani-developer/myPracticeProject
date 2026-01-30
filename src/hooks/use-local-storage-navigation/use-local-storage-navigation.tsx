import {useReducer} from "react";
import {getValidStep, maxAllowedStep, STEP} from "../../utils";
import type {navigationProps} from "../../types";

export const useLocalStorageNavigation = (): navigationProps => {
    const [, fakeRerender] = useReducer(() => ({}), {});


    const stepFromStorage : string | null = localStorage.getItem(STEP)

    const step : number | null = getValidStep(stepFromStorage,maxAllowedStep);


    const forwardStep = () => {
        if (step !== null) {
            if (step === maxAllowedStep) {
                localStorage.removeItem(STEP);
            } else {
                const targetStep = step + 1;
                localStorage.setItem(STEP, `${targetStep}`);
            }

            fakeRerender();

        }

    }


    const backwardStep = () => {
        if (step !== null) {
            if (step > 1) {
                const targetStep = step - 1;
                localStorage.setItem(STEP, `${targetStep}`);
            } else {
                localStorage.removeItem(STEP);
            }
            fakeRerender();
        }

    }

    const setCustomStep = (step: number) => {
        localStorage.setItem(STEP, `${step}`)

        fakeRerender()
    }


    return {backwardStep, forwardStep, setCustomStep, step};

}