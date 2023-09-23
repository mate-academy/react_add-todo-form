import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { PostForm } from './components/PostForm';
import { getUserById } from './services/userById';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodos = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onSubmit={addTodos} />

      <TodoList todos={todos} />
    </div>
  );
};
