import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { Todo } from './types/todo';
import { PostForm } from './components/TodoForm/TodoForm';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

const todosToRender:Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosToRender);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const getIdOnTodo = () => {
    if (todos.length === 0) {
      return 1;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm
        onSubmit={addTodo}
        todoId={getIdOnTodo()}
        users={usersFromServer}
      />

      <TodoList todos={todos} />

    </div>
  );
};
