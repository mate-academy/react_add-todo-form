import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './components/types/todo';
import usersFromServer from './api/users';
import { getNewTodoId } from './components/services/newTodoId';

const initialTodos: Todo[] = usersFromServer.map(todo => ({
  id: todo.id,
  title: todo.name,
  userId: todo.id,
  completed: false,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      ...data,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
