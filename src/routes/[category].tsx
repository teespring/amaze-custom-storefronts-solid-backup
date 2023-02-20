import { Suspense,Show } from "solid-js";
import { 
  Title,
  createRouteData,
  RouteDataArgs,
  useRouteData,
  Meta,
  Link,
  useParams
} from "solid-start";
import CapitalizeFirstLetter from "~/components/helpers/CapitalizeFirstLets";
import CollectionLoader from "~/components/loaders/CollectionLoader";
import GetStoreInfo from "~/lib/getStoreInfo";

export function routeData({ params } : RouteDataArgs) {
  return createRouteData(
    async key => GetStoreInfo(key[0]),
    { key: () => ["browniebits"] }
  );
}

export default function CategoryPage() {
    const params = useParams();
    const storeInfo = useRouteData<typeof routeData>();
  return (
    <>
      <span style="display:none">{storeInfo()?.name}</span>
      <Suspense fallback={<CollectionLoader/>}>
        <main>
          <Title>{CapitalizeFirstLetter(params.category)} Collection</Title>
          <Meta property="og:title" content={CapitalizeFirstLetter(params.category)} />
          {/* <Meta
            property="og:image"
            content={storeInfo()?.banner}
          />
          <Link
            rel="icon"
            href={storeInfo()?.logo}
          /> */}
          
          <h1>Hello {CapitalizeFirstLetter(params.category)}</h1>
        </main>
      </Suspense>
    </>
  );
}