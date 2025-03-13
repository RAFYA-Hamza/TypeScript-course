// Import necessary modules from React
import { createContext, ReactElement, useEffect, useState } from "react";

// Define a type for the product data structure
export type ProductType = {
  sku: string; // Stock Keeping Unit (unique identifier for the product)
  name: string; // Name of the product
  price: number; // Price of the product
};

// Initialize the initial state with an array of products
// const initState: ProductType[] = [
//   {
//     sku: "item0001",
//     name: "Widget",
//     price: 9.99,
//   },
//   {
//     sku: "item0002",
//     name: "Premium Widget",
//     price: 19.99,
//   },
//   {
//     sku: "item0003",
//     name: "Deluxe Widget",
//     price: 29.99,
//   },
// ];

const initState: ProductType[] = [];

// Define a type for the context state, which will hold the products
/*
 This line defines a type alias called UseProductsContextType.

    -It specifies that the context value will be an object with a single property:
    -products: An array of ProductType objects.
 */
export type UseProductsContextType = { products: ProductType[] };

// Initialize the context state with an empty array of products
const initContextState: UseProductsContextType = { products: [] };

// Create a context for the products with the initial context state
const ProductsContext = createContext<UseProductsContextType>(initContextState);

// Define a type for the children prop, which can be a single React element or an array of React elements
type ChildrenType = { children?: ReactElement | ReactElement[] };

// Define the ProductsProvider component, which will provide the products to its children
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  // Use state to manage the products, initialized with the initial state
  const [products, setProducts] = useState<ProductType[]>(initState);

  //   fetching the data from the server once the ProductProvider render the first time
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };
    fetchProducts().then((products) => setProducts(products));
  }, []);
  // Return the provider component, passing the current state of products to the context
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Export the ProductsProvider component as the default export
export default ProductsProvider;
