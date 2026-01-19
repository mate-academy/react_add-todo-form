import './App.scss';
import { Form } from './components/Form';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

type TodosInitial = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
const prepareTodos = (todos: TodosInitial[], users: User[]): Todo[] => {
  return todos.map(todo => {
    const user = users.find(userInfo => todo.userId === userInfo.id);

    return { ...todo, user };
  });
};

const todos = prepareTodos(todosFromServer, usersFromServer);

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const maxIdTodo =
    todoList.length !== 0 ? Math.max(...todoList.map(todo => todo.id)) : 0;

  const addTodo = (todoForUser: Todo) =>
    setTodoList(prevTodo => [...prevTodo, { ...todoForUser }]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form
        usersForSelect={usersFromServer}
        addTodo={addTodo}
        todoId={maxIdTodo}
      />

      <TodoList todos={todoList} />
    </div>
  );
};
