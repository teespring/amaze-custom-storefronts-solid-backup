import { For, Show } from 'solid-js';
import {
    Title,
    Meta,
  } from 'solid-start';
  import { useStoreInfo } from '~/lib/store';
  import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { A } from '@solidjs/router';
export default function NoCollection() {
    const { theme, storeInfo, cart } = useStoreInfo()!;
    return (
        <main>
          <Title>
            {`Collection Not Found - ${storeInfo()?.name} Store`}
          </Title>
          <Meta
            property="og:title"
            content={`Collection Not Found - ${
              storeInfo()?.name
            } Store`}
          />
          <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
            <Meta
              property="og:image"
              content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
            />
          </Show>
          <h1>404</h1>
          <h2>Collection Not Found</h2>
          <p>Somehow you have come to a page that does not exist.</p>
          <A href="/">Go to Homepage</A>
        </main>
    );
  }