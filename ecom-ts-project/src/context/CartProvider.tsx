import { createContext, ReactElement, useMemo, useReducer } from "react";

// Define the structure of a cart item
export type CartItemType = {
  sku: string; // Unique identifier for the product
  name: string; // Name of the product
  price: number; // Price per unit
  qty: number; // Quantity in the cart
};

// Define the structure of the cart state
type CartStateType = { cart: CartItemType[] };

// Initialize the cart state with an empty cart
const initCartState: CartStateType = { cart: [] };

// Define action types for the reducer
const REDUCER_ACTION_TYPE = {
  ADD: "ADD", // Add an item to the cart
  REMOVE: "REMOVE", // Remove an item from the cart
  QUANTITY: "QUANTITY", // Update quantity of an item
  SUBMIT: "SUBMIT", // Submit order (clear cart)
};

// Define type aliases for action types and action payloads
export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType; // Payload is optional (only needed for ADD, REMOVE, and QUANTITY actions)
};

// Reducer function to handle state updates based on dispatched actions
const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action payload missing in ADD action");
      }

      const { sku, name, price } = action.payload;

      // Remove the item if it already exists to avoid duplication
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // Check if the item already exists in the cart
      const itemExist: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const qty: number = itemExist ? itemExist.qty + 1 : 1; // Increment quantity if item exists

      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action payload missing in REMOVE action");
      }

      const { sku } = action.payload;

      // Remove the item from the cart
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action payload missing in QUANTITY action");
      }
      const { sku, qty } = action.payload;

      // Remove the item from the cart temporarily
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // Check if the item exists before updating quantity
      const itemExist: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExist) {
        throw new Error("Item must exist in order to update quantity");
      }

      // Update item with the new quantity
      const updatedItem: CartItemType = { ...itemExist, qty };

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      // Clear the cart when order is submitted
      return { ...state, cart: [] };
    }

    default:
      throw new Error("Unidentified reducer action type.");
  }
};

// Custom hook to manage the cart context
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  // Memoized action types to prevent unnecessary re-renders
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  // Calculate total items in the cart
  const totalItems = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + cartItem.qty;
  }, 0);

  // Calculate total price and format it as currency
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((prevValue, cartItem) => {
      return prevValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  // Sort cart items based on SKU for consistent display order
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4)); // Extract numeric part from SKU
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

// Define the type for the cart context return values
export type UseCartContextType = ReturnType<typeof useCartContext>;

// Initial state for the cart context
const initCartContextState: UseCartContextType = {
  dispatch: () => {}, // Placeholder function before context provider is initialized
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

// Create the cart context with a default value
const CartContext = createContext<UseCartContextType>(initCartContextState);

// Define the type for children prop (React elements)
type ChildrenType = {
  children?: ReactElement | undefined;
};

// CartProvider component to wrap around application components
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
