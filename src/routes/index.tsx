import { Suspense,Show } from "solid-js";
import { 
  Title,
  createRouteData,
  RouteDataArgs,
  useRouteData,
  Meta,
  Link,
} from "solid-start";
import Counter from "~/components/Counter";
import CollectionLoader from "~/components/loaders/CollectionLoader";
import MainHeader from "~/components/menus/mainHeader";

export function routeData({ params } : RouteDataArgs) {
  return createRouteData(
    async key => {
      const storeInfoResp = await fetch(
        `https://commerce.teespring.com/v1/stores?slug=${key[0]}`
      );
      const themeInfoResp = await fetch(
        `https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=${key[0]}`
      );
      const collectionsInfoResp = await fetch(
        `https://commerce.teespring.com/v1/stores/collections?slug=${key[0]}`
      );
      const storeInfo = await storeInfoResp.json();
      const themeInfo = await themeInfoResp.json();
      const collectionsInfo = await collectionsInfoResp.json();
      console.log(themeInfo.content.header.logo)
      return ({
        name: storeInfo.name,
        slug: key[0],
        logo: themeInfo.content.header.logo ? themeInfo.content.header.logo.replace(
          '{{assetPath}}',
          `//premium-storefronts.s3.amazonaws.com/storefronts/${key[0]}/assets`
        ) : '',
        banner: themeInfo.content.heroBanner.containerBg.replace(
          '{{assetPath}}',
          `//premium-storefronts.s3.amazonaws.com/storefronts/${key[0]}/assets`
        ),
        styles: themeInfo.styles,
        collections: collectionsInfo.collections
      });
    },
    { key: () => ["browniebits"] }
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
          
          <h1>Hello world!</h1>
          <Counter />
          <p>
            Visit{" "}
            <a href="https://start.solidjs.com" target="_blank">
              start.solidjs.com
            </a>{" "}
            to learn how to build SolidStart apps.
          </p>
        </main>
      </Suspense>
    </>
  );
}
