import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

// import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './shared/lib';
import { TodoForm } from './components/TodoForm/TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map((todo) => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(prevTodos => ([
      ...prevTodos,
      newTodo,
    ]));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
