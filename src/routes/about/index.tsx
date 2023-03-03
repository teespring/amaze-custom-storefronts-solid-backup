import { Show, Suspense, For, Switch, Match } from 'solid-js';
import { Title, Meta, A } from 'solid-start';
import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import HeroBanner from '~/components/heroBanner';
import { useStoreInfo } from '~/lib/store';
import styles from '../base.module.scss';
import aboutStyles from './about.module.scss';

export default function AboutPage() {
  const { theme, storeInfo } = useStoreInfo()!;
  return (
    <Suspense>
      <main>
        <Title>{`About - ${storeInfo()?.name}`}</Title>
        <Meta property="og:title" content={`About - ${storeInfo()?.name}`} />
        <Meta
          property="twitter:title"
          content={`About - ${storeInfo()?.name}`}
        />
        <Meta property="og:site_name" content={storeInfo()?.name} />
        <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
          <Meta
            property="og:image"
            content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
          />
          <Meta
            property="twitter:image"
            content={FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!)}
          />
        </Show>
        <Show when={theme()?.content?.heroBanner.containerBg} fallback={<></>}>
          <HeroBanner />
        </Show>
        <div class={aboutStyles.aboutPage}>
          <div class={aboutStyles.left}>
            <div class={styles.collectionTitle}>
              <h2>About</h2>
            </div>
            <Show
              when={theme()?.content?.footer.about.textContent}
              fallback={<></>}
            >
              <div class={aboutStyles.section}>
                <p>{theme()?.content?.footer.about.textContent}</p>
              </div>
            </Show>
          </div>
          <Show
            when={theme()?.brand?.socialMedia?.length! > 0}
            fallback={<></>}
          >
            <div class={aboutStyles.right}>
              <div class={aboutStyles.section}>
                <h4>Links</h4>
                <div class={aboutStyles.break}></div>
                <div class={aboutStyles.socialLinks}>
                  <For each={theme()?.brand?.socialMedia}>
                    {(social) => {
                      return (
                        <div class={aboutStyles.socialLink}>
                          <A href={social.url!} target="_blank">
                            <Switch>
                              <Match when={social.id == 'youtube'}>
                                <i class={`fa-brands fa-youtube`} /> Youtube
                              </Match>
                              <Match when={social.id == 'instagram'}>
                                <i class={`fa-brands fa-instagram`} /> Instagram
                              </Match>
                              <Match when={social.id == 'website'}>
                                <i class={`fa-solid fa-link`} /> Website
                              </Match>
                              <Match when={social.id == 'facebook'}>
                                <i class={`fa-brands fa-facebook`} /> Facebook
                              </Match>
                              <Match when={social.id == 'twitter'}>
                                <i class={`fa-brands fa-twitter`} /> Twitter
                              </Match>
                              <Match when={social.id == 'twitch'}>
                                <i class={`fa-brands fa-twitch`} /> Twitch
                              </Match>
                              <Match when={social.id == 'discord'}>
                                <i class={`fa-brands fa-discord`} /> Discord
                              </Match>
                              <Match when={social.id == 'tiktok'}>
                                <i class={`fa-brands fa-tiktok`} /> TikTok
                              </Match>
                            </Switch>
                          </A>
                        </div>
                      );
                    }}
                  </For>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </main>
    </Suspense>
  );
}
