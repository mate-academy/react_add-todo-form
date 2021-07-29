import React from 'react';
import Proptypes from 'prop-types';

export const IsCompleted = ({ isCompleted, change }) => (
  <div className="radio">
    <label
      htmlFor="completed_true"
      className="radioOption"
      style={isCompleted ? { backgroundColor: 'darkgray' }
        : { backgroundColor: 'inherit' }}
    >
      Completed
      <input
        className="radioBotton"
        type="radio"
        name="completed"
        id="completed_true"
        value="true"
        checked={isCompleted === true}
        onChange={change}
      />
    </label>
    <label
      htmlFor="completed_false"
      className="radioOption"
      style={!isCompleted ? { backgroundColor: 'darkgray' }
        : { backgroundColor: 'inherit' }}
    >
      In process
      <input
        className="radioBotton"
        type="radio"
        name="completed"
        id="completed_false"
        value="false"
        checked={isCompleted === false}
        onChange={change}
      />
    </label>
  </div>
);

IsCompleted.propTypes = {
  isCompleted: Proptypes.bool.isRequired,
  change: Proptypes.func.isRequired,
};
