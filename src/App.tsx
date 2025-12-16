import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoInfo } from './components/TodoInfo';

function preparedTodos(todos: Todo[], users: typeof usersFromServer): Todo[] {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    preparedTodos(todosFromServer, usersFromServer),
  );

  const addNewTodo = (title: string, userId: number) => {
    const user = usersFromServer.find(ourUser => ourUser.id === userId);

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title,
      userId: userId,
      completed: false,
      user: user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoInfo addTodo={addNewTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
