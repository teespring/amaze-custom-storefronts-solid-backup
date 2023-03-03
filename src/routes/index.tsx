import { createResource, Show, For } from 'solid-js';
import {
  Title,
  Meta,
  Link,
  A,
  createRouteData,
  RouteDataArgs,
} from 'solid-start';
import ProductCard from '~/components/cards/productCard';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import HeroBanner from '~/components/heroBanner';
import { useStoreInfo } from '~/lib/store';
import { ProductCollection } from '~/lib/typeDefs';
import styles from './base.module.scss';

const fetchProducts = async () =>
  (
    await fetch(
      `https://commerce.teespring.com/v1/stores/products?slug=browniebits&currency=USD&region=USA&per=150`
    )
  ).json();

export default function Home() {
  const { slug, theme, storeInfo, cart } = useStoreInfo()!;
  const [productCollection] = createResource<ProductCollection>(fetchProducts, {
    initialValue: {},
  });

  return (
    <main>
      <Title>{storeInfo()?.name}</Title>
      <Meta property="og:title" content={storeInfo()?.name} />
      <Meta property="twitter:title" content={storeInfo()?.name} />
      <Meta property="og:site_name" content={storeInfo()?.name} />
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <Meta
          property="og:image"
          content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
        />
        <Meta
          property="twitter:image"
          content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
        />
      </Show>
      <Show
        when={
          theme()?.content?.heroBanner.containerBg ||
          theme()?.content?.heroBanner.body ||
          theme()?.content?.heroBanner.title ||
          theme()?.content?.heroBanner.subtitle ||
          theme()?.content?.heroBanner.ctaText
        }
        fallback={<></>}
      >
        <HeroBanner bannerContent={theme()?.content?.heroBanner} />
      </Show>
      <Show
        when={productCollection().count && productCollection().count! > 0}
        fallback={<></>}
      >
        <div class={styles.collectionPage}>
          <div class={styles.collectionTitle}>
            <h2>Featured Products</h2>
          </div>
          <div class={styles.productShelf}>
            <For each={productCollection()?.products}>
              {(product) => <ProductCard product={product} />}
            </For>
          </div>
        </div>
      </Show>
    </main>
  );
}
