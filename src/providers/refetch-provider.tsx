import { createContext, useContext, useState } from 'react';

type RefetchProviderProps = {
  children: React.ReactNode;
};

type RefetchProviderState = {
  refetch: (() => void) | null;
  setRefetch: (refetch: (() => void) | null) => void;
};

const initialState: RefetchProviderState = {
  refetch: null,
  setRefetch: () => null
};

const RefetchContext = createContext<RefetchProviderState>(initialState);

export default function RefetchProvider({ children }: RefetchProviderProps) {
  const [refetch, setRefetch] = useState<(() => void) | null>(() => {});

  const value = {
    refetch,
    setRefetch
  };

  return (
    <RefetchContext.Provider value={value}>{children}</RefetchContext.Provider>
  );
}

export const useRefetch = () => {
  const context = useContext(RefetchContext);

  if (context === undefined) {
    throw new Error('useRefetch must be used within a RefetchProvider');
  }

  return context;
};
