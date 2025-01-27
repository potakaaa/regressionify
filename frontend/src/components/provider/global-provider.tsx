import React, { createContext, useState, ReactNode, useContext } from "react";

export type ToDo = {
  id: number;
  name: string;
  done: boolean;
};

interface GlobalStates {
  independents: string[];
  setIndependents: (independents: string[]) => void;
}

export const GlobalContext = createContext<GlobalStates | undefined>(undefined);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [independents, setIndependents] = useState<string[]>([]);
  return (
    <GlobalContext.Provider value={{ independents, setIndependents }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = (): GlobalStates => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
