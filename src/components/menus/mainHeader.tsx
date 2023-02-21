import styles from './mainHeader.module.scss';
import { Show, For, Suspense, createResource } from "solid-js";
import { A, useLocation } from "solid-start";
// import { theme } from '../../lib/store';
import { ThemeInfo } from '../../lib/typeDefs';
import MainHeaderLoading from './mainHeaderLoading';
import LogoImage from '../logoImage';

const fetchTheme = async () => (await fetch('https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits')).json();

export default function MainHeader ( ) {
    const location = useLocation();
    const [theme] = createResource<ThemeInfo>(fetchTheme,
        {
            initialValue: {
              content: {
                about: { aboutText: [] },
                categories: [],
                favicon: '',
                footer: {
                  about: { textContent: '' },
                  newsletter: false,
                  showSocialIcons: false,
                },
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
          });

          console.log(theme().content.header.logo)
    return (
        <>
            <Show 
            when={location.pathname != '/checkout'}
            fallback={<></>}
            >
                
                <header class={styles.header} style={`background:#000000`}>
                    <A href="/">
                        <div class={styles.logo}>
                            <Show 
                            when={theme()?.content.header.logo != ''}
                            fallback={<h1 style={`color:${[theme()?.styles.header.textStyles.color]}`}>Brownie Bits</h1>}>
                                <LogoImage url={theme()?.content.header.logo}  />
                            </Show>
                        </div>
                    </A>
                    <nav class={styles.nav}>
                        
                    {/* <For each={props.collections}>
                        {collection => {
                            return <li>
                            <A href={`/${collection.name}`}>
                            {collection.name}
                            </A>
                            </li>
                        }}
                    </For> */}
                    </nav>
                </header>
            </Show>
        </>
    )
}
