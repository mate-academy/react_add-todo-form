import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

function getUser(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);

  const getNextId = (actualTodos: Todo[]) => {
    return (
      actualTodos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0) + 1
    );
  };

  const handleAddTodo = (title: string, userId: number) => {
    const newTodo = {
      id: getNextId(todos),
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
