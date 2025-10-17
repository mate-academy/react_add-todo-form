import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoAggregate } from './components/domain/TodoAggregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { useState } from 'react';
import { Todo } from './components/domain/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    setTodos(currentTodos => {
      const maxId = currentTodos.length
        ? Math.max(...currentTodos.map(t => t.id))
        : 0;

      return [
        ...currentTodos,
        {
          ...newTodo,
          id: maxId + 1,
        },
      ];
    });
  };

  const aggregateTodos = todos.map(todo => {
    const user = usersFromServer.find(({ id }) => id === todo.userId) ?? null;

    const todoAggregate: TodoAggregate = {
      ...todo,
      user,
    };

    return todoAggregate;
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={aggregateTodos} />
    </div>
  );
};
