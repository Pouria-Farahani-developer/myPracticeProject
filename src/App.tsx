import BottomSheet from './BottomSheet';
import { config } from "./util.tsx";
import './index.css';
import {useUrlNavigation} from "./use-url-navigation.tsx";
// import {useLocalStorageNavigation} from "./use-local-storage-navigation.tsx";

const App = () => {

    const navigation = useUrlNavigation()

    // const navigation = useLocalStorageNavigation()

    return (
        <div className="mobile-container">
            <div className="mobile-content">
                <button
                    onClick={() => navigation.setCustomStep(2)}
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
