import styles from './mainHeader.module.scss';
import { Show, For, Suspense, createResource } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { ThemeInfo, Collections } from '../../lib/typeDefs';
import LogoImage from '../logoImage';

const fetchTheme = async () =>
  (
    await fetch(
      'https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits'
    )
  ).json();
const fetchCollections = async () =>
  (
    await fetch(
      'https://commerce.teespring.com/v1/stores/collections?slug=browniebits'
    )
  ).json();

export default function MainHeader() {
  const location = useLocation();
  const [theme] = createResource<ThemeInfo>(fetchTheme, { initialValue: {} });
  const [collections] = createResource<Collections>(fetchCollections, {
    initialValue: { storeId: 0, storeSlug: '', collections: [] },
  });
  return (
    <>
      <Show when={location.pathname != '/checkout'} fallback={<></>}>
        <header
          class={styles.header}
          style={`background:${
            theme().styles
              ? theme().styles?.header.bgStyles.backgroundColor
              : '#000000'
          }`}
        >
          <A href="/">
            <div class={styles.logo}>
              <Show
                when={theme().content && theme().content?.header.logo != ''}
                fallback={
                  <h1
                    style={`color:${
                      theme().styles
                        ? theme().styles?.header.textStyles.color
                        : '#000000'
                    }`}
                  >
                    Brownie Bits
                  </h1>
                }
              >
                <LogoImage url={theme().content?.header.logo} />
              </Show>
            </div>
          </A>
          <nav class={styles.nav}>
            <For each={collections().collections}>
              {(collection) => {
                return (
                  <li>
                    <A
                      class={`${
                        location.pathname == '/' + collection.slug
                          ? styles.selected
                          : ''
                      }`}
                      href={`/${collection.slug}`}
                      style={`color:${
                        theme().styles
                          ? theme().styles?.header.textStyles.color
                          : '#000000'
                      }`}
                    >
                      {collection.name}
                    </A>
                  </li>
                );
              }}
            </For>
          </nav>
          <div class={styles.rightBar}></div>
        </header>
      </Show>
    </>
  );
}
