import React from "react";

export interface BottomSheetStep{
    keyName: string;
    rendering: React.ReactNode;
    onNext?: () => void | Promise<void>;
    onBack?: () => void | Promise<void>;
}

export interface navigationProps {
    step: number | null;
    forwardStep: () => void;
    backwardStep: () => void;
    setCustomStep: (step: number) => void;
}

export interface BottomSheetProps {
    config: BottomSheetStep[];
    navigation : navigationProps;
}
