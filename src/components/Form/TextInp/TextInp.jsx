import React from 'react';
import PropTypes from 'prop-types';

const TextInp = ({ getValue, title }) => (
  <>
    <input
      type="text"
      className="form__text-input"
      name="title"
      id="new-todo-text"
      value={title}
      onChange={getValue}
    />
    <label
      htmlFor="new-todo-text"
      className="form__text-label"
    >
      Todo Title
    </label>
  </>
);

TextInp.propTypes = {
  getValue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default React.memo(TextInp);
