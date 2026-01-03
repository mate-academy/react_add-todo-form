import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodoForm';
import { Todo } from './types/todo';
import { NewTodo } from './types/newTodo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      user,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const maxId = Math.max(...todos.map(todo => todo.id));
  const addTodo = (newTodo: NewTodo) => {
    const user = usersFromServer.find(u => u.id === newTodo.userId);

    if (!user) {
      return;
    }

    const todo: Todo = {
      id: maxId + 1,
      title: newTodo.title,
      user,
      completed: false,
    };

    setTodos(current => [...current, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodoForm users={usersFromServer} onSubmit={addTodo} />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
