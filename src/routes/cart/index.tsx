import { A, Navigate } from '@solidjs/router';
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  Show,
  Suspense,
} from 'solid-js';
import { isServer } from 'solid-js/web';
import {
  Title,
  Meta,
  RouteDataArgs,
  useRouteData,
  refetchRouteData,
  redirect,
} from 'solid-start';
import CartLine from '~/components/cartItem';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';
import { CartItem, FullProduct } from '~/lib/typeDefs';
import styles from '../base.module.scss';
import cartStyles from './cart.module.scss';

const fetchProducts = async (cartProducts: Record<string, CartItem>) => {
  const promises = Object.keys(cartProducts).map(async (productID) =>
    (
      await fetch(
        `https://teespring.com/api/v1/listings?slug=${cartProducts[productID].slug}&productId=${cartProducts[productID].productID}`
      )
    ).json()
  );
  return Promise.all(promises);
};

export const routeData = ({ params }: RouteDataArgs) => {
  const { cart } = useStoreInfo()!;
  const [cartCollection] = createResource<
    FullProduct[],
    Record<string, CartItem>
  >(() => cart.cart.items, fetchProducts, {
    initialValue: [],
  });
  return cartCollection;
};

export default function CartPage() {
  const [redirectLink, setRedirectLink] = createSignal('');
  const { theme, storeInfo, cart } = useStoreInfo()!;
  const cartCollection = useRouteData<typeof routeData>();

  const filteredProducts = createMemo(() =>
    cartCollection().filter(
      (product) => cart.cart.items[product.url!] !== undefined
    )
  );
  const cartTotal = createMemo(() =>
    filteredProducts().reduce(
      (total, product) =>
        total +
        parseFloat(product.primaryProduct?.at(0)?.price!) *
          cart.cart.items[product.url!].quantity,
      0
    )
  );

  const createCheckout = async () => {
    let checkoutStorage = '';
    if (!isServer) {
      checkoutStorage =
        JSON.parse(localStorage.getItem('browniebits-checkout')!) ||
        ('' as string);
    }
    console.log('mmm');
    // if (checkoutStorage !== '') {
    //   const res = await fetch(`https://checkouts.spri.ng/checkout`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       id: checkoutStorage,
    //       data: payload,
    //     }),
    //   });
    // } else {
    //   const res = await fetch(`https://checkouts.spri.ng/checkout`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       lineItems,
    //       storeSlug: slug,
    //       trafficSource,
    //       affiliate,
    //     }),
    //   });
    // }
    setRedirectLink('/checkout');
  };

  return (
    <>
      <Show when={redirectLink() !== ''}>
        <Navigate href={redirectLink()} />
      </Show>
      <main>
        <Title>{`Cart - ${storeInfo()?.name} Store`}</Title>
        <Meta
          property="og:title"
          content={`Cart - ${storeInfo()?.name} Store`}
        />
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
              <Show
                when={filteredProducts().length > 0}
                fallback={<p>No Products</p>}
              >
                <div class={cartStyles.cartItems}>
                  <For each={filteredProducts()}>
                    {(item) => {
                      if (cart.cart.items[item.url!] === undefined)
                        return <></>;
                      return (
                        <CartLine
                          product={item}
                          quantity={`${
                            cart.cart.items[item.url!]
                              ? cart.cart.items[item.url!].quantity
                              : 0
                          }`}
                        />
                      );
                    }}
                  </For>
                </div>
              </Show>
            </Suspense>
          </div>
          <div class={cartStyles.right}>
            <div class={cartStyles.section}>
              <h4>Summary</h4>
              <div class={cartStyles.surround}>
                <div class={cartStyles.subtotal}>
                  <p>SubTotal</p>
                  <h3>${cartTotal().toFixed(2)}</h3>
                  <span>Shipping & taxes are calculated at checkout</span>
                </div>
                <div class={cartStyles.actionButtons}>
                  <button
                    class={cartStyles.mainCheckout}
                    onClick={createCheckout}
                  >
                    Checkout
                  </button>
                  <button
                    class={cartStyles.paypalCheckout}
                    onClick={createCheckout}
                  >
                    <img
                      src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                      class=""
                      alt="PayPal"
                    />
                  </button>
                  <button
                    class={cartStyles.afterpayCheckout}
                    onClick={createCheckout}
                  >
                    <img
                      src="https://teespring-ass.s3.amazonaws.com/branded_stores/images/Afterpay.svg"
                      class=""
                      alt="Afterpay"
                    />
                  </button>
                </div>
                <div class={cartStyles.guarantee}>
                  <p>
                    <span>
                      <i class="fa-solid fa-square-check" />
                    </span>{' '}
                    30 Day Free Return Policy.{' '}
                    <A
                      href="https://sprisupport.zendesk.com/hc/en-us/articles/12171053036685-Returns-And-Cancellations"
                      target="_blank"
                    >
                      Learn more
                    </A>
                  </p>
                </div>
              </div>
              <div class={cartStyles.promoCode}>
                <p>Do you have a promo code?</p>
                <span>Enter it at the next step.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function CartLoader() {
  return <p>Updating Cart</p>;
}
