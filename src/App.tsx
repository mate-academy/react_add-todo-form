import React from 'react';
import './App.css';

import users from './api/users';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
};

export default App;
