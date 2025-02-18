import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoForm } from './components/todoForm';
import { Todo } from './types/todo';

export const App = () => {
  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId);
  }

  const todosList = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId) || null,
  }));

  const [todos, setTodos] = useState(todosList);

  const handleList = (newTodo: Todo) => {
    setTodos(preTodos => [...preTodos, newTodo]);
  };

  return (
    <div className="App">
      <TodoForm toAdd={handleList} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};
