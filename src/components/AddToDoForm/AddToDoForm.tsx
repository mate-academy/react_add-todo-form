import { FC } from 'react';
import { useForm } from 'react-hook-form';

import usersFromServer from '../../api/users';

import { findMaxUserId, getUserById } from '../../helpers';

import { IForm, IFormProps } from './AddToDoForm.types';

export const AddToDoForm: FC<IFormProps> = ({ setTodos }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    criteriaMode: 'all',
  });

  const onSubmit = async (data: IForm) => {
    setTodos({
      title: data.title,
      userId: +data.userId,
      completed: false,
      user: getUserById(usersFromServer, +data.userId),
      id: findMaxUserId(usersFromServer) + 1,
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>
          <span style={{ display: 'block' }}>Todo</span>

          <input
            type="text"
            data-cy="titleInput"
            {...register('title', {
              required: true,
            })}
            placeholder="Enter todo"
            style={{ marginBottom: '10px' }}
          />
        </label>

        {errors.title && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          <span style={{ display: 'block' }}>User</span>

          <select
            data-cy="userSelect"
            {...register('userId', {
              required: true,
              validate: value => value !== '0',
            })}
            defaultValue="0"
            style={{ marginBottom: '10px' }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </label>

        {errors.userId && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
