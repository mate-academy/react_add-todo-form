import React from 'react';

const TodoForm 
= ({ users,
    selectedUser,
  handleSelect,
  handleSubmit,
  handleChange,
  text,
  isError,
}) => {
  return (
    <div>
      <input
        name="text"
        value={text}
        onChange={handleChange}
        placeholder="TODO"
      />
      <select
        value={selectedUser}
        onChange={event => handleSelect(event)}
      >
        <option value={0}>Chose User</option> 
        {users.map(user => (
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
      <button type="button" onClick={handleSubmit}>add Todo</button>
      { isError && (<div>Chose User or write Todo</div>)}
    </div>
  );
};

export default TodoForm;
