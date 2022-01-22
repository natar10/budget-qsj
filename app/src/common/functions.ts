import { SelectedItem, ContentType, UserData } from "./types";
import { DECORATIONS, LOWER_PAX, HIGHER_PAX, FREE_ITEMS } from "./constants";

const isItemSelected = (id: string, selectedItems: SelectedItem[]) => {
  return selectedItems.map((item) => item.product.id).includes(id);
};

const isCategorySelected = (
  category: ContentType,
  selectedItems: SelectedItem[]
) => {
  return selectedItems.map((item) => item.type).includes(category);
};

const calculateDecoration = (item: SelectedItem, quantity: number) => {
  const calculatePrice = {
    [DECORATIONS.bronze]:
      quantity <= LOWER_PAX ? 6.5 : quantity <= HIGHER_PAX ? 5 : 4,
    [DECORATIONS.silver]:
      quantity <= LOWER_PAX ? 8.5 : quantity <= HIGHER_PAX ? 7 : 6,
    [DECORATIONS.gold]:
      quantity <= LOWER_PAX ? 12 : quantity <= HIGHER_PAX ? 11.5 : 9,
  };

  return calculatePrice[item.product.id] * quantity;
};

const calculateTotal = (
  item: SelectedItem,
  quantity: number,
  chairs: boolean = false
) => {
  if (item.type === "decoration") {
    return calculateDecoration(item, quantity);
  } else if (item.type === "ceremony") {
    return chairs ? item.product.value + quantity : item.product.value;
  }
  return item.product.value * quantity;
};

const isFree = (userData: UserData | null, product: string): boolean => {
  if (userData) {
    return userData.quantity >= 100 && FREE_ITEMS.includes(product);
  }
  return false;
};

export { isItemSelected, isCategorySelected, calculateTotal, isFree };
