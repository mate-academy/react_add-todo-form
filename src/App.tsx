import './App.scss';
import { useState } from 'react';
import { Form } from './components/Form';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
// import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './servises/user';

export const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewToDoId(todo: Todo[]) {
  const maxID = Math.max(...todo.map((todoitem) => todoitem.id));

  return maxID + 1;
}

export const App: React.FC = () => {
  const [toDos, setToDos] = useState(todos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewToDoId(toDos),
      ...data,
    };

    setToDos((curentTodos) => [...curentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={addTodo} />
      <TodoList todos={toDos} />
    </div>
  );
};
