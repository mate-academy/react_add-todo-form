import { useState } from 'react';
import './App.scss';
import { Render } from './rendering/Render';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';

const todos = todosFromServer.map(el => {
  return {
    ...el,
    user: getUserById(el.userId),
  };
});

export const App = () => {
  const [list, setList] = useState<Todo[]>(todos);

  const addList = (newList: Todo) => {
    setList((currentList) => [...currentList, newList]);
  };

  return (
    <div>
      <div className="App">
        <h1>Add todo form</h1>
        <Render
          todoList={list}
          onSubmit={addList}
        />

        <TodoList todos={list} />
      </div>
    </div>
  );
};
