import React, { useState } from 'react';
import './App.scss';
import './components/TodoList/TodoList.scss';

import users from './api/users';
import todos from './api/todos';
import { Todos, Users, PrepearedTodos } from './react-app-env';
import { TodoList } from './components/TodoList/TodoList';

const App: React.FC = () => {
  const prepearingTodos = (todosList : Todos[], usersList : Users[]) => {
    return todosList.map(todo => ({
      ...todo,
      user: usersList.find(user => todo.userId === user.id)?.name,
    }));
  };

  const prepearedTodos: PrepearedTodos[] = prepearingTodos(todos, users);

  const [currentTodos, setCurrentTodos] = useState(prepearedTodos);

  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);
  const [todoIsCompleted, setIsCompleted] = useState(false);

  return (
    <div className="App">
      <form
        id="main_form"
        action="GET"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="text"
          name="title"
          id="main_form-name"
          placeholder="title"
          onChange={(event => {
            if (event.target.classList.contains('not_valid')) {
              event.target.classList.remove('not_valid');
            }

            setTodoTitle(event.target.value);
          }
          )}
        />
        <select
          name="user"
          id="userPick"
          onChange={(event => {
            setTodoUserId(Number(event.target.value));
            if (event.target.classList.contains('not_valid')) {
              event.target.classList.remove('not_valid');
            }
          }
          )}
        >
          <option
            id="default_option"
            value=""
          >
            Choose a user
          </option>
          {
            users.map(singleUser => (
              <option
                key={singleUser.id}
                value={singleUser.id}
              >
                {singleUser.name}
              </option>
            ))
          }
        </select>
        <div>
          <p>Completed</p>
          <label htmlFor="completed_true">
            True
            <input
              type="radio"
              name="completed"
              value="false"
              id="completed_true"
              onChange={() => {
                setIsCompleted(true);
              }}
            />
          </label>
          <label htmlFor="completed_false">
            False
            <input
              type="radio"
              name="completed"
              value="true"
              id="completed_false"
              onChange={() => {
                setIsCompleted(false);
              }}
              checked
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={() => {
            const todoToAdd = {
              id: currentTodos.length + 1,
              title: todoTitle,
              userId: todoUserId,
              user: '',
              completed: todoIsCompleted,
            };

            if ((todoToAdd.title === '') || (!todoToAdd.userId)) {
              if (todoToAdd.title === '') {
                const temp
                = document.getElementById('main_form-name') as HTMLInputElement;

                temp.value = '';
                temp.placeholder = 'Please enter the title';
                temp.classList.add('not_valid');
              }

              if (!todoToAdd.userId) {
                const temp
                = document.getElementById(
                  'default_option',
                ) as HTMLOptionElement;

                temp.innerHTML = 'Please choose user';
                temp.classList.add('not_valid');

                const picker
                = document.getElementById('userPick') as HTMLSelectElement;

                picker.classList.add('not_valid');
              }
            } else {
              setCurrentTodos(prevTodos => [...prevTodos, todoToAdd]);
              const form : HTMLFormElement
              = document.getElementById('main_form') as HTMLFormElement;

              form.reset();
              setTodoTitle('');
              setTodoUserId(0);
            }
          }}
        >
          Add
        </button>
      </form>
      <TodoList list={currentTodos} />
    </div>
  );
};

export default App;
