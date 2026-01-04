import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodoItem } from './types/TodoItem';

const titleReplaceRegex = /[^A-ZА-ЩЬЮЯҐЄІЇ\d\s]/gim;

const todosWithUsers: TodoItem[] = todosFromServer.map(todo => {
  const user =
    usersFromServer.find(userItem => userItem.id === todo.userId) || null;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>(todosWithUsers);

  const handleAddTodo = (newTodo: TodoItem) => {
    setTodos(prevTodos => {
      const maxId = Math.max(0, ...prevTodos.map(todo => todo.id));

      const newTodoWithId = {
        ...newTodo,
        id: maxId + 1,
      };

      return [...prevTodos, newTodoWithId];
    });
  };

  return (
    <div className="App block section">
      <h1 className="title">Add todo form</h1>

      <NewTodo
        users={usersFromServer}
        onAdd={handleAddTodo}
        titleReplaceRegex={titleReplaceRegex}
      />

      <TodoList todos={todos} />
    </div>
  );
};
