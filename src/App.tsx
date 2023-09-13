import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { getNewTodoId } from './services/todo';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const NewTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, NewTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
