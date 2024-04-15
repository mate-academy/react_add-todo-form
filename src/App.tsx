import './App.scss';
import React, { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './components/services/types';
import { getUserById } from './components/services/getUser';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getTodoNewId = (todos: Todo[]): number => {
  const newTodoId = Math.max(...todos.map(todo => todo.id));

  return newTodoId + 1;
};

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getTodoNewId(allTodos),
      ...data,
    };

    setAllTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={allTodos} />
    </div>
  );
};
