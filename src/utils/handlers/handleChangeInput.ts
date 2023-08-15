export const handleChangeInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setShowErrorEmptyTitle: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setValue(event.target.value);
  if (event.target.value.length === 0) {
    setShowErrorEmptyTitle(true);
  }
};
