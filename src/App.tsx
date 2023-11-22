import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [personValue, setPersonValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle((e.target as HTMLInputElement).value);
  };

  const handlePersonChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPersonValue((e.target as HTMLSelectElement).value);
  };

  const postWithUser
    = todos.map((todo) => {
      const foundUser = usersFromServer
        .find((user) => user.id === todo.userId);

      return { todo, foundUser };
    });

  const addPost = () => {
    const foundUser = usersFromServer.find((user) => user.name === personValue);

    if (!foundUser) {
      return;
    }

    const newTodo = {
      title,
      userId: foundUser.id,
      personValue,
    };

    setTodos((prevTodos: any) => [...prevTodos, newTodo]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addPost();
    setTitle('');
    setPersonValue('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        handleSubmit={handleSubmit}
        handlePersonChange={handlePersonChange}
        handleTitleChange={handleTitleChange}
        title={title}
        personValue={personValue}
      />
      <TodoList
        postWithUser={postWithUser}
      />
    </div>
  );
};
