import './App.scss';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import './output.css';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './react-app-env';
import { TodoList } from './components/TodoList';

interface InitialValues {
  title: string,
  userId: number,
}

const formStyle = (`w-96
 h-96
  bg-base-300
   shadow-md
    rounded-xl
     p-3 flex flex-col justify-between`);

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const initialValues: InitialValues = {
    title: '',
    userId: 0,
  };
  const maxId = Math.max(...todos.map(todo => todo.id));

  return (
    <div className="App flex items-center flex-col">
      <h1 className="text-2xl m-10">
        Add Todo form
      </h1>
      <div className="flex flex-shrink-0 gap-3 w-full justify-evenly">
        <div className="mt-12">
          <Formik
            initialValues={initialValues}
            onSubmit={({ title, userId }, actions) => {
              const newTodo: Todo = {
                title,
                userId: Number(userId),
                completed: false,
                id: maxId + 1,
              };

              setTodos((prevState) => {
                return [newTodo, ...prevState];
              });
              actions.resetForm();
            }}
            validationSchema={
              Yup.object({
                title: Yup.string().required('Please enter a title'),
                userId: Yup.number().min(1, 'Please choose a user'),
              })
            }
            validateOnChange={false}
            validateOnBlur={false}
          >
            <Form
              className={formStyle}
            >
              <div className="mb-5">
                <label className="label" htmlFor="title">
                  <span className="label-text">Your title:</span>
                </label>
                <Field
                  id="title"
                  type="text"
                  name="title"
                  data-cy="titleInput"
                  className="input input-md input-bordered w-full"
                  placeholder="Write here..."
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="alert alert-error w-full h-5 mt-2"
                />

              </div>

              <div className="mb-5 flex flex-col">
                <label className="label" htmlFor="user">
                  <span className="label-text">Your name:</span>
                </label>
                <Field
                  id="user"
                  as="select"
                  name="userId"
                  data-cy="userSelect"
                  className="select select-md select-bordered w-full"
                >
                  <option value="0" disabled>Choose a user</option>
                  {usersFromServer.map((user: User) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </Field>
                <ErrorMessage
                  name="userId"
                  component="div"
                  className="alert alert-error w-full h-5 mt-2"
                />
              </div>

              <button
                type="submit"
                data-cy="submitButton"
                className="btn btn-md btn-primary"
              >
                Add
              </button>
            </Form>
          </Formik>
        </div>

        <TodoList todos={todos} />
      </div>

    </div>
  );
};
