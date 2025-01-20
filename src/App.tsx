import './App.scss';

import React, { useState } from 'react';
import todosFromServer from './api/todos';
import { ToDoForm } from './components/ToDoForm';
import { TodoList } from './components/TodoList';
import { ToDo } from './types/Todo';
import { getUserById } from './services/user';

export const initialToDos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(posts: ToDo[]) {
  if (!posts.length) {
    return 0;
  }

  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>(initialToDos);

  const addToDo = (todo: ToDo) => {
    const newToDo: ToDo = {
      ...todo,
      id: getNewPostId(todos),
    };

    setTodos(currentPosts => [...currentPosts, newToDo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <ToDoForm onSubmit={addToDo} />
      <TodoList todos={todos} />
    </div>
  );
};
