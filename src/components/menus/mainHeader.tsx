import styles from './mainHeader.module.scss';
import { Show, For } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { useStoreInfo } from '../../lib/store';
import FixAssetPathUrl from '../helpers/FixAssetPathUrl';

export default function MainHeader() {
  const location = useLocation();
  const { theme, storeInfo, collections } = useStoreInfo()!;
  return (
    <>
      <Show when={location.pathname != '/checkout'} fallback={<></>}>
        <header
          class={styles.header}
          style={`background:${
            theme()?.styles
              ? theme()?.styles?.header.bgStyles.backgroundColor
              : '#000000'
          }`}
        >
          <A href="/">
            <div class={styles.logo}>
              <Show
                when={theme()?.content && theme()?.content?.header.logo != ''}
                fallback={
                  <h1
                    style={`color:${
                      theme()?.styles
                        ? theme()?.styles?.header.textStyles.color
                        : '#000000'
                    }`}
                  >
                    {storeInfo()?.name}
                  </h1>
                }
              >
                <img
                  src={FixAssetPathUrl(theme()?.content?.header.logo!)}
                  height="44px"
                />
              </Show>
            </div>
          </A>
          <nav class={styles.nav}>
            <For each={collections()?.collections}>
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
                        theme()?.styles
                          ? theme()?.styles?.header.textStyles.color
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
          <div class={styles.rightBar}>
            <A href="/checkout" style={`color:${
                        theme()?.styles
                          ? theme()?.styles?.header.textStyles.color
                          : '#000000'
                      }`}>Checkout</A>
          </div>
        </header>
      </Show>
    </>
  );
}
