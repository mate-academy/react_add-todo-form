import React from 'react';
import './Header.css';

const Header = ({users, todos}) => (
  <header>
    <h1>
      <span className="ui red header">Static</span>
      {' '}
      <span className="ui green header">list</span>
      {' '}
      <span className="ui yellow header">of</span>
      {' '}
      <span className="ui blue header">todos</span>
    </h1>
    <div className="ui statistics">
      <div className="teal statistic">
        <div className="value">
          {todos.length}
        </div>
        <div className="label">
          todos
        </div>
      </div>
      <div className="orange statistic">
        <div className="value">
          {users.length}
        </div>
        <div className="inverted label">
          USERS
        </div>
      </div>
    </div>
  </header>
);

export default Header;
