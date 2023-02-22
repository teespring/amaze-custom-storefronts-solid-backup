import { createResource, createContext, useContext, Resource, JSX } from 'solid-js';
import { useBrowserLocation } from 'solidjs-use';
import { ThemeInfo, StoreInfo, Collections } from './typeDefs';

const location = useBrowserLocation();
  const hrefArray = location()
    .href?.replace(`${location().protocol}//`, '')
    .split('.');
  const subDomain = hrefArray ? hrefArray[0] : 'www';
  console.log(location())
const fetchTheme = async () => (await fetch(`https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits`)).json();
const fetchStoreInfo = async () => (await fetch('https://commerce.teespring.com/v1/stores?slug=browniebits')).json();
const fetchCollections = async () => (await fetch('https://commerce.teespring.com/v1/stores/collections?slug=browniebits')).json();

interface ContextInterface {
    slug: string
    theme: Resource<ThemeInfo>, 
    storeInfo: Resource<StoreInfo>, 
    collections: Resource<Collections>
}
const StoreContext = createContext<ContextInterface>();

export function StoreProvider ( props: {children: JSX.Element} ) {
    const [theme] = createResource<ThemeInfo>(fetchTheme, { initialValue: {} });
    const [storeInfo] = createResource<StoreInfo>(fetchStoreInfo, { initialValue: {} });
    const [collections] = createResource<Collections>(fetchCollections, { initialValue: { storeId: 0, storeSlug: "browniebits", collections: []} });
    const value: ContextInterface = {
        slug: 'browniebits',
        theme: theme,
        storeInfo: storeInfo,
        collections: collections
    }
    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
}

export function useStoreInfo(): ContextInterface | undefined {
    return useContext(StoreContext);
}