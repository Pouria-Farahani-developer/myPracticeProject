import { useState } from 'react';
import BottomSheet from './BottomSheet';
import { config } from "./util.tsx";
import './index.css';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mobile-container">
            <div className="mobile-content">
                <button
                    className="open-button"
                    onClick={() => setIsOpen(true)}
                >
                    Open Bottom Sheet
                </button>

                <BottomSheet
                    config={config}
                    isOpen={isOpen}
                    initialStep={1}
                    onClose={() => setIsOpen(false)}
                />
            </div>
        </div>
    );
};

export default App;
