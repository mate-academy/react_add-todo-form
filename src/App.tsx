import './App.scss';
import { GoodList } from './components/GoodList';
import { AddGoodFrom } from './components/AddGoodForm';
import { GoodProvider } from './GoodContext';

export const App: React.FC = () => (
  <div className="App">
    <h1>Goods page</h1>

    <GoodProvider>
      <h2>Create a good</h2>
      <AddGoodFrom />
      <GoodList />
    </GoodProvider>
  </div>
);
