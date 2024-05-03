import './App.scss';
import { TodoComplete } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { useState } from 'react';

const initialTodos: TodoComplete[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoComplete[]>(initialTodos);

  const getLastTodoId = () => {
    return [...todos].sort((a, b) => b.id - a.id)[0].id + 1;
  };
  const addTodo = (newTodo: TodoComplete) => {
    newTodo.id = getLastTodoId();
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
