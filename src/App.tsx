import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { ToDoAggregate } from './domain/ToDoAggregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { Todo } from './domain/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleAddTodo = (todoWithoutID: Omit<Todo, 'id'>) => {
    setTodos(currentTodos => {
      const maxId =
        currentTodos.length > 0
          ? Math.max(...currentTodos.map(todo => todo.id))
          : 0;

      const newId = maxId + 1;

      return [
        ...currentTodos,
        {
          ...todoWithoutID,
          id: newId, // Используем вычисленный newId
        },
      ];
    });
  };

  const aggregatedTodos = todos.map(todo => {
    const user = usersFromServer.find(({ id }) => id === todo.userId) ?? null;

    const toDoAggrigate: ToDoAggregate = {
      ...todo,
      user,
    };

    return toDoAggrigate;
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={handleAddTodo} users={usersFromServer} />

      <TodoList todos={aggregatedTodos} />
    </div>
  );
};
