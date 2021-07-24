import React from 'react';
import propTypes from 'prop-types';

export function Todo({ title, status, name }) {
  return (
    <>
      <h3>
        {`Title: ${title}`}
      </h3>
      <p>
        Status:
        {!status ? ' in progress' : 'done'}
      </p>
      <p>
        {`name: ${name}`}
      </p>
    </>
  );
}

Todo.propTypes = {
  title: propTypes.string.isRequired,
  status: propTypes.bool.isRequired,
  name: propTypes.string.isRequired,
};
