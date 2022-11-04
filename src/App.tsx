import React from 'react';
import logo from './logo.png';
import './App.css';
import { Setting } from './models/interfaces';
import { useSettingContext } from './context/SettingsContext';

interface AppProps {
  heading: string;
}

function App({ heading }: AppProps) {
  const { state, dispatch } = useSettingContext();
  const setting = state as Setting;

  const updateState = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch({ type: 'SET_VOLUME', payload: 20 })
    dispatch({ type: 'SET_CURRENT_SONG', payload: 'AI Music' })
    dispatch({ type: 'SET_ANALYTICS', payload: true })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          {heading}
        </p>
        <span>Volume: {setting && setting.volume}</span>
        <span>Current Song: {setting && setting.currentSong}</span>
        <span>Analytics On: {setting && setting.analyticsOn ? '1' : ''}</span>
        <br />
        <button onClick={updateState}>Update Settings</button>
      </header>
    </div>
  );
}

export default App;
