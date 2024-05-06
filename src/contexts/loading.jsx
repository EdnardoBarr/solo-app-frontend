import { createContext, useContext, useState } from 'react';
const DELAY = 10000;

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: null,
});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const setIsLoadingWithTimeout = (value) => {
    setTimeout(() => {
      setIsLoading(value);
    }, DELAY);
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading: setIsLoadingWithTimeout }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  return context;
}
