import { createResource, createSignal, For, Show, Suspense } from 'solid-js';
import { Title, Meta, RouteDataArgs, useRouteData } from 'solid-start';
import ProductCard from '~/components/cards/productCard';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import CollectionLoader from '~/components/loaders/CollectionLoader';
import NoCollection from '~/components/noCollection';
import { useStoreInfo, slug } from '~/lib/store';
import { ProductCollection } from '~/lib/typeDefs';
import styles from '../base.module.scss';


const fetchProducts = async (category: string) =>
  (
    await fetch(
      `https://commerce.teespring.com/v1/stores/products?collection=${category}&slug=${slug}&currency=USD&region=USA&per=150`
    )
  ).json();

export const routeData = ({ params }: RouteDataArgs) => {
  const [productCollection] = createResource<ProductCollection, string>(
    () => params.category,
    fetchProducts,
    {
      initialValue: {},
    }
  );
  return productCollection;
};

export default function CategoryPage() {
  const { theme, storeInfo } = useStoreInfo()!;
  const productCollection = useRouteData<typeof routeData>();
  const [fullProductInfo, setFullProductInfo] = createSignal(null);
  return (
    <Suspense fallback={<CollectionLoader />}>
      <Show when={productCollection().collection} fallback={<NoCollection />}>
        <main>
          <Title>
            {`${productCollection().collection} - ${storeInfo()?.name} Store`}
          </Title>
          <Meta
            property="og:title"
            content={`${productCollection().collection} - ${
              storeInfo()?.name
            } Store`}
          />
          <Meta
            property="twitter:title"
            content={`${productCollection().collection} - ${
              storeInfo()?.name
            } Store`}
          />
          <Meta property="og:site_name" content={storeInfo()?.name} />
          <Show
            when={theme()?.content?.heroBanner.containerBg}
            fallback={<></>}
          >
            <Meta
              property="og:image"
              content={FixAssetPathUrl(
                theme()?.content?.heroBanner.containerBg!
              )}
            />
            <Meta
              property="twitter:image"
              content={FixAssetPathUrl(
                theme()?.content?.heroBanner.containerBg!
              )}
            />
          </Show>

          <div class={styles.collectionPage}>
            <div class={styles.collectionTitle}>
              <h2>{productCollection().collection}</h2>
            </div>

            <Show
              when={productCollection().count && productCollection().count! > 0}
              fallback={<></>}
            >
              <div class={styles.productShelf}>
                <For each={productCollection()?.products}>
                  {(product) => <ProductCard product={product} />}
                </For>
              </div>
            </Show>
          </div>
        </main>
      </Show>
    </Suspense>
  );
}
