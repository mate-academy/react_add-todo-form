import React from 'react';

class AddTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      userId: 0,
      showErrors: true,
    };
  }

  setChanges = (event) => {
    const { value, name } = event.target;
    let correctValue = value;

    switch (name) {
      case 'title':
        correctValue = correctValue.replace(/[^\wА-Яа-яЁё .,?!@$#%&*()-]/g, '');
        break;
      case 'userId':
        correctValue = +correctValue;
        break;
      default:
        correctValue = correctValue.replace(/[`]/g, '');
    }

    this.setState(prevState => ({
      [name]: correctValue,
      showErrors: false,
    }));
  }

  render() {
    return (
      <form>
        <fieldset>
          <legend>Add ToDo</legend>
          <label>
            Who are You?&nbsp;
            <select
              name="userId"
              value={this.state.userId}
              onChange={this.setChanges}
            >
              <option value="0">Choose a user</option>Choose a user
              {this.props.users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </select>
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            What sould be Done?&nbsp;
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.setChanges}
            />
          </label>

          <br />

          {this.props.errors && this.state.showErrors
            && <p className="errorSign">{this.props.errors}</p>}

          <br />

          <button
            onClick={(event) => {
              event.preventDefault();
              this.props.closing();
            }}
          >
            Close
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={(event) => {
              event.preventDefault();
              this.setState({ showErrors: true });
              this.props.adding(this.state.userId, this.state.title);
            }}
          >
            Save
          </button>
        </fieldset>
      </form>
    );
  }
}

export default AddTodoForm;
