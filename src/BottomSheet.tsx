import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import type {BottomSheetProps} from "./types.ts";

const BottomSheet: React.FC<BottomSheetProps> = ({
                                                     config,
                                                     isOpen,
                                                     onClose,
                                                     initialStep = 0
                                                 }) => {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const hasInitialUrlPushed = useRef(false);
    const isNavigatingBack = useRef(false);

    const cleanupAndClose = () => {
        const cleanUrl = new URL(window.location.href);

        cleanUrl.searchParams.delete('step');
        cleanUrl.search = '';
        cleanUrl.hash = '';

        window.history.pushState({}, '', cleanUrl.toString());
        window.history.replaceState({}, '', cleanUrl.toString());

        onClose();
    };


    // Push URL فقط برای صفحه اول - یک بار
    useEffect(() => {
        if (isOpen && !hasInitialUrlPushed.current) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('step', config[0].keyName);
            window.history.pushState(
                { step: 0, bottomSheet: true },
                '',
                newUrl.toString()
            );
            hasInitialUrlPushed.current = true;
        }
    }, [isOpen, config]);

    // Push URL برای صفحات 2 به بعد
    useEffect(() => {
        if (
            isOpen &&
            hasInitialUrlPushed.current &&
            currentStep > 0 &&
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
    }, [currentStep, isOpen, config]);

    // Handle browser back button
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

    // Reset when closed
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(initialStep);
            hasInitialUrlPushed.current = false;
        }
    }, [isOpen, initialStep]);

    const handleNext = () => {
        if (currentStep < config.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleClose = () => {
        // محاسبه تعداد step‌هایی که باید برگردیم
        // اگر در صفحه 3 هستیم: step 3, step 2, step 1 = 3 تا
        const stepsToGoBack = currentStep + 1;
        window.history.go(-stepsToGoBack);
    };

    if (!isOpen) return null;

    const currentPage = config[currentStep];
    const isFirstPage = currentStep === 0;
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
                        disabled={isFirstPage}
                    >
                        قبلی
                    </button>
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                        disabled={isLastPage}
                    >
                        {isLastPage ? 'اتمام' : 'بعدی'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default BottomSheet;
