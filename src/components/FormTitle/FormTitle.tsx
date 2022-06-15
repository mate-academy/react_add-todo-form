import React from 'react';
import './Form.scss';

type Props = {
  title: string;
  changeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checks: string;
};

export const FormTitle: React.FC<Props> = ({
  title,
  changeTitle,
  checks,
}) => (
  <div>
    <input
      className="form__title"
      type="text"
      name="title"
      placeholder="Title"
      data-cy="titleInput"
      value={title}
      onChange={changeTitle}
    />
    {checks === 'title error' && (
      <span className="form__title-error">
        &emsp;Please enter the title!
      </span>
    )}
  </div>
);
