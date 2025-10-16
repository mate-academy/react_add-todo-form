import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoAggregate } from './types/TodoAggregate';
import { AddTodoForm } from './components/AddTodoForm';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)!;
}

export const App = () => {
  const [todoList, setTodoList] = useState(todosFromServer);

  const handleAddTodo = (todo: Omit<Todo, 'id'>) => {
    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    setTodoList(currentTodos => [
      ...currentTodos,
      {
        id: maxId + 1,
        ...todo,
      },
    ]);
  };

  const todos: TodoAggregate[] = todoList.map(todo => {
    const todoAggregate: TodoAggregate = {
      ...todo,
      user: getUserById(todo.userId),
    };

    return todoAggregate;
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onSubmit={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
