import { useState } from 'react';
import './App.scss';
import { getNewTodoId, getTodos } from './services/todo';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(getTodos());

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
