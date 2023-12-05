import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getNewId, getTodosWithUsers } from './helpers';
import { AddPostForm } from './components/AddPostForm';
import { Todo } from './types/interfaces';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer);

  const todosWithUsers = getTodosWithUsers(todos, users);

  const addTodo = (
    todoTitle: string,
    userId: number,
    completed: boolean,
  ) => {
    setTodos((currentTodos) => {
      const newTodo: Todo = {
        id: getNewId(currentTodos),
        title: todoTitle,
        completed,
        userId,
      };

      return [
        ...currentTodos,
        newTodo,
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddPostForm
        addTodo={addTodo}
        users={users}
      />

      <TodoList
        todos={todosWithUsers}
      />
    </div>
  );
};
