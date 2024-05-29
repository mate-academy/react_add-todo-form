import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import { FormField } from './components/FormField';
import { getUserById } from './services';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = (newTodo: Todo): void => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <FormField onAdd={addTodo} />
      <TodoList todos={todosWithUsers} />
    </div>
  );
};
