import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/todo';
import { getUserById } from './services/user';

export const App = () => {
  const todosInclUser = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todoItems, setTodoItems] = useState<Todo[]>(todosInclUser);

  function getMaxTodoId(todos: Todo[]) {
    const maxId = Math.max(
      ...todos.map(todo => todo.id),
    );

    return maxId + 1;
  }

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getMaxTodoId(todoItems),
      ...data,
    };

    setTodoItems(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todoItems} />
    </div>
  );
};
