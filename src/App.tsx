import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

import './App.scss';

import { Todo } from './types/Todo';

export const App = () => {
  const [listTodo, setListTodo] = useState([...todosFromServer]);

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const lastTodoIndex = listTodo.reduce((maxI, curI) => {
      return curI.id > maxI ? curI.id : maxI;
    }, 0);

    setListTodo(currrentList => [...currrentList, {
      ...todo,
      id: lastTodoIndex + 1,
    }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo
        users={usersFromServer}
        onAdd={(todo) => {
          addTodo((todo));
        }}
      />

      <TodoList
        todos={listTodo}
      />
    </div>
  );
};
