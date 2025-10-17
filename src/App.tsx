import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { createTodoAggregates, TodoAggregate } from './domain/TodoAggregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { useState } from 'react';
import { Todo } from './domain/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleAddTodo = (todoWithoutId: Omit<Todo, 'id'>) => {
    setTodos(currentTodos => {
      const maxId = currentTodos.length
        ? Math.max(...currentTodos.map(t => t.id))
        : 0;

      return [
        ...currentTodos,
        {
          ...todoWithoutId,
          id: maxId + 1,
        },
      ];
    });
  };

  const aggregatedTodos: TodoAggregate[] = createTodoAggregates(
    todos,
    usersFromServer,
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm users={usersFromServer} onSubmit={handleAddTodo} />

      <TodoList todos={aggregatedTodos} />
    </div>
  );
};
