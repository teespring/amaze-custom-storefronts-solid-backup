import { Suspense,Show } from "solid-js";
import { 
  Title,
  createRouteData,
  RouteDataArgs,
  useRouteData,
  Meta,
  Link,
} from "solid-start";
import CollectionLoader from "~/components/loaders/CollectionLoader";
import MainHeader from "~/components/menus/mainHeader";
import GetStoreInfo from "~/lib/getStoreInfo";
import { useBrowserLocation } from 'solidjs-use'

export function routeData({ params } : RouteDataArgs) {
  console.log(params)
  const location = useBrowserLocation()
  console.log('Location',location())
  const hrefArray = location().href?.replace(`${location().protocol}//`,'').split('.');
  const subDomain = hrefArray ? hrefArray[0] : 'www';
  const slug = process.env.STORE_SLUG ? process.env.STORE_SLUG : subDomain;
  return createRouteData(
    async key => GetStoreInfo(key[0]),
    { key: () => [slug] }
  );
}

export default function Home() {
  
  const storeInfo = useRouteData<typeof routeData>();
  return (
    <>
      <span style="display:none">{storeInfo()?.name}</span>
      <Suspense fallback={<CollectionLoader/>}>
        <main>
          <Title>{storeInfo()?.name}</Title>
          <Meta property="og:title" content={storeInfo()?.name} />
          <Meta
            property="og:image"
            content={storeInfo()?.banner}
          />
          <Link
            rel="icon"
            href={storeInfo()?.logo}
          />
          <Show when={storeInfo()}>
            <MainHeader logo={storeInfo()?.logo} styles={storeInfo()?.styles.header} storeName={storeInfo()?.name} collections={storeInfo()?.collections}/>
          </Show>
          
          <h1>Hello Home!</h1>
        </main>
      </Suspense>
    </>
  );
}
