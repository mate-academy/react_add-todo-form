import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './intefaces/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm
        todos={todos}
        users={usersFromServer}
        onAddTodo={handleAddTodo}
      />

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
