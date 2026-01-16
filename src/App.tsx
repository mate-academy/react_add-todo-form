import { useState } from 'react';
import './App.scss';

import TodoForm from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

import getTodos from './queries/getTodos';
import getUsers from './queries/getUsers';

import { Todo, TodoWithUser } from './types/Todo';
import User from './types/User';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());

  const users: User[] = getUsers();
  const enrichedTodo: TodoWithUser[] = todos.map(todo => ({
    ...todo,
    user: users.find(user => todo.userId === user.id),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        users={users}
        todos={todos}
        onAddTodo={newTodo => setTodos([...todos, newTodo])}
      />
      <TodoList todos={enrichedTodo} />
    </div>
  );
};
