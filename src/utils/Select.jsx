import React from 'react';
import PropTypes from 'prop-types';

export class Select extends React.Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  handleClick = (e) => {
    e.preventDefault();
    this.toggle();
    this.props.changeUser(
      e.target.getAttribute('data-id'),
      e.target.getAttribute('data-name'),
    );
  }

  render() {
    const { users, userName } = this.props;

    return (
      <div className="theme-select">
        <button
          type="button"
          className={this.state.isOpen ? 'opened' : ''}
          onClick={this.toggle}
        >
          {userName || 'Choose a user'}
        </button>
        {this.state.isOpen && (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <a
                  href="/#"
                  data-id={user.id}
                  data-name={user.name}
                  onClick={this.handleClick}
                >
                  {user.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Select.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  userName: PropTypes.string.isRequired,
  changeUser: PropTypes.func.isRequired,
};
