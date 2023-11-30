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
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId),
  }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formInputs.title) {
      setTitleErrorMessage('Please enter a title');
    }

    if (formInputs.userId <= 0) {
      setUserErrorMessage('Please choose a user');
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
    setTitleErrorMessage('');
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({
      ...formInputs,
      userId: +event.target.value,
    });
    setFirstOptionDisabled(true);
    setUserErrorMessage('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        handleUserSelect={handleUserSelect}
        handleSubmit={handleSubmit}
        handleTitleInput={handleTitleInput}
        formInputs={formInputs}
        titleErrorMessage={titleErrorMessage}
        userErrorMessage={userErrorMessage}
        firstOptionDisabled={firstOptionDisabled}
      />

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
