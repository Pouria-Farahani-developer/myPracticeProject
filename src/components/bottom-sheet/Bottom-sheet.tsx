import React from 'react';

import type {BottomSheetProps} from "../../types";

import styles from './Bottom-sheet.module.css';


const BottomSheet: React.FC<BottomSheetProps> = ({config , navigation}) => {

    const {step , backwardStep , forwardStep} = navigation;


    if(step !== null){
        return (
            <>
                <div className={styles['bottom-sheet-overlay']}  />

                <div className={styles['bottom-sheet']}>
                    <div className={styles['bottom-sheet-header']}>
                        <button
                            className={styles['back-button']}
                            onClick={() => backwardStep()}
                        >
                            ←
                        </button>
                        <div className={styles['step-indicator']}>
                            {step} / {config.length}
                        </div>
                    </div>

                    <div className={styles['bottom-sheet-content']}>
                        {config[step - 1]?.rendering}
                    </div>

                    <div className={styles['bottom-sheet-footer']}>
                        <button
                            className={styles['btn-secondary']}
                            onClick={() => backwardStep()}
                        >
                            Before
                        </button>
                        <button
                            className={styles['btn-primary']}
                            onClick={() => forwardStep()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </>
        );
    }
};

export default BottomSheet;
