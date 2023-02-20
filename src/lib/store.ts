import { createResource } from 'solid-js';
import { ThemeInfo } from './typeDefs';

const fetchTheme = async () => {
  const themeResp = await fetch(
    `https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits`
  );
  const themeData: ThemeInfo = await themeResp.json();
  themeData.content.header.logo = themeData.content.header.logo.replace(
    '{{assetPath}}',
    `//premium-storefronts.s3.amazonaws.com/storefronts/browniebits/assets`
  );
  themeData.content.favicon = themeData.content.favicon.replace(
    '{{assetPath}}',
    `//premium-storefronts.s3.amazonaws.com/storefronts/browniebits/assets`
  );
  themeData.content.heroBanner.containerBg =
    themeData.content.heroBanner.containerBg.replace(
      '{{assetPath}}',
      `//premium-storefronts.s3.amazonaws.com/storefronts/browniebits/assets`
    );
    themeData.id = 'browniebits';
    console.log(themeData)
    return themeData
};

export const [theme] = createResource<ThemeInfo>(fetchTheme);
