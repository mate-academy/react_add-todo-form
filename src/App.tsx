import React, { useEffect, useState } from 'react';
import { AddIcon } from './components/AddIcon';
import { preapareTodos } from './api/data';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { AllTodo, Todo } from './types';
import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<AllTodo[]>([]);
  const [todoText, setTodoText] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTodo(preapareTodos);
  }, []);

  const selectUser = users.find(user => selectedUser === user.name);

  const maxId: number = Math.max(...todo.map(el => el.id));

  const newTodo = {
    completed: false,
    title: todoText,
    userId: selectUser?.id,
    user: selectUser,
    id: maxId + 1,
  };

  const addTodo = (addedTodo: Todo) => (
    setTodo((prev) => ([
      ...prev,
      addedTodo,
    ]))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);

    if (!todoText) {
      setError('');
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);

    if (!selectedUser) {
      setError('');
    }
  };

  const onFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!newTodo.title) {
      setError('Please enter the title.');

      return;
    }

    if (!selectedUser) {
      setError('Please choose a user');

      return;
    }

    addTodo(newTodo);

    setTodoText('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <div>
        <h1 className="FormTitle">Add todo</h1>

        <form
          className="Form"
          onSubmit={onFormSubmit}
        >

          <input
            placeholder="Todo"
            type="text"
            value={todoText}
            onChange={(e) => handleInputChange(e)}
          />

          {error && <p className="Error">{error}</p>}

          <select
            value={selectedUser}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <div className="AddBtn">
            <button
              className="AddIconBtn"
              type="button"
              onClick={onFormSubmit}
            >
              Add todo
            </button>
            <AddIcon />
          </div>
        </form>

      </div>
      <TodoList todos={todo} />
    </div>
  );
};

export default App;
