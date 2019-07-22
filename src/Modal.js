import React from 'react';

class Modal extends React.Component {
  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    const {
      toggleModalClose,
      usersData, submitForm,
      handleFieldChange,
      valuesMap,
      errorsMap,
    } = this.props;

    return (
      <div className="backdrop">
        <div className="modal">

          <button
            type="button"
            className="btn btn-close"
            onClick={toggleModalClose}
          >
            close
          </button>

          <form onSubmit={submitForm} className="imput-container">

            <div className="input-field">
              {errorsMap.task && (
                <div className="error" style={{ color: 'red' }}>
                  {errorsMap.task}
                </div>
              )}
              <input
                ref={(input) => { this.nameInput = input; }}
                type="search"
                value={valuesMap.task}
                size="28"
                autoComplete="off"
                name="task"
                placeholder="Enter task"
                onChange={handleFieldChange}
              />

            </div>

            <div className="select-field">

              {errorsMap.person && (
                <div className="error">
                  {errorsMap.person}
                </div>
              )}

              <select
                onChange={handleFieldChange}
                name="person"
                value={valuesMap.task}
              >
                <option value="">Chose executor from list</option>
                {usersData.map(user => (
                  <option value={JSON.stringify(user)}>{user.name}</option>
                ))}

              </select>

            </div>

            <button
              type="submit"
              name="add-item"
              className="subm btn"
            >
              Add task
            </button>

          </form>

        </div>
      </div>
    );
  }
}

export default Modal;
