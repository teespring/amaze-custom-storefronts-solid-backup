import { For, Show } from 'solid-js';
import {
    Title,
    Meta,
  } from 'solid-start';
  import FixAssetPathUrl from '~/components/helpers/FixAssetPathUrl';
import { A } from '@solidjs/router';
import { HeroBannerContent } from '~/lib/typeDefs';
import styles from './heroBanner.module.scss';

export default function HeroBanner(props: {bannerContent?: HeroBannerContent}) {
    return (
        <div class={`hero ${styles.hero}`} >
          <Show when={props.bannerContent?.subtitle} fallback={<></>}>
            <span>{props.bannerContent?.subtitle}</span>
          </Show>
          <Show when={props.bannerContent?.title} fallback={<></>}>
            <h1>{props.bannerContent?.title}</h1>
          </Show>
          <Show when={props.bannerContent?.body} fallback={<></>}>
            <p>{props.bannerContent?.body}</p>
          </Show>
          <Show when={props.bannerContent?.ctaText} fallback={<></>}>
            <A href={`${props.bannerContent?.ctaLink ? props.bannerContent?.ctaLink : '/'}`} target={`${props.bannerContent?.ctaOpenInNewWindow ? '_blank' : '_self'}`}>
                {props.bannerContent?.ctaText}
            </A>
          </Show>
        </div>
    );
  }