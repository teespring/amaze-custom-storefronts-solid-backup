import {
  createResource,
  createContext,
  useContext,
  Resource,
  JSX,
  createSignal,
  createEffect,
  Accessor,
  Setter,
} from 'solid-js';
import { createMutable } from 'solid-js/store';
import { useBrowserLocation, useStorage } from 'solidjs-use';
import {
  ThemeInfo,
  StoreInfo,
  Collections,
  Product,
  ProductCollection,
} from './typeDefs';
import { isServer } from 'solid-js/web';

const location = useBrowserLocation();
const hrefArray = location()
  .href?.replace(`${location().protocol}//`, '')
  .split('.');
const subDomain = hrefArray ? hrefArray[0] : 'www';

let cartStorage = { items: {}, region: 'USA' } as Cart;
if (!isServer) {
  cartStorage = JSON.parse(localStorage.getItem('browniebits-cart')!);
  console.log('GotCartStorage', cartStorage);
}
const getInitialCartTotal = (cartFromStorage: Cart) => {
  return Object.keys(cartFromStorage.items).reduce(
    (total: number, sku: string) => total + cartFromStorage.items[sku].quantity,
    0
  );
};

const fetchTheme = async (slug: string) =>
  (
    await fetch(
      `https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=${slug}`
    )
  ).json();
const fetchStoreInfo = async (slug: string) =>
  (await fetch(`https://commerce.teespring.com/v1/stores?slug=${slug}`)).json();
const fetchCollections = async (slug: string) =>
  (
    await fetch(
      `https://commerce.teespring.com/v1/stores/collections?slug=${slug}`
    )
  ).json();
const fetchProducts = async (numProducts: string) =>
  (
    await fetch(
      `https://commerce.teespring.com/v1/stores/products?slug=browniebits&currency=USD&region=USA&per=${numProducts}`
    )
  ).json();

interface ContextInterface {
  slug: string;
  theme: Resource<ThemeInfo>;
  storeInfo: Resource<StoreInfo>;
  collections: Resource<Collections>;
  products: Resource<ProductCollection>;
  searchOpen: Accessor<boolean>;
  setSearchOpen: Setter<boolean>;
  cartCount: Accessor<number>;
  setCartCount: Setter<number>;
  cart: {
    cart: Cart;
    addProduct(addCartItem: AddCartItem): void;
    clear(): void;
  };
}
interface CartItem {
  colorID: string;
  sizeID: string;
  productID: string;
  quantity: number;
  slug: string;
  itemGroupID: string;
}
interface Cart {
  items: Record<string, CartItem>;
  region: string;
}
interface AddCartItem {
  sku: string;
  colorID: string;
  sizeID: string;
  productID: string;
  quantity: number;
  itemGroupID: string;
  slug: string;
}
const StoreContext = createContext<ContextInterface>();

export function StoreProvider(props: { children: JSX.Element }) {
  const [theme] = createResource<ThemeInfo, string>(
    () => 'browniebits',
    fetchTheme,
    {
      initialValue: {},
    }
  );
  const [storeInfo] = createResource<StoreInfo, string>(
    () => 'browniebits',
    fetchStoreInfo,
    {
      initialValue: {},
    }
  );
  const [collections] = createResource<Collections, string>(
    () => 'browniebits',
    fetchCollections,
    {
      initialValue: { storeId: 0, storeSlug: 'browniebits', collections: [] },
    }
  );
  const [products] = createResource<ProductCollection, string>(
    () => '1000',
    fetchProducts,
    {
      initialValue: {},
    }
  );

  const [cartCount, setCartCount] = createSignal(
    getInitialCartTotal(cartStorage)
  );
  const [searchOpen, setSearchOpen] = createSignal(false);

  const myCart = createMutable({
    cart: cartStorage || ({ items: {}, region: 'USA' } as Cart),
    addProduct(addCartItem: AddCartItem) {
      if (this.cart.items[addCartItem.sku] !== undefined) {
        this.cart.items[addCartItem.sku].quantity += addCartItem.quantity;
      } else {
        this.cart.items[addCartItem.sku] = {
          colorID: addCartItem.colorID,
          sizeID: addCartItem.sizeID,
          productID: addCartItem.productID,
          quantity: addCartItem.quantity,
          itemGroupID: addCartItem.itemGroupID,
          slug: addCartItem.slug,
        };
      }
      if (!isServer) {
        localStorage.setItem('browniebits-cart', JSON.stringify(this.cart));
      }
      setCartCount((prev) => prev + addCartItem.quantity);
    },
    clear() {
      this.cart = { items: {}, region: 'USA' };
      if (!isServer) {
        localStorage.setItem('browniebits-cart', JSON.stringify(this.cart));
      }
      setCartCount(0);
    },
  });
  const value: ContextInterface = {
    slug: 'browniebits',
    theme: theme,
    storeInfo: storeInfo,
    collections: collections,
    cart: myCart,
    products: products,
    searchOpen: searchOpen,
    setSearchOpen: setSearchOpen,
    cartCount: cartCount,
    setCartCount: setCartCount,
  };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStoreInfo(): ContextInterface | undefined {
  return useContext(StoreContext);
}
