import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { createTodoAggregate, TodoAggregate } from './types/TodoAggregate';
import { AddTodoForm } from './components/AddTodoForm';
import { Todo } from './types/Todo';

export const App = () => {
  const [todoList, setTodoList] = useState(todosFromServer);

  const todos: TodoAggregate[] = createTodoAggregate(todoList, usersFromServer);

  const handleAddTodo = (todo: Omit<Todo, 'id'>) => {
    const maxId = todos.length ? Math.max(...todos.map(item => item.id)) : 0;

    setTodoList(currentTodos => [
      ...currentTodos,
      {
        id: maxId + 1,
        ...todo,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm users={usersFromServer} onSubmit={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
