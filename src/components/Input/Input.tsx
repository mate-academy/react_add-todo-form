import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface Props {
  value: string;
  isError: boolean;
  callback: (newVal: string) => void;
}

export const Input: React.FC<Props> = ({ value, isError, callback }) => {
  function handleChanges(event: ChangeEvent<HTMLInputElement>) {
    callback(event.target.value);
  }

  return (
    <div className="field">
      <label htmlFor='title' className="label">Title</label>
      <div className="control has-icons-left has-icons-right">
        <input
          data-cy="titleInput"
          className={classNames('input', { 'is-danger': isError && !value })}
          type="text"
          id='title'
          value={value}
          placeholder="Enter title"
          onChange={handleChanges}
          required
        />
      </div>
      {isError && !value && (
        <p className="error help is-danger">Please enter a title</p>
      )}
    </div>
  );
};
