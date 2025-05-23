import React, { createContext, useState } from "react";

interface Content {
    _id: string;
    type: string;
    link: string;
    title: string;
}

interface DashboardContextType {
    content: Content[];
    setContent: React.Dispatch<React.SetStateAction<Content[]>>;
}

export const DashboardContext = createContext<DashboardContextType>({
    content: [],
    setContent: () => {}
});

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState<Content[]>([]);
    
    return (
        <DashboardContext.Provider value={{ content, setContent }}>
            {children}
        </DashboardContext.Provider>
    );
};
