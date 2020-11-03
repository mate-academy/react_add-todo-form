import React from 'react';
import { SelectShape } from '../../Shapes/SelectShape';
import { Option } from '../Option';

export const Select = ({
  selectedUser,
  preparedUsers,
  errorOnSelect,
  handleChangeOnSelect,
}) => (
  <>
    <select
      className="form__select"
      name="selectedUser"
      value={selectedUser}
      onChange={handleChangeOnSelect}
    >
      <Option preparedUsers={preparedUsers} />
    </select>
    {errorOnSelect
      && <div className="form__error">Please choose a user</div>}
  </>
);

Select.propTypes = SelectShape;
