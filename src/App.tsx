import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser, Todo } from './types';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/user';

export const listTodos: TodoWithUser[] = todosFromServer.map((todo: Todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: TodoWithUser[]): number {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(listTodos);

  const addTodo = ({ id, ...data }: TodoWithUser) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
