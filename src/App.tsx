/* eslint-disable no-console */
import React from 'react';

import './App.scss';
import { GoodList } from './GoodList';
import { GoodProvider } from './GoodConetxt';
import { AddGoodForm } from './AddGoodForm';

export const App: React.FC = () => (
  <>
    <h1>Goods page</h1>

    <GoodProvider>
      <h2>Create a good</h2>
      <AddGoodForm />
      <GoodList />
    </GoodProvider>
  </>
);
