import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import users from './api/users';
import { Todo } from './types/Todo';

const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

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

      <TodoForm users={users} onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
