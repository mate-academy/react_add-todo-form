import React from 'react';
import classNames from 'classnames';

interface Props {
  addTask: (event: React.FormEvent<EventTarget>) => void;
  userId: number;
  userIdChanger: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  users: User[];
  noUserError: string | null;
  nonValidTitle: string | null;
  noTitleError: string | null;
  title: string;
  titleChanger: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form: React.FC<Props> = (props) => {
  const {
    addTask,
    userId,
    userIdChanger,
    users,
    noUserError,
    nonValidTitle,
    noTitleError,
    title,
    titleChanger,
  } = props;

  return (
    <form
      className="form-inline form-row App__form"
      id="addTask"
      onSubmit={addTask}
    >
      <label
        className="sr-only col-sm-3"
        htmlFor="inlineFormCustomSelect"
      >
        <select
          id="inlineFormCustomSelect"
          className="form-select"
          name="userId"
          value={userId}
          onChange={userIdChanger}
        >
          <option value={0}>
            Choose a user
          </option>
          {users.map(person => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        {noUserError && (
          <p className={classNames('App__alert alert alert-danger', {
            'App__alert--shown': noUserError && userId === 0,
          })}
          >
            {noUserError}
          </p>
        )}
      </label>

      <label htmlFor="inlineFormInputGroup" className="col-sm-3">
        <input
          id="inlineFormInputGroup"
          className="form-control"
          type="text"
          placeholder="Write your task here"
          name="title"
          value={title}
          onChange={titleChanger}
        />

        <p className={classNames('App__alert alert alert-danger', {
          'App__alert--shown': noTitleError || nonValidTitle,
        })}
        >
          {noTitleError || nonValidTitle}
        </p>
      </label>

      <button
        className="btn btn-primary col-sm-3 App__button"
        type="submit"
        form="addTask"
      >
        Add
      </button>
    </form>
  );
};
