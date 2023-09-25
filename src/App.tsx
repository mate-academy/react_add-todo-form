import './App.scss';
import { useState } from 'react';

import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/PostForm';
import todosFromServer from './api/todos';
import { getUserById } from './components/servises/user';

export const newTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(data: Todo[]) {
  const maxId = Math.max(...data.map(
    item => item.id,
  ));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(newTodos);

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
