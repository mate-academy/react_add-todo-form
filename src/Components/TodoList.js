import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserList from './UsersList';

export default class TodoList extends Component {
  getUserById(id) {
    return this.props.users.find(item => item.id === id);
  }

  render() {
    const { items: lists } = this.props;
    const alllists = lists.map(list => (
      <div className="row" key={list.title}>
        <div className="col s12 m5">
          <div className="card blue-grey darken-1 wrap-img">
            <img
              className="img"
              src="img/5a991c82be987_thumb900.png"
              alt=""
            />
            <div className="card-content white-text">
              <span className="card-title">Todos Card</span>
              <p>

                USER ID:
                {list.userId}
              </p>
              <p>
                <i className="fas fa-tasks" />
                {' '}
                {list.title}
              </p>
              <p>
                <i className="fas fa-sync-alt" />
                {' '}
                {list.completed === false ? 'not completed' : 'completed'}
              </p>
              <UserList usersList={this.getUserById(list.userId)} />
            </div>
          </div>
        </div>
      </div>

    ));

    return (
      <div>
        {alllists}
      </div>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
