import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types/todo';
import { getNewPostId } from './utils/todoUtils';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const onAddTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewPostId(todos),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={onAddTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
