import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const onAdd = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo
        users={usersFromServer}
        onSubmit={onAdd}
      />

      <TodoList todos={todos} />
    </div>
  );
};
