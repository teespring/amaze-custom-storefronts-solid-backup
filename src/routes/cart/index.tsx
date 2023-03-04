import { For, Show } from 'solid-js';
import { Title, Meta, A } from 'solid-start';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';
import styles from '../base.module.scss';
import cartStyles from './cart.module.scss';

export default function CartPage() {
  const { theme, storeInfo, cart, cartCount } = useStoreInfo()!;
  return (
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
          <Show when={cartCount() > 0} fallback={<p>No Products</p>}>
            <For each={Object.keys(cart.cart.items)}>
              {(item) => {
                return (
                  <p>{cart.cart.items[item].slug}</p>
                )
              }}
            </For>
          </Show>
          
        </div>
        <Show when={cartCount() > 0} fallback={<></>}>
          <div class={cartStyles.right}>
            <div class={cartStyles.section}>
              <h4>Summary</h4>
            </div>
            <button onClick={cart.clear}>Clear Cart</button>
          </div>
        </Show>
      </div>
    </main>
  );
}
