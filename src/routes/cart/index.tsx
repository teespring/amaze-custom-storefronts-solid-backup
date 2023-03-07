import { A, Navigate } from '@solidjs/router';
import { createEffect, createMemo, createResource, createSignal, For, Show, Suspense } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Title, Meta, RouteDataArgs, useRouteData, refetchRouteData, redirect } from 'solid-start';
import CartLine from '~/components/cartItem';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';
import { CartItem, FullProduct } from '~/lib/typeDefs';
import styles from '../base.module.scss';
import cartStyles from './cart.module.scss';

const fetchProducts = async (cartProducts: Record<string, CartItem>) => {
  const promises =  Object.keys(cartProducts).map(async productID => (
    await fetch(
      `https://teespring.com/api/v1/listings?slug=${cartProducts[productID].slug}&productId=${cartProducts[productID].productID}`
    )
  ).json())
  return Promise.all(promises)
}

export const routeData = ({ params }: RouteDataArgs) => {
  const { cart } = useStoreInfo()!;
  const [cartCollection] = createResource<FullProduct[], Record<string, CartItem>>(
    () =>  cart.cart.items ,
    fetchProducts,
    {
      initialValue: [],
    }
  );
  return cartCollection;
};

export default function CartPage() {
  const [redirectLink, setRedirectLink] = createSignal('');
  const { theme, storeInfo, cart } = useStoreInfo()!;
  const cartCollection = useRouteData<typeof routeData>();

  const filteredProducts = createMemo(() => cartCollection().filter((product) => cart.cart.items[product.url!] !== undefined));
  const cartTotal = createMemo(() => filteredProducts().reduce((total, product) => total + (parseFloat(product.primaryProduct?.at(0)?.price!) * cart.cart.items[product.url!].quantity ), 0));
  
  function createCheckout() {
    let checkoutStorage = ''
    if (!isServer) {
      checkoutStorage = JSON.parse(localStorage.getItem('browniebits-checkout')!) || ('' as string);
    }
    console.log('mmm')
    setRedirectLink('/checkout')
  }

  return (
    <>
      <Show when={redirectLink() !== ''}>
        <Navigate href={redirectLink()} />
      </Show>
      <main>
        <Title>{`Cart - ${storeInfo()?.name} Store`}</Title>
        <Meta property="og:title" content={`Cart - ${storeInfo()?.name} Store`} />
        <Meta
          property="twitter:title"
          content={`Cart - ${storeInfo()?.name} Store`}
        />
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
        <div class={cartStyles.cartPage}>
          <div class={cartStyles.left}>
            <div class={styles.collectionTitle}>
              <h2>My Cart</h2>
            </div>
            <Suspense fallback={<CartLoader />}>
            <Show when={filteredProducts().length > 0} fallback={<p>No Products</p>}>
              <div class={cartStyles.cartItems}>
                <For each={filteredProducts()}>
                  {(item) => {
                    if (cart.cart.items[item.url!] === undefined) return <></>;
                    return <CartLine product={item} quantity={`${cart.cart.items[item.url!] ? cart.cart.items[item.url!].quantity : 0}`} />;
                  }}
                </For>
              </div>
            </Show>
            </Suspense>
          </div>
            <div class={cartStyles.right}>
              <div class={cartStyles.section}>
                <h4>Summary</h4>
                <div class={cartStyles.subtotal}>
                  <p>SubTotal</p>
                  <h3>${cartTotal().toFixed(2)}</h3>
                  <span>Shipping & taxes are calculated at checkout</span>
                </div>
                <div class={cartStyles.actionButtons}>
                  <button onClick={createCheckout}>Checkout</button>
                </div>
              </div>
            </div>
        </div>
      </main>
    </>
  );
}

function CartLoader() {
  return (
          <p>Updating Cart</p>
  );
}
