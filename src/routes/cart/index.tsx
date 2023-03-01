import { Show } from 'solid-js';
import { Title, Meta, A } from 'solid-start';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';

export default function CartPage() {
  const { theme, storeInfo, cart } = useStoreInfo()!;
  return (
    <main>
      <Title>{`Cart - ${storeInfo()?.name} Store`}</Title>
      <Meta property="og:title" content={`Cart - ${storeInfo()?.name} Store`} />
      <Meta property="twitter:title" content={`Cart - ${storeInfo()?.name} Store`} />
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

      <h1>Hello Cart {cart.total}</h1>
      <A href="/checkout">Checkout</A>
    </main>
  );
}
