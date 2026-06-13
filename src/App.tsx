import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces/Todo';
import { User } from './interfaces/User';

export const App = () => {
  const enrichTodos = (todos: Omit<Todo, 'user'>[]): Todo[] => {
    return todos.map(todoItem => ({
      ...todoItem,
      user: usersFromServer.find(
        userItem => userItem.id === todoItem.userId,
      ) as User,
    }));
  };

  const [todos, setTodos] = useState<Todo[]>(
    enrichTodos(todosFromServer as Omit<Todo, 'user'>[]),
  );

  const getNewId = (): number => {
    return Math.max(...todos.map(todoItem => todoItem.id)) + 1;
  };

  const handleAdd = ({ title, userId }: { title: string; userId: number }) => {
    const newTodo: Todo = {
      id: getNewId(),
      title,
      userId,
      completed: false,
      user: usersFromServer.find(userItem => userItem.id === userId) as User,
    };

    setTodos(previousTodos => [...previousTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={handleAdd} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
