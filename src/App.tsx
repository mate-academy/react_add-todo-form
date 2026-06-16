import React from 'react';
import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/todo';
import { User } from './types/user';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const preparedTodo: Todo[] = todosFromServer.map(todo => {
    const currUser = usersFromServer.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: currUser!, // assert non-null because each todo.userId is expected to match a user
    };
  });

  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(preparedTodo);

  //function for retrieving data to be added Todo
  const addTodo = ({ title, userId }: { title: string; userId: number }) => {
    const maxTodoId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const nextTodoId = maxTodoId + 1;

    const currUser = users.find(user => user.id === userId);

    const newTodo: Todo = {
      id: nextTodoId,
      title,
      userId,
      completed: false,
      user: currUser!,
    };

    setTodos(prevTodo => [...prevTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo users={users} onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
