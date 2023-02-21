import { Suspense, Show, createResource } from 'solid-js';
import { Title, Meta, Link } from 'solid-start';
import { useBrowserLocation } from 'solidjs-use';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { ThemeInfo, StoreInfo } from '../lib/typeDefs';

const fetchTheme = async () =>
  (
    await fetch(
      'https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits'
    )
  ).json();
const fetchStore = async () =>
  (
    await fetch('https://commerce.teespring.com/v1/stores?slug=browniebits')
  ).json();

export default function Home() {
  const location = useBrowserLocation();
  const hrefArray = location()
    .href?.replace(`${location().protocol}//`, '')
    .split('.');
  const subDomain = hrefArray ? hrefArray[0] : 'www';
  const [theme] = createResource<ThemeInfo>(fetchTheme, { initialValue: {} });
  const [store] = createResource<StoreInfo>(fetchStore, { initialValue: {} });
  console.log(store());
  return (
    <main>
      <Title>{store().name}</Title>
      <Meta property="og:title" content={store().name} />
      <Meta
        property="og:image"
        content={FixAssetPathUrl(theme().content?.heroBanner.containerBg!)}
      />
      <Link rel="icon" href={FixAssetPathUrl(theme().content?.favicon!)} />
      <Show when={theme().content?.heroBanner.containerBg} fallback={<></>}>
        <div class="hero">
          <img src={FixAssetPathUrl(theme().content?.heroBanner.containerBg!)}/>
        </div>
      </Show>
      <h1>Hello Home</h1>
    </main>
  );
}
