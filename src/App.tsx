import './App.scss';
import { useState } from 'react';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { getUserById } from './services/UserById';
import { Todo } from './types/Todo';

const allTodosAndUsers = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState(allTodosAndUsers);

  const getIDs = () => {
    return todos.map(todo => todo.id);
  };

  const handleNewTodo = (newTodo: Todo) => {
    setTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        allUsers={users}
        setTodoList={handleNewTodo}
        maxId={Math.max(...getIDs() || 0)}
      />

      <TodoList allTodos={todos} />
    </div>
  );
};
