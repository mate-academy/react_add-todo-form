import { useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/getUsers';
import { getNewTodoId } from './services/getNewTodoId';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
