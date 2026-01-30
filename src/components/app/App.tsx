import BottomSheet from '../bottom-sheet/BottomSheet.tsx';

import {useUrlNavigation , useLocalStorageNavigation} from "../../hooks";

import {config} from "../../utils";

import './App.css';

const App = () => {

    const navigation = useUrlNavigation()

    // const navigation = useLocalStorageNavigation()

    return (
        <div className="mobile-container">
            <div className="mobile-content">
                <button
                    onClick={() => navigation.setCustomStep(1)}
                    className="open-button"
                >
                    Open Bottom Sheet
                </button>

                <BottomSheet
                    config={config}
                    navigation={navigation}
                />
            </div>
        </div>
    );
};

export default App;
