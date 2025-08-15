import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { NewTodos } from './components/NewTodos/NewTodos';
import { getUserById } from './services/user';
import { Todo } from './type/Todo';
import { useState } from 'react';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(currentTodos: Todo[]) {
  const maxId = currentTodos.length
    ? Math.max(...currentTodos.map(todo => todo.id))
    : 0;

  return maxId + 1;
}

export const App = () => {
  const [todosState, setTodos] = useState<Todo[]>(todos);

  const addTodo = (newTodoData: Omit<Todo, 'id'>) => {
    setTodos(current => {
      const newTodo: Todo = {
        ...newTodoData,
        id: getNewPostId(current),
      };

      return [...current, newTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodos onSubmit={addTodo} />
      <TodoList todos={todosState} />
    </div>
  );
};
