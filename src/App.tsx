import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoAddForm } from './components/TodoAddForm';

function findMaxId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id));
}

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todosFromServer);

  const addTodo = (todo: Todo) => {
    setCurrentTodos(currentTasks => [...currentTasks, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoAddForm onAdd={addTodo} currentLength={findMaxId(currentTodos)} />

      <TodoList todos={currentTodos} />
    </div>
  );
};
