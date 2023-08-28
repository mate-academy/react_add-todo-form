import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/Todo';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const newTodoId: number = Math.max(
  ...todos.map(todo => todo.id),
) + 1;

export const App = () => {
  const [todo, setTodo] = useState<Todo[]>(todos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: newTodoId,
      ...data,
    };

    setTodo(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todo} />
    </div>
  );
};
