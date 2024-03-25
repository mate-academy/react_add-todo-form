import React, { useState } from 'react';
import { Good } from '../../types/Good';
import { colors, getColorById } from '../../api';
import classNames from 'classnames';

type Props = {
  onSubmit: (good: Good) => void;
};

type State = {
  newGoodName: string;
  goodNameError: string;
  selectedColorId: number;
  colorIdError: string;
};

export class GoodForm extends React.Component<Props, State> {
  state: Readonly<State> = {
    newGoodName: '',
    goodNameError: '',
    selectedColorId: 0,
    colorIdError: '',
  };

  constructor(props: Props) {
    super(props);

    // eslint-disable-next-line no-console
    console.log('Created');
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('🚀 ~ GoodForm ~ handleSubmit ~ state:', this);
    const { newGoodName, selectedColorId } = this.state;

    const { onSubmit } = this.props;

    if (!newGoodName) {
      this.setState({ goodNameError: 'Please enter a good name!' });
    }

    if (!selectedColorId) {
      this.setState({ colorIdError: 'Please select a color!' });
    }

    if (!newGoodName || !selectedColorId) {
      return;
    }

    const newGood: Good = {
      id: 0, // temporary id
      name: newGoodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId),
    };

    onSubmit(newGood);
    this.setState({ newGoodName: '' });
    this.setState({ selectedColorId: 0 });
  };

  render(): React.ReactNode {
    const { handleSubmit } = this;
    const { goodNameError, newGoodName, colorIdError, selectedColorId } =
      this.state;

    return (
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            name="goodName"
            type="text"
            className={classNames({
              'with-error': goodNameError,
            })}
            value={newGoodName}
            onChange={event => {
              this.setState({ newGoodName: event.target.value });
              this.setState({ goodNameError: '' });
            }}
          />

          {goodNameError && <span className="error">{goodNameError}</span>}
        </div>

        <div className="field">
          <select
            className={classNames({
              'with-error': colorIdError,
            })}
            value={selectedColorId}
            onChange={event => {
              this.setState({ selectedColorId: Number(event.target.value) });
              this.setState({ colorIdError: '' });
            }}
          >
            <option value="0">Choose a color</option>

            {colors.map(color => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>

          {colorIdError && <span className="error">{colorIdError}</span>}
        </div>

        <button type="submit">Add</button>
      </form>
    );
  }
}

export const GoodForm2: React.FC<Props> = ({ onSubmit }) => {
  const [newGoodName, setNewGoodName] = useState('');
  const [goodNameError, setGoodNameError] = useState('');

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [colorIdError, setColorIdError] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newGoodName) {
      setGoodNameError('Please enter a good name!');
    }

    if (!selectedColorId) {
      setColorIdError('Please select a color!');
    }

    if (!newGoodName || !selectedColorId) {
      return;
    }

    const newGood: Good = {
      id: 0, // temporary id
      name: newGoodName,
      colorId: selectedColorId,
      color: getColorById(selectedColorId),
    };

    onSubmit(newGood);
    setNewGoodName('');
    setSelectedColorId(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          name="goodName"
          type="text"
          className={classNames({
            'with-error': goodNameError,
          })}
          value={newGoodName}
          onChange={event => {
            setNewGoodName(event.target.value);
            setGoodNameError('');
          }}
        />

        {goodNameError && <span className="error">{goodNameError}</span>}
      </div>

      <div className="field">
        <select
          className={classNames({
            'with-error': colorIdError,
          })}
          value={selectedColorId}
          onChange={event => {
            setSelectedColorId(Number(event.target.value));
            setColorIdError('');
          }}
        >
          <option value="0">Choose a color</option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        {colorIdError && <span className="error">{colorIdError}</span>}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};
