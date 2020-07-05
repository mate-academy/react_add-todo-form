import PropTypes from 'prop-types';

export const TodoShape = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
});

export const OptionsShape = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
});

export const NamesShape = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
}));

export const SelectAreaShape = {
  selectError: PropTypes.string,
  options: OptionsShape,
  selectValue: PropTypes.string,
  onChange: PropTypes.func,
  onActive: PropTypes.func,
  isActive: PropTypes.func,
};

export const AddTodoFormShape = {
  names: NamesShape,
  selectOnChange: PropTypes.func,
  sendTodoData: PropTypes.func,
  selectValue: PropTypes.string,
};
