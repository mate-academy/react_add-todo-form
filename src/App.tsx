import './App.scss';
import { useState } from 'react';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState(todosFromServer);

  const usersAndTodos = todos.map(todo => {
    return {
      ...todo,
      User: { ...users.find(user => user.id === todo.userId) },
    };
  });

  const getIDs = () => {
    return todos.map(todo => todo.id);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        allUsers={users}
        setTodoList={(todo: Todo) => setTodos([...todos, todo])}
        maxId={Math.max(...getIDs())}
      />
      <TodoList allTodos={usersAndTodos} />
    </div>
  );
};
