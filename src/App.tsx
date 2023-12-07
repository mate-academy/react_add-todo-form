import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [firstOptionDisabled, setFirstOptionDisabled] = useState(false);
  const [formInputs, setFormInputs] = useState({
    title: '',
    userId: 0,
  });
  const [errorStatuses, setErrorStatuses] = useState({
    title: false,
    user: false,
  });

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formInputs.title) {
      setErrorStatuses(statuses => ({
        ...statuses,
        title: true,
      }));
    }

    if (formInputs.userId <= 0) {
      setErrorStatuses(statuses => ({
        ...statuses,
        user: true,
      }));
    }

    if (formInputs.userId <= 0 || !formInputs.title) {
      return;
    }

    const maxId = todos.reduce((max, todo) => {
      if (todo.id > max) {
        return todo.id;
      }

      return max;
    }, -Infinity);

    setTodos([
      ...todos,
      {
        id: maxId + 1,
        title: formInputs.title,
        completed: false,
        userId: formInputs.userId,
      },
    ]);

    setFormInputs({
      title: '',
      userId: 0,
    });
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/gi, '');

    setFormInputs({
      ...formInputs,
      title: input,
    });
    setErrorStatuses(statuses => ({
      ...statuses,
      title: false,
    }));
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({
      ...formInputs,
      userId: +event.target.value,
    });
    setFirstOptionDisabled(true);
    setErrorStatuses(statuses => ({
      ...statuses,
      user: false,
    }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        handleUserSelect={handleUserSelect}
        handleSubmit={handleSubmit}
        handleTitleInput={handleTitleInput}
        formInputs={formInputs}
        errorStatuses={errorStatuses}
        firstOptionDisabled={firstOptionDisabled}
      />

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
