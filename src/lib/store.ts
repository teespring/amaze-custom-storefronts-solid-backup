import { createResource } from 'solid-js';
import { ThemeInfo } from './typeDefs';

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
          bgStyles: { backgroundColor: '#000000' },
          logo: { maxHeight: '44px' },
          template: 0,
          textStyles: { color: '#ffffff' },
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
          bodyFontFamily: 'Muli, sans-serif',
          headingFontFamily: 'Roboto Condensed, sans-serif',
          h1: {
            letterSpacing: '0.02em',
            fontSize: '4.2rem',
            fontWeight: '700',
            textTransform: 'Uppercase',
          },
          h2: {
            letterSpacing: '0.02em',
            fontSize: '2.8rem',
            fontWeight: '400',
            textTransform: 'Uppercase',
          },
          h3: {
            letterSpacing: '0.02em',
            fontSize: '2.4rem',
            fontWeight: '400',
            textTransform: 'Uppercase',
          },
          h4: {
            letterSpacing: '0.02em',
            fontSize: '2.8rem',
            fontWeight: '400',
            textTransform: 'Uppercase',
          },
          h5: {
            letterSpacing: '0.02em',
            fontWeight: '400',
            textTransform: 'Uppercase',
          },
          h6: {
            letterSpacing: '0.02em',
            fontWeight: '400',
            textTransform: 'Uppercase',
          },
        },
      },
    },
  }
);
