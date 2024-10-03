import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './utils/getUserById';
import { getNewTodoId } from './utils/getNewTodoId';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAdd = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={onAdd} />
      <TodoList todos={todos} />
    </div>
  );
};
