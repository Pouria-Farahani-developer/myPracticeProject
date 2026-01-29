import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import type { BottomSheetProps } from "./types.ts";

const BottomSheet: React.FC<BottomSheetProps> = ({
                                                     config,
                                                     isOpen,
                                                     onClose,
                                                     initialStep = 0
                                                 }) => {

    const [currentStep, setCurrentStep] = useState(initialStep);

    const hasInitialUrlPushed = useRef(false);

    const isNavigatingBack = useRef(false);

    const cleanupAndClose = useCallback(() => {
        const cleanUrl = new URL(window.location.href);

        cleanUrl.searchParams.delete('step');
        cleanUrl.search = '';
        cleanUrl.hash = '';

        window.history.pushState({}, '', cleanUrl.toString());
        window.history.replaceState({}, '', cleanUrl.toString());

        onClose();
    }, [onClose]);


    useEffect(() => {
            cleanupAndClose()
    }, []);


    useEffect(() => {
        if (isOpen && !hasInitialUrlPushed.current) {
            for (let i = 0; i <= initialStep; i++) {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('step', config[i].keyName);
                window.history.pushState(
                    { step: i, bottomSheet: true },
                    '',
                    newUrl.toString()
                );
            }
            hasInitialUrlPushed.current = true;
        }


        if (
            isOpen &&
            hasInitialUrlPushed.current &&
            currentStep > initialStep &&
            !isNavigatingBack.current
        ) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('step', config[currentStep].keyName);
            window.history.pushState(
                { step: currentStep, bottomSheet: true },
                '',
                newUrl.toString()
            );
        }
        isNavigatingBack.current = false;
    }, [currentStep, isOpen, config, initialStep]);

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state?.bottomSheet) {
                isNavigatingBack.current = true;
                setCurrentStep(event.state.step);
            } else {
                cleanupAndClose();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [cleanupAndClose]);

    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(initialStep);
            hasInitialUrlPushed.current = false;
        }
    }, [isOpen, initialStep]);

    const handleNext = async () => {
        const currentPage = config[currentStep];
        const isLastPage = currentStep === config.length - 1;

        if (currentPage.onNext) {
            await currentPage.onNext();
        }

        if (isLastPage) {
            handleClose();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };


    const handleBack = async () => {
        const currentPage = config[currentStep];
        const isFirstPage = currentStep === 0;

        if (currentPage.onBack) {
            await currentPage.onBack();
        }

        if (isFirstPage) {
            handleClose();
        } else {
            window.history.back();
        }
    };

    const handleClose = () => {
        const stepsToGoBack = currentStep + 1;
        window.history.go(-stepsToGoBack);
    };

    if (!isOpen) return null;

    const currentPage = config[currentStep];
    const isLastPage = currentStep === config.length - 1;

    return (
        <>
            <div className="bottom-sheet-overlay" onClick={handleClose} />
            <div className="bottom-sheet">
                <div className="bottom-sheet-header">
                    <button
                        className="back-button"
                        onClick={handleBack}
                    >
                        ←
                    </button>
                    <div className="step-indicator">
                        {currentStep + 1} / {config.length}
                    </div>
                    <button className="close-button" onClick={handleClose}>
                        ✕
                    </button>
                </div>

                <div className="bottom-sheet-content">
                    {currentPage?.rendering}
                </div>

                <div className="bottom-sheet-footer">
                    <button
                        className="btn-secondary"
                        onClick={handleBack}
                    >
                        Before
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                    >
                        {isLastPage ? 'Complete' : 'Next'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default BottomSheet;
