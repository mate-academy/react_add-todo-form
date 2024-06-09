import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { AddTodo } from './components/AddTodo';
import { getUserById } from './servises/user';
import { getNewTodoId } from './servises/todo';

export const App = () => {
  const todosList: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(todosList);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
