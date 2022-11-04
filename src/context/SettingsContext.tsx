import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface SettingState<T> {
  volume?: T;
  currentSong?: T;
  analyticsOn?: T;
}

// type SettingState = typeof initialState;
type Action<T> = {
  type: "SET_VOLUME" | "SET_CURRENT_SONG" | "SET_ANALYTICS";
  payload: T;
};

interface SettingProviderProps {
  children: React.ReactNode;
}

const initialState = {};

function reducer<T>(state: SettingState<T>, action: Action<T>): SettingState<T> {
  const { type, payload } = action;
  switch (type) {
    case "SET_VOLUME":
      return {
        ...state,
        volume: payload,
      };
    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSong: payload,
      };
    case "SET_ANALYTICS":
      return {
        ...state,
        analyticsOn: payload,
      };
    default:
      return state;
  }
}

const SettingsContext = createContext<{
  state: SettingState<unknown>;
  dispatch: React.Dispatch<Action<unknown>>;
}>({ state: {}, dispatch: () => {}});

const SettingsProvider = ({ children }: SettingProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const [localStorage, setLocalStorage] = useLocalStorage<string>("setting", JSON.stringify(state));

  useEffect(() => {
    setLocalStorage(JSON.stringify(state))
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettingContext must be used within a SettingsProvider");
  }
  return context;
};

export { SettingsContext, SettingsProvider, useSettingContext };
