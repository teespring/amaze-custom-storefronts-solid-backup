import { Show } from 'solid-js';
import { Title, Meta, A } from 'solid-start';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';

export default function CheckoutPage() {
  const { theme, storeInfo } = useStoreInfo()!;
  return (
    <main>
      <Title>{`Checkout - ${storeInfo()?.name} Store`}</Title>
      <Meta
        property="og:title"
        content={`Checkout - ${storeInfo()?.name} Store`}
      />
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <Meta
          property="og:image"
          content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
        />
      </Show>

      <h1>Hello Checkout</h1>
      <A href="/cart">Back to Cart</A>
    </main>
  );
}
