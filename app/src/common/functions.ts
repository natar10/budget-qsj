import { SelectedItem, ContentType } from "./types";

const isItemSelected = (id: string, selectedItems: SelectedItem[]) => {
  return selectedItems.map((item) => item.item).includes(id);
};

const isCategorySelected = (
  category: ContentType,
  selectedItems: SelectedItem[]
) => {
  return selectedItems.map((item) => item.type).includes(category);
};

export { isItemSelected, isCategorySelected };
