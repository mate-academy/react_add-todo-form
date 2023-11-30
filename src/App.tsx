import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { TodoForm } from './components/PostForm/TodoForm';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

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

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
