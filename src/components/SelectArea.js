import React from 'react';
import { Select } from './Select';
import { SelectAreaShape } from '../utils/Shapes';

export const SelectArea = (props) => {
  const {
    selectError,
    options,
    selectValue,
    onChange,
    onActive,
  } = props;

  return (
    <>
      <div className="select_area">
        {!!selectError && <div className="error">Please choose a user</div>}
        <Select
          options={options}
          selectValue={selectValue}
          onChange={onChange}
          onActive={onActive}
        />
        <div className="select_label">Make your choice</div>
      </div>
      <button className="form_button" type="submit">Add</button>
    </>
  );
};

SelectArea.propTypes = SelectAreaShape.isRequired;
