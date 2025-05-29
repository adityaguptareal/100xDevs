import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type SidebarContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextType>({
    open: false,
    setOpen: () => {},
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};