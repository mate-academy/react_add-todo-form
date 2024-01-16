import './App.scss';
import { GoodsList } from './components/GoodsList/GoosList';
import { GoodForm } from './components/GoodForm';
import { GoodsProvider } from './components/GoodsProvider';

export const App = () => (
  <div className="App">
    <h2>Create a good</h2>

    <GoodsProvider>
      <GoodForm />

      <GoodsList />
    </GoodsProvider>
  </div>
);
