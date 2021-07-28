import React from 'react';
import { ToDo } from '../../types';

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

Todo.propTypes = ToDo;
