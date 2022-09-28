/* eslint-disable */ 
import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const [userFromForm, setUserFromForm] = useState('Leanne Graham');
  const [allTodos, setAllTodos] = useState(preparedTodos);
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="App">
      <form 
        className='App__form'
        onSubmit={(event) => {
          event.preventDefault();
          const neededUser = users.find(user => user.name === userFromForm) || null;

          if (neededUser === null) {
            return;
          };
  
          const todoToAdd = {
            userId: neededUser.id,
            id: allTodos[allTodos.length - 1].id + 1,
            title: newTask,
            completed: false,
            user: neededUser,
          };

          if (todoToAdd.title) {
            setAllTodos(prev => [...prev, todoToAdd]);
            setIsEmpty(false);
          } else {
            setIsEmpty(true);
          }
        }}
      >
        <input
          type="text"
          placeholder='Title'
          className="form-control"
          value={newTask}
          onChange={event => setNewTask(event.target.value)}
        />

        <select
          name="user"
          value={userFromForm}
          className="form-control"
          onChange={(event) => setUserFromForm(event.target.value)}
        >
          {users.map(user => (
            <option value={user.name} key={user.id}>{user.name}</option>
          ))}

        </select>

        <button
          type="submit"
          className="btn btn-secondary"
        >
          Add
        </button>
      </form>

      {isEmpty && (
        <div className='App__message'>Title is empty. Please, add some task</div>
      )}

      <TodoList todos={allTodos}/>
    </div>
  );
};

export default App;
