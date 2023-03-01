import { createMemo, createResource, Show } from 'solid-js';
import {
  Title,
  Meta,
  useParams,
  RouteDataArgs,
  useRouteData,
  useSearchParams,
} from 'solid-start';
import CapitalizeFirstLetter from '~/components/helpers/CapitalizeFirstLets';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { useStoreInfo } from '~/lib/store';
import { FullProduct } from '~/lib/typeDefs';

interface FetchObject {
  slug: string;
  currency?: string;
  region?: string;
  countryCode?: string;
  productID?: string;
}
const fetchProduct = async (props: FetchObject) => {
  const currency = props.currency ? `&currency=${props.currency}` : '';
  const region = props.region ? `&region=${props.region}` : '';
  const countryCode = props.countryCode
    ? `&country_code=${props.countryCode}`
    : '';
  const productID = props.productID ? `&productId=${props.productID}` : '';
  console.log(props.slug, currency, region, countryCode, productID);
  return (
    await fetch(
      `https://teespring.com/api/v1/listings?slug=${props.slug}${currency}${region}${countryCode}${productID}`
    )
  ).json();
};

export const routeData = ({ params }: RouteDataArgs) => {
  const { storeInfo } = useStoreInfo()!;
  const [searchParams] = useSearchParams();
  const fetchData: FetchObject = {
    slug: params.id,
    productID: searchParams.product,
  };
  const [product] = createResource<FullProduct, FetchObject>(
    () => fetchData,
    fetchProduct,
    {
      initialValue: {},
    }
  );
  return product;
};

export default function ListingPage() {
  const { storeInfo } = useStoreInfo()!;
  const product = useRouteData<typeof routeData>();

  return (
    <main>
      <Title>{`${product().title} - ${storeInfo()?.name} Store`}</Title>
      <Meta
        property="og:title"
        content={`${product().title} - ${storeInfo()?.name} Store`}
      />
      <Show when={product().images} fallback={<></>}>
        <Meta property="og:image" content={product().images?.at(0)?.src!} />
      </Show>

      <h1>{product().title}</h1>
    </main>
  );
}
