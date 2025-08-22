import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { NewTodo } from './components/NewTodo/NewTodo';

type NewTodoData = {
  title: string;
  userId: number;
};

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todosFromServer);

  const addTodo = ({ title, userId }: NewTodoData) => {
    setTodoList(currentTodos => {
      const nextId = Math.max(0, ...currentTodos.map(todo => todo.id)) + 1;

      const user = usersFromServer.find(u => u.id === userId);

      const newTodo: Todo = {
        id: nextId,
        title,
        completed: false,
        userId,
        user,
      };

      return [...currentTodos, newTodo];
    });
  };

  return (
    <>
      <h1>Add todo form</h1>
      <div className="App">
        <NewTodo onAdd={addTodo} users={usersFromServer} />
        <TodoList todos={todoList} />
      </div>
    </>
  );
};
