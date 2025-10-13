import { useState } from 'react';
import { TodoList } from './components/TodoList';
import users from './api/users';
import initialTodos from './api/todos';
import 'bulma/css/bulma.css';

import { FormInput } from './components/FormInput';
import { FormSelect } from './components/FormSelect';
import { EMPTY_USER_ID, getNextId, sanitizeTitle } from './utils';
import type { User, RawTodo, Todo } from './types';

export const App = () => {
  const todosWithUsers: Todo[] = (initialTodos as RawTodo[]).map(t => ({
    ...t,
    user: (users as User[]).find(u => u.id === t.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>(EMPTY_USER_ID);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (value: string) => {
    const sanitizedValue = sanitizeTitle(value);
    setTitle(sanitizedValue);
    if (titleError && sanitizedValue.trim() !== '') {
      setTitleError(false);
    }
  };

  const handleUserChange = (value: string) => {
    setSelectedUserId(value);
    if (userError && value) {
      setUserError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserEmpty = !selectedUserId;

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) return;

    const user = (users as User[]).find(u => u.id === +selectedUserId)!;

    const newTodo: Todo = {
      id: getNextId(todos),
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUserId(EMPTY_USER_ID);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box">
              <h1 className="title has-text-centered">Add new TODO</h1>

              <form onSubmit={handleSubmit}>
                <FormInput
                  id="titleInput"
                  label="Title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter todo title"
                  dataCy="titleInput"
                  hasError={titleError}
                  errorText="Please enter a title"
                />

                <FormSelect
                  id="userSelect"
                  label="User"
                  value={selectedUserId}
                  onChange={handleUserChange}
                  dataCy="userSelect"
                  options={[
                    { value: EMPTY_USER_ID, label: 'Choose a user' },
                    ...(users as User[]).map(u => ({
                      value: String(u.id),
                      label: u.name,
                    })),
                  ]}
                  hasError={userError}
                  errorText="Please choose a user"
                />

                <div className="field has-text-centered">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary is-medium"
                      data-cy="submitButton"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <TodoList todos={todos} />
          </div>
        </div>
      </div>
    </section>
  );
};
