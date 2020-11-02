import React from 'react';
import { TitleShape } from '../../shapes/TitleShape';

export const Title = ({ value, titleError, onChange }) => (
  <div className="field">
    <label htmlFor="title">
      Task title:
    </label>

    <input
      type="text"
      name="title"
      id="title"
      placeholder="Letters, numbers and spaces only"
      value={value}
      onChange={onChange}
    />

    {titleError && (
      <p className="ui red pointing basic label">
        Please enter the title
      </p>
    )}
  </div>
);

Title.propTypes = TitleShape;
