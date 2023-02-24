import {
  createResource,
  createContext,
  useContext,
  Resource,
  JSX,
} from 'solid-js';
import { createMutable } from 'solid-js/store';
import { useBrowserLocation } from 'solidjs-use';
import { ThemeInfo, StoreInfo, Collections, Product } from './typeDefs';

const location = useBrowserLocation();
const hrefArray = location()
  .href?.replace(`${location().protocol}//`, '')
  .split('.');
const subDomain = hrefArray ? hrefArray[0] : 'www';
const fetchTheme = async () =>
  (
    await fetch(
      `https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits`
    )
  ).json();
const fetchStoreInfo = async () =>
  (
    await fetch('https://commerce.teespring.com/v1/stores?slug=browniebits')
  ).json();
const fetchCollections = async () =>
  (
    await fetch(
      'https://commerce.teespring.com/v1/stores/collections?slug=browniebits'
    )
  ).json();

interface ContextInterface {
  slug: string;
  theme: Resource<ThemeInfo>;
  storeInfo: Resource<StoreInfo>;
  collections: Resource<Collections>;
  cart: {
    products: Product[];
    readonly total: any;
    readonly count: any;
    addProduct(product: Product): void;
    clear(): void;
  };
}
const StoreContext = createContext<ContextInterface>();

export function StoreProvider(props: { children: JSX.Element }) {
  const [theme] = createResource<ThemeInfo>(fetchTheme, { initialValue: {} });
  const [storeInfo] = createResource<StoreInfo>(fetchStoreInfo, {
    initialValue: {},
  });
  const [collections] = createResource<Collections>(fetchCollections, {
    initialValue: { storeId: 0, storeSlug: 'browniebits', collections: [] },
  });
  const cart = createMutable({
    products: [] as Product[],
    get total() {
      return this.products.reduce(
        (total: number, product: Product) => total + Number(product.price?.replace('$', '')),
        0
      );
    },
    get count() {
      return this.products.length;
    },
    addProduct(product: Product) {
      this.products.push(product);
    //   window.localStorage.setItem('cart', JSON.stringify(this.products));
    },
    clear() {
      this.products = [];
    //   window.localStorage.setItem('cart', JSON.stringify(this.products));
    },
  });
  const value: ContextInterface = {
    slug: 'browniebits',
    theme: theme,
    storeInfo: storeInfo,
    collections: collections,
    cart: cart,
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
