export const isSelectedItemEditable = ({
  selectedItems = [],
  items = [],
  restrictTo = [],
}) => {
  const justOneSelected = selectedItems.length === 1;
  if (items.length === 0 || !justOneSelected) { return false; }

  const randomItem = items[0];
  const itemCodName = Object.keys(randomItem).find((field) => field.includes('Cod'));
  const itemEstRegName = Object.keys(randomItem).find((field) => field.includes('EstReg'));

  const selectedItem = items.find((item) => item[itemCodName] === selectedItems[0]);

  return !restrictTo.includes(selectedItem[itemEstRegName]);
};
