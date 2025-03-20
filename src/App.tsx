import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { ToDo } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

const initialTodoList: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(todos: ToDo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(initialTodoList);

  const addToDo = ({ id, ...data }: ToDo) => {
    const newPost = {
      id: id || getNewPostId(todos),
      ...data,
    };

    setTodos(currentToDos => [...currentToDos, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        onSubmit={addToDo}
        users={usersFromServer}
        getUserById={getUserById}
        newId={getNewPostId(todos)}
      />
      <TodoList todos={todos} />
    </div>
  );
};
