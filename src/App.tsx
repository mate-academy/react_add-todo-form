import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './react-app-env';
import { getTodoId, getUserById } from './helpers';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import './App.scss';

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);

  const addNewTodo = (todoTitle: string, todoUserId: number) => {
    const newTodo: TodoWithUser = {
      id: getTodoId(todos),
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId, usersFromServer),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addNewTodo={addNewTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
