import './App.scss';
import { useState } from 'react';

import { User } from './types/User';
import { ToDo } from './types/ToDo';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId)
      || null;
}

const todos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const findMaxTodoId = (curTodos: ToDo[]) => {
  return curTodos.reduce((prevTodo, currentTodo) => {
    return prevTodo.id > currentTodo.id ? prevTodo : currentTodo;
  }, curTodos[0]);
};

export const App = () => {
  const [newTodos, setNewTodos] = useState(todos);
  const [userToChoose, setUserToChoose] = useState(0);
  const [hasEmptyUserField, setHasEmptyUserField] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [hasEmptyTitleField, setHasEmptyTitleField] = useState(false);

  const onAddTodo = (todo: ToDo) => {
    setNewTodos(prevTodos => [...prevTodos, todo]);
  };

  const resetForm = () => {
    setTodoTitle('');
    setUserToChoose(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cleanedValue = value
      .replace(/[^a-zA-Z0-9а-щА-ЩЬьЮюЯяЇїІіЄєҐґ\s ]/g, '')
      .trimStart();

    setHasEmptyTitleField(false);
    setTodoTitle(cleanedValue);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasEmptyUserField(false);
    setUserToChoose(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todoTitle.trim()) {
      setHasEmptyTitleField(true);
    }

    if (userToChoose === 0) {
      setHasEmptyUserField(true);
    }

    if (!todoTitle.trim() || userToChoose === 0) {
      return;
    }

    onAddTodo({
      id: findMaxTodoId(newTodos).id + 1,
      title: todoTitle,
      completed: false,
      userId: userToChoose,
      user: getUserById(userToChoose),
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={handleTitleChange}
          />
          {hasEmptyTitleField && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userToChoose}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user: User) => {
              const { id, name } = user;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {hasEmptyUserField && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
