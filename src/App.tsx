import './App.scss';
import * as React from 'react';

import { TodoForm } from './components/TodoForm';
import todosFromServer from './api/todos';
import { Todo } from './types';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/getUser';

const initionsTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = React.useState<Todo[]>(initionsTodos);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        onAdd={todo => handleAddTodo(todo)}
        maxId={Math.max(...todos.map(todo => todo.id))}
      />
      <TodoList todos={todos} />
    </div>
  );
};
