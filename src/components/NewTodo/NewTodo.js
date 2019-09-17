import React from 'react';
import './NewTodo.css';

const NewTodo = ({
  users,
  handleSubmit,
  title,
  user,
  handleInputChange,
  handleSelectChange,
  titleError,
  selectError,
}) => (
  <form className="ui inverted form error" onSubmit={handleSubmit}>
    <div className="field">
      <labe>To-Do</labe>
      <input
        maxLength={30}
        type="text"
        name="title"
        placeholder="Write your title"
        onChange={handleInputChange}
        value={title}
      />
      {titleError && (
        <div className="ui error message input">
          <p>{titleError}</p>
        </div>
      )}
    </div>
    <div className="select-container">
      <select
        name="userSelect"
        id="userSelect"
        value={user}
        onChange={handleSelectChange}
        className="ui dropdown"
      >
        <option selected value="">
          Choose a user
        </option>
        {users.map((userSelected, i) => (
          <option value={i}>{userSelected.name}</option>
        ))}
      </select>
      {selectError && (
        <small className="ui error message select">{selectError}</small>
      )}
    </div>
    <button type="submit" className="positive ui button">
      Submit
    </button>
  </form>
);

export default NewTodo;
