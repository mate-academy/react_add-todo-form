import { useState } from 'react';
import './App.scss';
import { GoodList } from './components/GoodList';
import { AddGoodFrom } from './components/AddGoodForm';

export const App: React.FC = () => {
  const [hasForm, setHasForm] = useState(true);
  const toggleForm = () => setHasForm(!hasForm);

  return (
    <div className="App">
      <h1>Goods page</h1>
      <button onClick={toggleForm}>Toggle</button>
      {hasForm && <AddGoodFrom />}
      <GoodList />
    </div>
  );
};
