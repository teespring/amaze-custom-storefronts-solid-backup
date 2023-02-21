import { Title, Meta, useParams } from 'solid-start';
import CapitalizeFirstLetter from '~/components/helpers/CapitalizeFirstLets';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';

export default function CategoryPage() {
  const params = useParams();
  const { theme, storeInfo } = useStoreInfo()!;
  return (
    <main>
      <Title>
        {`${CapitalizeFirstLetter(params.category)} - ${
          storeInfo()?.name
        } Store`}
      </Title>
      <Meta
        property="og:title"
        content={`${CapitalizeFirstLetter(params.category)} - ${
          storeInfo()?.name
        } Store`}
      />
      <Meta
        property="og:image"
        content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
      />

      <h1>Hello {CapitalizeFirstLetter(params.category)}</h1>
    </main>
  );
}
