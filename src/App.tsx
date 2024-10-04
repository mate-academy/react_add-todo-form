import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/types';
import { getMaxId } from './utils/getMaxId';
import './App.scss';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm
        users={usersFromServer}
        nextId={getMaxId(todos) + 1}
        onAddTodo={handleAddTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
