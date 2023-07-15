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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onNewTodo = (todo: Todo) => {
    setTodos((currentToDos) => ([
      ...currentToDos,
      todo,
    ]));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onSubmit={onNewTodo} todos={[]} />

      <TodoList todos={todos} />
    </div>
  );
};
