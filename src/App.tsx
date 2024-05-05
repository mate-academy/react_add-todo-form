import { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const addTodo = (todo: Todo) => {
    const id = Math.max(...todos.map(obj => obj.id)) + 1;
    const newTodo = { ...todo, id };
    setTodos(prev => [...prev, newTodo]);
  };

  const newTodosWithUsers = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={newTodosWithUsers} />
    </div>
  );
};
