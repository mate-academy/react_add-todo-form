import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoList, User } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { useState } from 'react';

export const App = () => {
  const preparedTodos = todosFromServer.map(todo => {
    const foundAuthor = usersFromServer.find(
      user => user.id === todo.userId,
    ) as User;

    return {
      ...todo,
      user: foundAuthor,
    };
  });
  const [todos, setTodos] = useState(preparedTodos);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const ids = todos.map(todo => todo.id);
    const newId = ids.length === 0 ? 1 : Math.max(...ids) + 1;
    const finalTodo = {
      ...newTodo,
      id: newId,
    };

    setTodos([...todos, finalTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm users={usersFromServer} onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
