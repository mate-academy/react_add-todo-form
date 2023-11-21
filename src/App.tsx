import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [personValue, setPersonValue] = useState('');
  const [title, setTitle] = useState('');

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePersonChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPersonValue(e.target.value);
  };

  const postWithUser = todos.map((todo) => {
    const foundUser = usersFromServer
      .find((user) => user.id === todo.userId);

    return { todo, foundUser };
  });

  const addPost = () => {
    const foundUser = usersFromServer.find((user) => user.name === personValue);

    const newTodo = {
      id: todos.length + 1,
      userId: foundUser.id,
      title,
      personValue,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleSubmit = (e) => {
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
