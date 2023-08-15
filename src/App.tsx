import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './services/user';
import { TodoWithUser } from './types/TodoWithUser';
import { Todo } from './types/Todo';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  const addTodo = ({ id, ...data }: TodoWithUser) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [newTodo, ...currentTodos]);
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
