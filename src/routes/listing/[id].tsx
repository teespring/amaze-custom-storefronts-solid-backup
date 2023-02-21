import { Show } from 'solid-js';
import { Title, Meta, useParams } from 'solid-start';
import CapitalizeFirstLetter from '~/components/helpers/CapitalizeFirstLets';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';

export default function ListingPage() {
  const params = useParams();
  const { theme, storeInfo } = useStoreInfo()!;
  return (
    <main>
      <Title>
        {`${CapitalizeFirstLetter(params.id)} - ${
          storeInfo()?.name
        } Store`}
      </Title>
      <Meta
        property="og:title"
        content={`${CapitalizeFirstLetter(params.id)} - ${
          storeInfo()?.name
        } Store`}
      />
      <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
        <Meta
          property="og:image"
          content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
        />
      </Show>

      <h1>Hello {CapitalizeFirstLetter(params.id)}</h1>
    </main>
  );
}