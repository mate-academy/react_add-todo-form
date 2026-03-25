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
  const [users] = useState<UsersType[]>(usersFromServer);

  const preparedTodos: TodoType[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(item => item.id === todo.userId);

    return {
      ...todo,
      user: user!,
    };
  });

  const [todos, setTodos] = useState<TodoType[]>(preparedTodos);

  const info: InfoRender[] = todos.map(todo => {
    return {
      id: todo.id,
      title: todo.title,
      email: todo.user.email,
      name: todo.user.name,
      completed: todo.completed,
    };
  });

  const addPost = (newPost: TodoType) => {
    setTodos(prev => [...prev, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <FormItem addPost={addPost} todos={todos} users={users} />
      <TodoList info={info} />
    </div>
  );
};
