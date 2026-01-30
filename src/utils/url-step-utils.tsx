import {STEP} from "./const.ts";

export const getValidStep = (step: null | string, configLength: number) => {
    if (step !== null && !Number.isNaN(+step) && +step <= configLength && +step > 0) {
        return +step;
    }
    return null;
}

export const pushBaseUrl = (url: URL) => {
    url.searchParams.delete(STEP);
    url.search = '';
    url.hash = '';

    window.history.pushState({}, '', url.toString());
}

export const updateStepQuery = (step: number, url: URL) => {
    url.searchParams.set(STEP, `${step}`);
    window.history.pushState(
        {},
        '',
        url.toString()
    );
}


