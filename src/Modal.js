import React from 'react';

class Modal extends React.Component {

  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    const { toggleModalClose, usersData, submitForm, handleFieldChange, errorsMap } = this.props

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 600,
      minHeight: 45,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle} >
        <div className="modal" style={modalStyle}>

          <button
            className="btn btn-close"
            onClick={toggleModalClose}
          >
            close
            </button>

          <form onSubmit={submitForm} className="imput-container" >

            <div className="input-field">
              {errorsMap.task && (
                <div className="error" style={{ color: 'red' }}>
                  {errorsMap.task}
                </div>
              )}
              <input
                ref={(input) => { this.nameInput = input }}
                type="search"
                autocomplete="off"
                name="task"
                placeholder="Enter task"
                onChange={handleFieldChange}
              />

            </div>

            <div className="select-field">

              {errorsMap.person && (
                <div className="error" style={{ color: 'red' }}>
                  {errorsMap.person}
                </div>
              )}

              <select
                onChange={handleFieldChange}
                name="person"
              >
                <option value=''>Chose executor from list</option>
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
    )

  }

}

export default Modal
