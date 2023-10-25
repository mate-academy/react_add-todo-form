import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import { Todo } from './types/types';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

export const App = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todosFromServer);

  const addTodo = (newTodo: Todo) => {
    setNewTodos([...newTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={addTodo} />

      <section className="TodoList">
        <TodoList todos={newTodos} />
      </section>
    </div>
  );
};
