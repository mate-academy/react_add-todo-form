import React from 'react';
import './AddTodoForm.css';
import classNames from 'classnames';
import allTypes from '../../types';

export class AddTodoForm extends React.Component {
  render() {
    const {
      users,
      onAddToTheList,
      onSaveInState,
      onResetForm,

      newTodoTitle,
      newUserId,
      hasTodoTitleError,
      hasUserIdError,
    } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          onSaveInState('hasTodoTitleError', !newTodoTitle);
          onSaveInState('hasUserIdError', !newUserId);

          if (!newTodoTitle) {
            return;
          }

          if (!newUserId) {
            return;
          }

          onAddToTheList(newTodoTitle, newUserId);

          onResetForm();
        }}
      >
        <div className="fieldWrapper">
          <input
            className={classNames('input', {
              wrongField: hasTodoTitleError,
            })}
            type="text"
            placeholder="Enter some task, please"
            value={newTodoTitle}
            onChange={(event) => {
              onSaveInState('newTodoTitle', event.target.value);
              onSaveInState('hasTodoTitleError', false);
            }}
          />

          {hasTodoTitleError
            && (
            <span
              className="fieldAlert"
            >
              Oh no! You forgot to enter some task!
            </span>
            )
          }
        </div>

        <div className="fieldWrapper">
          <select
            className={classNames('sel', {
              wrongField: hasUserIdError,
            })}
            value={newUserId}
            onChange={(event) => {
              onSaveInState('newUserId', event.target.value);
              onSaveInState('hasUserIdError', false);
            }}
          >

            <option value={0}>Choose a user</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError
            && (
            <span
              className="fieldAlert"
            >
              Who are you?
            </span>
            )
          }

        </div>

        <div className="buttonWrap">
          <button
            type="submit"
            className="button"
          >
            ADD
          </button>
        </div>

      </form>
    );
  }
}

AddTodoForm.propTypes = allTypes.AddTodoFormType;
