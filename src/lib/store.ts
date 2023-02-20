import { createSignal, createResource } from 'solid-js';
import { StoreInfo, ThemeInfo } from './typeDefs';

export const [themeInfo] = createResource<ThemeInfo>(
  () =>
    fetch(
      `https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits`
    ).then((res) => res.json())
    .then((resp) => {
        const theme = resp;
        theme.content.header.logo = theme.content.header.logo.replace(
            '{{assetPath}}',
            `//premium-storefronts.s3.amazonaws.com/storefronts/browniebits/assets`
          );
        theme.content.favicon = theme.content.favicon.replace(
        '{{assetPath}}',
        `//premium-storefronts.s3.amazonaws.com/storefronts/browniebits/assets`
        );
        theme.content.heroBanner.containerBg = theme.content.heroBanner.containerBg.replace(
            '{{assetPath}}',
            `//premium-storefronts.s3.amazonaws.com/storefronts/browniebits/assets`
            );
        return theme;
    }),
  {
    initialValue: {
      content: {
        about: { aboutText: [] },
        categories: [],
        favicon: '',
        footer: { about: { textContent: '' }, newsletter: false, showSocialIcons: false },
        header: {
          customLinks: [],
          hideSearch: false,
          logo: '',
          showAbout: false,
          showCategories: false,
          showSocialIcons: false,
        },
        heroBanner: {
          body: '',
          containerBg: '',
          ctaLink: '',
          ctaOpenInNewWindow: false,
          ctaText: '',
          subtitle: '',
          title: '',
        },
      },
      storeKey: '',
      userId: 0,
      meta: {
        logoHeight: '',
        primaryColor: '',
        searchOptions: { placeholder: '' },
        seoTitle: {},
        storeId: '',
        storeName: '',
      },
      brand: { socialMedia: [] },
      layout: { productList: { grid: '' }, heroBanner: { type: 0 } },
      styles: {
        about: { bgStyles: {}, textStyles: {} },
        button: {
          primary: {
            color: '',
            backgroundColor: '',
            borderColor: '',
          },
          secondary: {
            color: '',
            backgroundColor: '',
            borderColor: '',
          },
        },
        customCSS: '',
        fonts: [],
        footer: {
          bgStyles: { backgroundColor: '' },
          template: 0,
          textStyles: { color: '' },
        },
        header: {
          bgStyles: { backgroundColor: '' },
          logo: { maxHeight: '' },
          template: 0,
          textStyles: { color: '' },
        },
        heroBanner: {
          bgStyles: { backgroundColor: '' },
          ctaBtnStyles: { backgroundColor: '', color: '' },
          template: 0,
          textStyles: { color: '' },
        },
        linkStyles: { color: '', textDecoration: '' },
        listing: { bgStyles: {}, textStyles: {} },
        modal: { overlayColor: '', closeButtonColor: '' },
        primaryColor: '',
        productList: { titleStyles: {} },
        search: {
          textStyles: {},
          bgStyles: {},
          titleStyles: {},
          closeBtnStyles: {},
        },
        typography: {
          bodyFontFamily: '',
          headingFontFamily: '',
          h1: {
            letterSpacing: '',
            fontSize: '',
            fontWeight: '',
            textTransform: '',
          },
          h2: {
            letterSpacing: '',
            fontSize: '',
            fontWeight: '',
            textTransform: '',
          },
          h3: {
            letterSpacing: '',
            fontSize: '',
            fontWeight: '',
            textTransform: '',
          },
          h4: {
            letterSpacing: '',
            fontSize: '',
            fontWeight: '',
            textTransform: '',
          },
          h5: {
            letterSpacing: '',
            fontSize: '',
            fontWeight: '',
            textTransform: '',
          },
          h6: {
            letterSpacing: '',
            fontSize: '',
            fontWeight: '',
            textTransform: '',
          },
        },
      },
    },
  }
);
