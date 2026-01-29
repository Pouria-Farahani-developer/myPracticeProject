import React, { useState, useEffect, useRef } from 'react';
import './index.css';

interface BottomSheetPage {
    keyName: string;
    rendering: React.ReactNode;
}

interface BottomSheetProps {
    config: BottomSheetPage[];
    isOpen: boolean;
    onClose: () => void;
    initialStep?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
                                                     config,
                                                     isOpen,
                                                     onClose,
                                                     initialStep = 0
                                                 }) => {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const isInitialMount = useRef(true);
    const isNavigatingBack = useRef(false);
    const initialUrl = useRef<string>('');

    // Save initial URL and push first step when bottom sheet opens
    useEffect(() => {
        if (isOpen && isInitialMount.current) {
            // ذخیره URL اولیه بدون step
            initialUrl.current = window.location.href;

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('step', config[currentStep].keyName);
            window.history.pushState({ step: currentStep, bottomSheet: true }, '', newUrl.toString());
            isInitialMount.current = false;
        }
    }, [isOpen, config, currentStep]);

    // Push new URL when navigating forward
    useEffect(() => {
        if (isOpen && !isInitialMount.current && !isNavigatingBack.current) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('step', config[currentStep].keyName);
            window.history.pushState({ step: currentStep, bottomSheet: true }, '', newUrl.toString());
        }
        isNavigatingBack.current = false;
    }, [currentStep, isOpen, config]);

    // Handle browser back button
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state?.bottomSheet) {
                // کاربر داره توی bottom sheet navigate میکنه
                isNavigatingBack.current = true;
                setCurrentStep(event.state.step);
            } else {
                // کاربر از bottom sheet خارج شده
                cleanupAndClose();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Reset when closed
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(initialStep);
            isInitialMount.current = true;
        }
    }, [isOpen, initialStep]);

    const cleanupAndClose = () => {
        // پاک کردن step از URL
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete('step');
        window.history.replaceState({}, '', cleanUrl.toString());

        onClose();
    };

    const handleNext = () => {
        if (currentStep < config.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            window.history.back();
        } else {
            // اگر در صفحه اول هستیم، یک بار برگردیم و بسته بشه
            window.history.back();
        }
    };

    const handleClose = () => {
        // برگشت به URL اولیه و بستن
        const stepsToGoBack = currentStep + 1;
        window.history.go(-stepsToGoBack);

        // اطمینان از پاک شدن step از URL
        setTimeout(() => {
            const cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete('step');
            window.history.replaceState({}, '', cleanUrl.toString());
        }, 0);

        onClose();
    };

    if (!isOpen) return null;

    const currentPage = config[currentStep];
    const isFirstPage = currentStep === 0;
    const isLastPage = currentStep === config.length - 1;

    return (
        <>
            <div className="bottom-sheet-overlay" onClick={handleClose} />
            <div className="bottom-sheet">
                {/* Header */}
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

                {/* Content */}
                <div className="bottom-sheet-content">
                    {currentPage?.rendering}
                </div>

                {/* Footer Navigation */}
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
