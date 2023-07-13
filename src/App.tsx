import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import { Todo } from './Types/Todo';

import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onNewTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      completed: true,
      id: getNewTodoId(todos),
    };

    setTodos((currentToDos) => ([
      ...currentToDos,
      newTodo,
    ]));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onSubmit={onNewTodo} />

      <TodoList todos={todos} />

    </div>
  );
};
