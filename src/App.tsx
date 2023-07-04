import { FC, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoWithUser } from './types/TodoWithUser';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getUserById } from './getUserById';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

const getPreparedTodos = (todos: Todo[], users: User[]) => {
  return todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId, users),
  }));
};

export const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(
    getPreparedTodos(todosFromServer, usersFromServer),
  );

  const getNewTodoId = () => {
    const maxTodoId = Math.max(...todos.map(todo => todo.id));

    return maxTodoId + 1;
  }

  const addNewTodo = (newTodo: TodoWithUser) => {
    setTodos(prevTodos => [...prevTodos, {
      ...newTodo,
      id: getNewTodoId(),
    }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        onAddTodo={addNewTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
