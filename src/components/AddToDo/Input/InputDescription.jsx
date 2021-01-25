import React from 'react';

const InputDescription = ({ title, handleChange, titleError }) => (
  <label className="form__input">
    <input
      type="text"
      placeholder="Only letters, number and spaces"
      className="ui input"
      name="title"
      value={title}
      onChange={handleChange}
    />

    {titleError
        && <p className="ui red pointing basic label">Enter the title</p>
    }
  </label>
);

export default InputDescription;
