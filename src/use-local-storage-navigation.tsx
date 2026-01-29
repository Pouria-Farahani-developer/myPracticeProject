import {useReducer} from "react";
import {config} from "./util.tsx";
import type {navigationProps} from "./types.ts";

export const useLocalStorageNavigation = (): navigationProps => {
    const [, fakeRerender] = useReducer(() => ({}), {});

    const configLength = config.length;


    const currentStep = () => {
        const step = localStorage.getItem('step')
        if (step !== null && !Number.isNaN(+step) && +step <= configLength && +step > 0) {
            return +step;
        }
        return null;
    }


    const step = currentStep();


    const forwardStep = () => {
        if (step !== null) {
            if (step === configLength) {
                localStorage.removeItem('step');
            } else {
                const editedStep = step + 1;
                localStorage.setItem('step', `${editedStep}`);
            }

            fakeRerender();

        }

    }


    const backwardStep = () => {
        if (step !== null) {
            if (step > 1) {
                const editedStep = step - 1;
                localStorage.setItem('step', `${editedStep}`);
            } else {
                localStorage.removeItem('step');
            }
            fakeRerender();
        }

    }

    const setCustomStep = (step: number) => {
        localStorage.setItem('step', `${step}`)

        fakeRerender()
    }


    return {backwardStep, forwardStep, setCustomStep, step};

}