import './App.css';
import React from 'react';
import users from './api/users';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        {`Users: ${users.length}`}
      </p>
    </div>
  );
};
