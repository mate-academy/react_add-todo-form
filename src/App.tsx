import { useState } from 'react';
import './App.scss';
import { Form } from './components/Form/Form';
import { TodoList } from './components/TodoList';
import todos from './api/todos';
import { Todo } from './components/TodoInfo';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [todoList, setTodoList] = useState(todos);

  function createNewTodoId(list: Todo[]) {
    const maxId = Math.max(...list.map((todo) => todo.id));

    return maxId + 1;
  }

  const addTodo = (newTodo: Todo): void => {
    setTodoList(prevTodoList => [
      ...prevTodoList,
      { ...newTodo, id: createNewTodoId(prevTodoList) },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form addTodo={addTodo} />
      <TodoList todos={todoList} />
    </div>
  );
};
