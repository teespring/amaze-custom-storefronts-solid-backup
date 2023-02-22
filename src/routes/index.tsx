import { createResource, Show, For } from 'solid-js';
import { Title, Meta, Link, A } from 'solid-start';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';
import { ProductCollection } from '~/lib/typeDefs';
import styles from './base.module.scss';

const fetchProducts = async () =>
  (
    await fetch(
      `https://commerce.teespring.com/v1/stores/products?slug=browniebits&currency=USD&region=USA`
    )
  ).json();

export default function Home() {
  const { slug, theme, storeInfo } = useStoreInfo()!;
  const [productCollection] = createResource<ProductCollection>(fetchProducts, {
    initialValue: {},
  });

  console.log(slug);
  return (
    <main>
      <Title>{storeInfo()?.name}</Title>
      <Meta property="og:title" content={storeInfo()?.name} />
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <Meta
          property="og:image"
          content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
        />
      </Show>
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <div class="hero">
          <img
            src={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
            alt="Hero Banner"
          />
        </div>
      </Show>
      <h1>Hello Home</h1>
      <Show
        when={productCollection().count && productCollection().count! > 0}
        fallback={<></>}
      >
        <div class={styles.productShelf}>
          <For each={productCollection()?.products}>
            {(product) => {
              return (
                <A href={`/${product.url}`}>
                  <img src={product.imageUrl} />
                  {product.name}
                </A>
              );
            }}
          </For>
        </div>
      </Show>
    </main>
  );
}
