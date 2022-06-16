import React, { useState } from 'react';

import './App.css';
import { GoodsForm } from './components/GoodsForm';
import { MainContent } from './components/MainContent';

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header>
        <h1>Form</h1>

        <button
          type="button"
          onClick={() => {
            setCounter((prevCounter) => prevCounter + 1);
          }}
        >
          {counter}
        </button>
      </header>

      <MainContent />

      <aside>
        <GoodsForm />
      </aside>

      <footer>Footer</footer>
    </div>
  );
};

export default App;
