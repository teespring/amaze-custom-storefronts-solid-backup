import { Show } from 'solid-js';
import { Title, Meta, Link } from 'solid-start';
import { useBrowserLocation } from 'solidjs-use';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';

export default function Home() {
  const location = useBrowserLocation();
  const hrefArray = location()
    .href?.replace(`${location().protocol}//`, '')
    .split('.');
  const subDomain = hrefArray ? hrefArray[0] : 'www';
  const { theme, storeInfo } = useStoreInfo()!;
  return (
    <main>
      <Title>{storeInfo()?.name}</Title>
      <Meta property="og:title" content={storeInfo()?.name} />
      <Meta
        property="og:image"
        content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
      />
      <Link rel="icon" href={FixAssetPathUrl(theme()?.content?.favicon!)} />
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <div class="hero">
          <img src={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}/>
        </div>
      </Show>
      <h1>Hello Home</h1>
    </main>
  );
}
