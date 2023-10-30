import './App.scss';
import { GoodsList } from './components/GoodsList/GoosList';
import { GoodForm } from './components/GoodForm';
import { GoodsProvider } from './components/GoodsProvider';

export const App = () => {
  return (
    <div className="App">
      <h1>Goods page</h1>

      <h2>Create a good</h2>

      <GoodsProvider>
        <GoodForm />

        <GoodsList />
      </GoodsProvider>
    </div>
  );
};
