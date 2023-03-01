import styles from './mainHeader.module.scss';
import { Show, For, Switch, Match } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { useStoreInfo } from '../../lib/store';
import FixAssetPathUrl from '../helpers/FixAssetPathUrl';

export default function MainHeader() {
  const location = useLocation();
  const { theme, storeInfo, collections, cart } = useStoreInfo()!;
  return (
    <>
      <Show when={location.pathname != '/checkout'} fallback={<></>}>
        <header class={`customHeader ${styles.header}`}>
          <A href="/">
            <div class={`customLogo ${styles.logo}`}>
              <Show
                when={theme()?.content && theme()?.content?.header.logo}
                fallback={<h1>{storeInfo()?.name}</h1>}
              >
                <img
                  src={FixAssetPathUrl(theme()?.content?.header.logo!)}
                  height="44px"
                />
              </Show>
            </div>
          </A>
          <nav class={`customNav ${styles.nav}`}>
            <For each={collections()?.collections}>
              {(collection) => {
                return (
                  <div class={`customNavItem ${styles.navItem}`}>
                    <A
                      class={`${
                        location.pathname == '/' + collection.slug
                          ? styles.selected
                          : ''
                      }`}
                      href={`/${collection.slug}`}
                    >
                      {collection.name}
                    </A>
                    <Show when={collection.collections}>
                    <div class={styles.subMenuBridge}/>
                    <div class={styles.subMenu}>
                      <For each={collection.collections}>
                      {(collection) => {
                        return <A class={`${
                          location.pathname == '/' + collection.slug
                            ? styles.selected
                            : ''
                        }`}
                        href={`/${collection.slug}`}>
                          {collection.name}
                          </A>
                      }}
                      </For>
                    </div>
                    </Show>
                    
                  </div>
                );
              }}
            </For>
            <Show
              when={theme()?.content?.footer.about.textContent}
              fallback={<></>}
            >
              <div class={`customNavItem ${styles.navItem}`}>
                <A
                  class={`${
                    location.pathname == '/about' ? styles.selected : ''
                  }`}
                  href={`/about`}
                >
                  About
                </A>
              </div>
            </Show>
          </nav>
          <div class={`customRightBar ${styles.rightBar}`}>
            <Show when={theme()} fallback={<></>}>
              <For each={theme()?.brand?.socialMedia}>
                {(social) => {
                  return (
                    <div class={`customSocialLink`}>
                      <A href={social.url!} target="_blank">
                        <Switch>
                          <Match when={social.id == 'youtube'}>
                          <i class={`fa-brands fa-youtube`} />
                          </Match>
                          <Match when={social.id == 'instagram'}>
                          <i class={`fa-brands fa-instagram`} />
                          </Match>
                          <Match when={social.id == 'website'}>
                          <i class={`fa-solid fa-link`} />
                          </Match>
                          <Match when={social.id == 'facebook'}>
                          <i class={`fa-brands fa-facebook`} />
                          </Match>
                          <Match when={social.id == 'twitter'}>
                          <i class={`fa-brands fa-twitter`} />
                          </Match>
                          <Match when={social.id == 'twitch'}>
                          <i class={`fa-brands fa-twitch`} />
                          </Match>
                          <Match when={social.id == 'discord'}>
                          <i class={`fa-brands fa-discord`} />
                          </Match>
                          <Match when={social.id == 'tiktok'}>
                          <i class={`fa-brands fa-tiktok`} />
                          </Match>
                        </Switch>
                      </A>
                    </div>
                  );
                }}
              </For>
            </Show>
            <A href="/Cart" class={`customCartIcon ${styles.cartIcon}`}>
              <i class="fa-solid fa-cart-shopping" />
              <Show when={cart.count > 0}>
                <span>{cart.count}</span>
              </Show>
            </A>
          </div>
        </header>
      </Show>
    </>
  );
}
