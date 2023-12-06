import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './components/types/Todo';
import { getUserById } from './components/utils/getUserById';
import { ToDoForm } from './components/TodoForm/TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const getTodoId = () => {
    if (todos.length === 0) {
      return 1;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <ToDoForm
        onSubmit={addTodo}
        users={usersFromServer}
        todoId={getTodoId()}
      />

      <TodoList todos={todos} />
    </div>
  );
};
