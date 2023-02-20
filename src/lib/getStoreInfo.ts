export default async function GetStoreInfo(slug: string) {
  const storeInfoResp = await fetch(
    `https://commerce.teespring.com/v1/stores?slug=${slug}`
  );
  const themeInfoResp = await fetch(
    `https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=${slug}`
  );
  const collectionsInfoResp = await fetch(
    `https://commerce.teespring.com/v1/stores/collections?slug=${slug}`
  );
  const storeInfo = await storeInfoResp.json();
  const themeInfo = await themeInfoResp.json();
  const collectionsInfo = await collectionsInfoResp.json();
  console.log(themeInfo.content.header.logo);
  return {
    name: storeInfo.name,
    slug: slug,
    logo: themeInfo.content.header.logo
      ? themeInfo.content.header.logo.replace(
          '{{assetPath}}',
          `//premium-storefronts.s3.amazonaws.com/storefronts/${slug}/assets`
        )
      : '',
    banner: themeInfo.content.heroBanner.containerBg.replace(
      '{{assetPath}}',
      `//premium-storefronts.s3.amazonaws.com/storefronts/${slug}/assets`
    ),
    styles: themeInfo.styles,
    collections: collectionsInfo.collections,
  };
}
