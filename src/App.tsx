import React, { useEffect, useState } from 'react';
import { AddIcon } from './components/AddIcon';
import { preapareTodos } from './api/data';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { AllTodo } from './types';
import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<AllTodo[]>([]);
  const [todoText, setTodoText] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [hasTextError, setHasTextError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  useEffect(() => {
    setTodo(preapareTodos);
  }, []);

  const addTodo = () => {
    const selectUser = users.find(user => selectedUser === user.name);

    setTodo((prev) => {
      const newTodo = {
        completed: false,
        title: todoText,
        userId: selectUser?.id,
        user: selectUser,
        id: Math.max(...prev.map(el => el.id)) + 1,
      };

      return [
        ...prev,
        newTodo,
      ];
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
    setHasTextError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
    setHasUserError(false);
  };

  const resetForm = () => {
    setTodoText('');
    setSelectedUser('');
  };

  const onFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setHasTextError(!todoText);
    setHasUserError(!selectedUser);

    if (!todoText || !selectedUser) {
      return;
    }

    addTodo();
    resetForm();
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
            onChange={handleTextChange}
          />
          {hasTextError && <p className="Error">Please enter the title.</p>}

          <select
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserError && <p className="Error">Please choose a user</p>}
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
