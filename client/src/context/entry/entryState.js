import React, { useReducer, createContext, useContext } from 'react';
import entryReducer from './entryReducer';

const initialState = {
  entries: [],
  editValues: null,
  notification: null,
  isLoading: false,
};

const EntryContext = createContext();

export const EntryStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entryReducer, initialState);

  return (
    <EntryContext.Provider value={[state, dispatch]}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntryContext = () => useContext(EntryContext);
