import './App.scss';
import { useState } from 'react';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todos';
import { User } from './types/Users';

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);

  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos(prevState => [...prevState, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form users={users} addTodo={handleAddTodo} />
      <TodoList todos={todos} users={users} />
    </div>
  );
};
