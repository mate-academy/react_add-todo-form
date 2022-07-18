import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './components/types/Todo';
import TodoList from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => (user.id === todo.userId)) || null,
}));

const App: React.FC = () => {
  const [innerTodos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [chosenOne, setChosenOne] = useState('');
  const [isTitle, setIstitle] = useState(true);
  const [isUserName, setIsUserName] = useState(true);

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^\w\d\s\u0430-\u044f]+/, ''));
    setIstitle(true);
  };

  const addUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenOne((event.target.value));
    setIsUserName(true);
  };

  const submitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setIstitle(false);
    }

    if (!chosenOne) {
      setIsUserName(false);
    }

    if (title && chosenOne) {
      const newUser = users.find(user => user.name === chosenOne) || null;
      const newTodo = {
        id: innerTodos[innerTodos.length - 1].id + 1,
        title: title.trim(),
        userId: newUser?.id || null,
        completed: false,
        user: newUser,
      };

      setTodos([...innerTodos, newTodo]);
      setTitle('');
      setChosenOne('');
    }
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <h1 className="App__title">Add todo form</h1>
          <form className="form" onSubmit={submitTodo}>
            <div className="form__fields">
              <div className="form__container">
                <input
                  className="form__field"
                  type="text"
                  data-cy="titleInput"
                  placeholder="Title"
                  value={title}
                  onChange={addTitle}
                />
                {!isTitle && (
                  <span className="warning">
                    Please enter the title
                  </span>
                )}
              </div>
              <div className="form__container">
                <select
                  className="form__field"
                  data-cy="userSelect"
                  value={chosenOne}
                  onChange={addUserName}
                >
                  <option className="form__defaultChose" key={0} value="">
                    Choose a user
                  </option>
                  {users.map(user => (
                    <option
                      key={user.id}
                      value={user.name}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
                {!isUserName && (
                  <span className="warning">
                    Please choose a user
                  </span>
                )}
              </div>
              <button
                className="form__submit"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
          <span className="line"> </span>
          <TodoList todos={innerTodos} />
        </div>
      </div>
    </>
  );
};

export default App;
