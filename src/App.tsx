import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { NewTodo } from './components/NewTodo';
import { getNewTodoId } from './functions/helper';

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

      <NewTodo onAdd={addTodo} />

      <TodoList todos={todos} />

    </div>
  );
};
