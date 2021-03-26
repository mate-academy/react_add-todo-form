import React from 'react';
import PropsTypes from 'prop-types';

export function Error(props) {
  return (
    <div className="error">
      <h2>
        {props.title}
      </h2>

      <p>
        {props.message}
      </p>
    </div>
  );
}

Error.propTypes = {
  title: PropsTypes.string.isRequired,
  message: PropsTypes.string.isRequired,
};
