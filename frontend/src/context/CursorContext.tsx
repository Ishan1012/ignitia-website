'use client';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface CursorContextType {
    hovered: boolean;
    disabled: boolean;
    setHovered: Dispatch<SetStateAction<boolean>>;
    setDisabled: Dispatch<SetStateAction<boolean>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const value = {
        hovered,
        disabled,
        setHovered,
        setDisabled,
    }

    return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export const useCursor = (): CursorContextType => {
    const context = useContext(CursorContext);

    if (context === undefined) {
        throw new Error("⚠️ useCursor() called outside of <CursorProvider>.");
    } else {
        return context;
    }
}