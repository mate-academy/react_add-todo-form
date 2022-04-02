import React from 'react';
import { MdAdd } from 'react-icons/md';
import users from './api/users';
// import todosFromServer from './api/todos';
import './App.css';
// import { TodoList } from './TodoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="FormTitle">Add todo</h1>

      <form className="Form">
        <div className="FormInput">
          <input placeholder="Todo" type="text" name="" />
          <MdAdd />
        </div>
        <select name="">
          {users.map(user => (
            <option key={user.id} value="">{user.name}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default App;
