export default async function GetStoreInfo(slug: string) {
  const storeInfoResp = await fetch(
    `https://commerce.teespring.com/v1/stores?slug=${slug}`
  );
  const collectionsInfoResp = await fetch(
    `https://commerce.teespring.com/v1/stores/collections?slug=${slug}`
  );
  const storeInfo = await storeInfoResp.json();
  const collectionsInfo = await collectionsInfoResp.json();
  return {
    name: storeInfo.name,
    slug: slug,
    collections: collectionsInfo.collections,
  };
}
