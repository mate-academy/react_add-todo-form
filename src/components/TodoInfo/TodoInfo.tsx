import '../api/App.scss';
import React, { ChangeEvent, useState } from 'react';
import { TodoList } from '../TodoList';
import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { UserInfo } from '../UserInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TodoVar {
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export const Generator = () => {
  const [users, setUsers] = useState<TodoVar[]>(
    todosFromServer.map(todo => {
      const fullUser = usersFromServer.find(u => u.id === todo.userId)!;

      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        user: fullUser,
      };
    }),
  );

  const [selectedUser, setSelectedUser] = useState(0);
  const [aparecerTxt, SetAparecerTxt] = useState<boolean[]>([false, false]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [todoVar, setTodoVar] = useState<TodoVar>({
    id: users[users.length - 1].id + 1,
    title: '',
    completed: false,
    user: usersFromServer[0],
  });

  const cleanTodo = () => {
    setTodoVar({
      id: users[users.length - 1].id + 1,
      title: '',
      completed: false,
      user: usersFromServer[0],
    });

    setIsOpen(false);
  };

  const onChangeTodo = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: string,
  ) => {
    if (type === 'title') {
      setTodoVar(prev => ({
        ...prev,
        title: (event as ChangeEvent<HTMLInputElement>).target.value,
      }));

      return;
    }

    if (type === 'user') {
      const value = (event as ChangeEvent<HTMLSelectElement>).target.value;

      const selected = usersFromServer.find(u => u.id === Number(value));

      if (selected) {
        setTodoVar(prev => ({
          ...prev,
          user: selected,
        }));
      }
    }
  };

  const onSubmitAll = (
    formulario: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (formulario === 'todo') {
      if (todoVar.title !== '' && todoVar.user.id !== 0) {
        setUsers(prev => [...prev, todoVar]);
        SetAparecerTxt([false, false]);
        cleanTodo();
        setSelectedUser(0);
      } else {
        SetAparecerTxt([todoVar.title === '', todoVar.user.id === 0]);
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={e => onSubmitAll('todo', e)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={todoVar.title}
            onChange={e => onChangeTodo(e, 'title')}
          />

          <span className="error">
            {aparecerTxt[0] && todoVar.title === ''
              ? 'Please enter a title'
              : ''}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => {
              setSelectedUser(Number(e.target.value));
              onChangeTodo(e, 'user');
            }}
            onClick={() => setIsOpen(true)}
          >
            <option disabled={isOpen} value="0">
              Choose a user
            </option>

            {usersFromServer.map(r => UserInfo(r))}
          </select>

          <span className="error">
            {aparecerTxt[1] && todoVar.user.id === 0
              ? 'Please choose a user'
              : ''}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {users.map((todo, index) => (
          <TodoList
            key={todo.id}
            todo={todo}
            index={index}
            setUsers={setUsers}
          />
        ))}
      </section>
    </div>
  );
};
