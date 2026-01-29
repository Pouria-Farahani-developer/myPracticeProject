import React from 'react';
import './index.css';
import type {BottomSheetProps} from "./types.ts";

const BottomSheet: React.FC<BottomSheetProps> = ({config , navigation}) => {

    const {step , backwardStep , forwardStep} = navigation;


    if(step !== null){
        return (
            <>
                <div className="bottom-sheet-overlay"  />
                <div className="bottom-sheet">
                    <div className="bottom-sheet-header">
                        <button
                            className="back-button"
                            onClick={() => backwardStep()}
                        >
                            ←
                        </button>
                        <div className="step-indicator">
                            {step} / {config.length}
                        </div>

                    </div>

                    <div className="bottom-sheet-content">
                        {config[step - 1]?.rendering}
                    </div>

                    <div className="bottom-sheet-footer">
                        <button
                            className="btn-secondary"
                            onClick={() => backwardStep()}
                        >
                            Before
                        </button>
                        <button
                            className="btn-primary"
                            onClick={() => forwardStep()}
                        >
                            {'Next'}
                        </button>
                    </div>
                </div>
            </>
        );
    }
};

export default BottomSheet;
