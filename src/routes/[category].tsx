import { createMemo, createResource, For, Show } from 'solid-js';
import {
  Title,
  Meta,
  RouteDataArgs,
  useRouteData,
} from 'solid-start';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import NoCollection from '~/components/noCollection';
import { useStoreInfo } from '~/lib/store';
import { ProductCollection } from '~/lib/typeDefs';
import styles from './base.module.scss';

const fetchProducts = async (category: string) =>
  (
    await fetch(
      `https://commerce.teespring.com/v1/stores/products?collection=${category}&slug=browniebits&currency=USD&region=USA&per=150`
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
  const { theme, storeInfo, cart } = useStoreInfo()!;
  const productCollection = useRouteData<typeof routeData>();
  createMemo(() => {
    console.log(productCollection())
  })
  return (
    <Show when={productCollection().collection} fallback={<NoCollection/>}>
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
        <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
          <Meta
            property="og:image"
            content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
          />
        </Show>
        <h1>{productCollection().collection} Collection</h1>
        <Show
          when={productCollection().count && productCollection().count! > 0}
          fallback={<></>}
        >
          <div class={styles.productShelf}>
            <For each={productCollection()?.products}>
              {(product) => {
                return (
                  <div>
                    <img src={product.imageUrl} alt={product.name} />
                    {product.name}
                    {product.price}
                    <button
                      onClick={() => {
                        cart.addProduct(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  // <A href={`/listing${product.url}`}>
                  //   <img src={product.imageUrl} alt={product.name} />
                  //   {product.name}
                  //   <button onClick={() => {cart.addProduct(product)}}>Add to Cart</button>
                  // </A>
                );
              }}
            </For>
          </div>
        </Show>
      </main>
    </Show>
  );
}
