import './App.scss';
import { GoodList } from './components/GoodList';
import { AddGoodFrom } from './components/AddGoodForm';

export const App: React.FC = () => (
  <div className="App">
    <h1>Goods page</h1>
    <h2>Create a good</h2>
    <AddGoodFrom />
    <GoodList />
  </div>
);
