import './App.scss';

import { useState } from 'react';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getNewTodoId } from './services';

import todosFromServer from './api/todos';

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todosFromServer);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todoList),
    };

    setTodoList(currentList => [...currentList, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form
        onAdd={addTodo}
      />

      <TodoList todos={todoList} />
    </div>
  );
};
