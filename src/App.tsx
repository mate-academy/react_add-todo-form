import './App.scss';
import { ToDoForm } from './components/AddNewToDoForm/AddNewToDoForm';
import { TodoList } from './components/TodoList';
import { getAggregateTodos } from './domain/TodoAggreaged';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './domain/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const aggregatedTodos = getAggregateTodos(todos, usersFromServer);

  const handleAddTodo = (todoWithoutId: Omit<Todo, 'id'>) => {
    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    setTodos(currentTodos => [
      ...currentTodos,
      {
        ...todoWithoutId,
        id: maxId + 1,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <ToDoForm users={usersFromServer} onSubmit={handleAddTodo} />
      <TodoList todos={aggregatedTodos} />
    </div>
  );
};
