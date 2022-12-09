import React from 'react';
import './App.scss';
import { AuthProvider } from './components/Auth/AuthContext';
import { Todos } from './components/Todos';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AuthProvider>
        <Todos />
      </AuthProvider>
    </div>
  );
};
