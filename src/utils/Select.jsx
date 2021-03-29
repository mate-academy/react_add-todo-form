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

  render() {
    const { users, userName, onChange } = this.props;

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
              <li
                key={user.id}
              >
                <a
                  href="/#"
                  onClick={() => {
                    onChange(user);
                    this.toggle();
                  }}
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
  onChange: PropTypes.func.isRequired,
};
