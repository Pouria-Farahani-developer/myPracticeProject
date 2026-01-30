import {useEffect, useReducer} from "react";
import type {NavigationProps} from "../../types";
import {getValidStep, pushBaseUrl, updateStepQuery, maxAllowedStep , STEP} from "../../utils";

export const useUrlNavigation = (): NavigationProps => {
    const [, fakeRerender] = useReducer(() => ({}), {});

    useEffect(() => {
        window.addEventListener('popstate', fakeRerender);
        return () => window.removeEventListener('popstate', fakeRerender);
    }, []);


    const currentUrl: URL = new URL(window.location.href);

    const stepParam: string | null = currentUrl.searchParams.get(STEP);

    const step: number | null = getValidStep(stepParam, maxAllowedStep);

    const forwardStep = () => {
        const newUrl = new URL(window.location.href);
        if (step !== null) {
            if (step === maxAllowedStep) {
                pushBaseUrl(newUrl);
            } else {
                const stepQuery = step + 1;
                updateStepQuery(stepQuery, newUrl)
            }

            fakeRerender();

        }

    }


    const backwardStep = () => {
        const newUrl = new URL(window.location.href);
        if (step !== null) {
            if (step > 1) {
                const stepQuery = step - 1;

                updateStepQuery(stepQuery, newUrl)


            } else {
                pushBaseUrl(newUrl)
            }
            fakeRerender();
        }

    }

    const setCustomStep = (step: number) => {
        const newUrl = new URL(window.location.href);
        updateStepQuery(step, newUrl)
        fakeRerender()
    }


    return {backwardStep, forwardStep, setCustomStep, step};

}