import type { BottomSheetStep} from "../types";

export const config : BottomSheetStep[] = [
    {
        keyName: '1',
        rendering: (
            <div>
                <h2>First Step</h2>
                <p>Content of First Step</p>
            </div>
        ),
        onNext: () => console.log('hi, From Step 1'),
        onBack: () => console.log('hi, From Step 1')
    },
    {
        keyName: '2',
        rendering: (
            <div>
                <h2>Second Step</h2>
                <p>Content of Second Step</p>
            </div>
        ),
        onNext: () => console.log('hi, From Step 2'),
        onBack: () => console.log('hi, From Step 2')
    },
    {
        keyName: '3',
        rendering: (
            <div>
                <h2>Third Step</h2>
                <p>Content Of Third Step</p>
            </div>
        ),
        onNext: () => console.log('hi, From Step 3'),
        onBack: () => console.log('hi, From Step 3')
    },
    {
        keyName: '4',
        rendering: (
            <div>
                <h2>Fourth Step</h2>
                <p>Content Of Fourth Step</p>
            </div>
        ),
        onNext: () => console.log('hi, From Step 4'),
        onBack: () => console.log('hi, From Step 4')
    }
];

export const maxAllowedStep : number = config.length;
