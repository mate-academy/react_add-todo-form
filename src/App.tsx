import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import { getUserById } from './services/getUserById';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

function getNewTodoId(todos: Todo[]) {
  if (todos.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
