import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { getUserById } from './services/getUsers';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todos);

  const setTodos = (newPost: Todo) => {
    setCurrentTodos(handleTodos => [
      ...handleTodos,
      newPost,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form setNewPosts={setTodos} todos={currentTodos} />

      <div className="App">
        <h1 className="App__title">Static list of todos</h1>
        <TodoList todos={currentTodos} />
      </div>
    </div>
  );
};
