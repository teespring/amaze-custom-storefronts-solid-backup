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
                  <div class={styles.navItem}>
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
                  </div>
                );
              }}
            </For>
            <Show
              when={theme()?.content?.footer.about.textContent}
              fallback={<></>}
            >
              <div class={styles.navItem}>
                <A
                  class={`${
                    location.pathname == '/about' ? styles.selected : ''
                  }`}
                  href={`/about`}
                  style={`color:${
                    theme()?.styles
                      ? theme()?.styles?.header.textStyles.color
                      : '#000000'
                  }`}
                >
                  About
                </A>
              </div>
            </Show>
          </nav>
          <div class={styles.rightBar}>
            <Show when={theme()} fallback={<></>}>
              <For each={theme()?.brand?.socialMedia}>
                {(social) => {
                  return (
                    <div class={styles.socialLink}>
                      <A
                        href={social.url!}
                        target="_blank"
                        style={`color:${
                          theme()?.styles
                            ? theme()?.styles?.header.textStyles.color
                            : '#000000'
                        }`}
                      >
                        <Show when={social.id == 'youtube'} fallback={<></>}>
                          <i
                            class={`fa-brands fa-youtube`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                        <Show when={social.id == 'instagram'} fallback={<></>}>
                          <i
                            class={`fa-brands fa-instagram`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                        <Show when={social.id == 'website'} fallback={<></>}>
                          <i
                            class={`fa-solid fa-link`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                        <Show when={social.id == 'facebook'} fallback={<></>}>
                          <i
                            class={`fa-brands fa-facebook`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                        <Show when={social.id == 'twitter'} fallback={<></>}>
                          <i
                            class={`fa-brands fa-twitter`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                        <Show when={social.id == 'twitch'} fallback={<></>}>
                          <i
                            class={`fa-brands fa-twitch`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                        <Show when={social.id == 'discord'} fallback={<></>}>
                          <i
                            class={`fa-brands fa-discord`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                        <Show when={social.id == 'tiktok'} fallback={<></>}>
                          <i
                            class={`fa-brands fa-tiktok`}
                            style={`color:${
                              theme()?.styles
                                ? theme()?.styles?.header.textStyles.color
                                : '#000000'
                            }`}
                          />
                        </Show>
                      </A>
                    </div>
                  );
                }}
              </For>
            </Show>
            <A
              href="/Cart"
              class={styles.cartButton}
              style={`color:${
                theme()?.styles
                  ? theme()?.styles?.header.textStyles.color
                  : '#000000'
              }`}
            >
              <i
                class="fa-solid fa-cart-shopping"
                style={`color:${
                  theme()?.styles
                    ? theme()?.styles?.header.textStyles.color
                    : '#000000'
                }`}
              />
              <span>0</span>
            </A>
          </div>
        </header>
      </Show>
    </>
  );
}
