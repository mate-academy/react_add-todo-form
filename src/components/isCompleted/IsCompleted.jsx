import React from 'react';
import Proptypes from 'prop-types';

export const IsCompleted = ({ isCompleted, change }) => (
  <div className="radio">
    <label htmlFor="completed_true">
      Completed
    </label>
    <input
      type="radio"
      name="completed"
      id="completed_true"
      value="true"
      checked={isCompleted === true}
      onChange={change}
    />
    <label htmlFor="completed_false">
      In process
    </label>
    <input
      type="radio"
      name="completed"
      id="completed_false"
      value="false"
      checked={isCompleted === false}
      onChange={change}
    />
  </div>
);

IsCompleted.propTypes = {
  isCompleted: Proptypes.bool.isRequired,
  change: Proptypes.func.isRequired,
};
