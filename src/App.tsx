import { useState } from 'react';
import './App.scss';
import { FormItem } from './components/FormItem/FormItem';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import type { InfoRender } from './types/InfoRender';
import type { TodoType } from './types/TodoType';
import type { UsersType } from './types/UsersType';

export const App = () => {
  const [todos, setTodos] = useState<TodoType[]>(todosFromServer);
  const [users] = useState<UsersType[]>(usersFromServer);

  const info: InfoRender[] = todos.map(todo => {
    const user = users.find(u => u.id === todo.userId);

    return {
      id: todo.id,
      title: todo.title,
      email: user?.email || '',
      name: user?.name || '',
    };
  });

  const addPost = (newPost: TodoType) => {
    setTodos(prev => [...prev, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <FormItem addPost={addPost} todos={todos} />
      <TodoList info={info} />
    </div>
  );
};
