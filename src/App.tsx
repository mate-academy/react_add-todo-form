import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './types/PreparedTodo';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const preparedTodos: PreparedTodo[] = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(el => el.id === todo.userId) || null,
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onAdd={(newTodo) => setTodos(prevTodos => [...prevTodos, newTodo])}
      />
      <TodoList todos={preparedTodos} />
    </div>
  );
};
