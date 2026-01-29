import {useEffect, useReducer} from "react";
import {config} from "./util.tsx";
import type {navigationProps} from "./types.ts";

export const useUrlNavigation  = () : navigationProps => {
    const [, fakeRerender] = useReducer(() => ({}), {});

    useEffect(() => {
        window.addEventListener('popstate', fakeRerender);
        return () => window.removeEventListener('popstate', fakeRerender);
    }, []);

    const configLength = config.length;

    const cleanUrl = new URL(window.location.href);

    const currentStep = () => {
        const step = cleanUrl.searchParams.get('step');
        if (step !== null && !Number.isNaN(+step) && +step <= configLength && +step > 0) {
            return +step;
        }
        return null;
    }


    const step = currentStep();



    const forwardStep = () => {
        const newUrl = new URL(window.location.href);
        if(step !== null) {
            if(step === configLength) {
                newUrl.searchParams.delete('step');
                newUrl.search = '';
                newUrl.hash = '';

                window.history.pushState({}, '', newUrl.toString());
            } else {
                const editedStep = step + 1;
                newUrl.searchParams.set('step', `${editedStep}`);
                window.history.pushState(
                    {},
                    '',
                    newUrl.toString()
                )
            }

            fakeRerender();

        }

    }


    const backwardStep = () => {
        const newUrl = new URL(window.location.href);
        if(step !== null) {
            if(step > 1){
                const editedStep = step - 1;
                newUrl.searchParams.set('step', `${editedStep}`);
                window.history.pushState(
                    {},
                    '',
                    newUrl.toString()
                );

            }else{
                newUrl.searchParams.delete('step');
                newUrl.search = '';
                newUrl.hash = '';

                window.history.pushState({}, '', newUrl.toString());
            }
            fakeRerender();
        }

    }

    const setCustomStep = (step: number) => {
        const newUrl = new URL(window.location.href);

        newUrl.searchParams.set('step', `${step}`);
        window.history.pushState(
            {},
            '',
            newUrl.toString()
        )

        fakeRerender()
    }


    return {backwardStep, forwardStep , setCustomStep ,step };

}