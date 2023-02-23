import { Show, Suspense } from 'solid-js';
import { Title, Meta, Link, A } from 'solid-start';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';

export default function AboutPage() {
  const { theme, storeInfo } = useStoreInfo()!;
  return (
    <Suspense>
    <main>
      <Title>{`About - ${storeInfo()?.name}`}</Title>
      <Meta property="og:title" content={`About - ${storeInfo()?.name}`} />
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <Meta
          property="og:image"
          content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
        />
      </Show>
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <div class="hero">
          <img
            src={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
            alt="Hero Banner"
          />
        </div>
      </Show>
      <h1>Hello About</h1>
      <Show when={theme()?.content?.footer.about.textContent} fallback={<></>}>
        <div class="hero">
          <p>{theme()?.content?.footer.about.textContent}</p>
        </div>
      </Show>
    </main>
    </Suspense>
  );
}