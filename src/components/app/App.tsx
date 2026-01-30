import BottomSheet from '../bottom-sheet/Bottom-sheet.tsx';

import {useUrlNavigation} from "../../hooks";

import {config, INITIAL_STEP} from "../../utils";

import styles from './App.module.css';

const App = () => {

    // Use this line if you want to treat the URL as the source of truth for state
    const navigation = useUrlNavigation()

    // Use this line if you want to treat the localStorage as the source of truth for state
    // const navigation = useLocalStorageNavigation()

    const handleClick = () => {
        navigation.setCustomStep(INITIAL_STEP)
    }

    return (
        <div className={styles['mobile-container']}>
            <div className={styles['mobile-row']}>
                <div className={styles['mobile-content']}>
                    <button
                        onClick={handleClick}
                        className={styles['open-button']}
                    >
                        Open Bottom Sheet
                    </button>
                    <BottomSheet
                        config={config}
                        navigation={navigation}
                    />
                </div>
            </div>
        </div>

    );
};

export default App;
