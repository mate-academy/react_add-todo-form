import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { NewTodo } from './components/NewTodo/NewTodo';
import { Todo, TodoDraft } from './types/Todo';
import { useState } from 'react';
import { User } from './types/User';

const getUserById = (id: number): User | undefined =>
  usersFromServer.find(user => user.id === id);

function getTodos() {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const users: User[] = usersFromServer;

  const getTodoNextId = (): number =>
    todos.reduce(
      (max, current: Todo) => (!max || max < current.id ? current.id : max),
      0,
    ) + 1;

  const addTodo = (todoDraft: TodoDraft) => {
    const todo: Todo = {
      ...todoDraft,
      id: getTodoNextId(),
      user: getUserById(todoDraft.userId),
    };

    setTodos(current => [...current, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onSubmit={addTodo} users={users} />

      <TodoList todos={todos} />
    </div>
  );
};
