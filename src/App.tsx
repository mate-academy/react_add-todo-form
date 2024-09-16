import './App.scss';
import { useState } from 'react';
import { getUserById } from './services/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';
import { TodoForm } from './components/TodoForm';

const getNewTodoId = (posts: Todo[]) => {
  return Math.max(...posts.map(post => post.id)) + 1;
};

const ititialTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(ititialTodos);

  const addTodo = (newTodo: Todo) => {
    const id = getNewTodoId(todos);

    setTodos(currentTodos => [...currentTodos, { ...newTodo, id }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
