import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

const startTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(startTodos);

  function getNewTodoId(currentTodos: Todo[]) {
    const maxId = Math.max(...currentTodos.map(todo => todo.id));

    return maxId + 1;
  }

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
