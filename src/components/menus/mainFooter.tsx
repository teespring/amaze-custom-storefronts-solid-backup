import styles from './mainFooter.module.scss';
import { Show, For } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { useStoreInfo } from '../../lib/store';
import FixAssetPathUrl from '../helpers/FixAssetPathUrl';

export default function MainFooter() {
  const location = useLocation();
  const { theme, storeInfo, collections } = useStoreInfo()!;
  return (
    <>
      <Show when={location.pathname != '/checkout'} fallback={<></>}>
        <footer
          class={`customFooter ${styles.footer}`}
          style={`background:${
            theme()?.styles
              ? theme()?.styles?.footer.bgStyles.backgroundColor
              : '#212020'
          }`}
        >
          <A href="/">
            Powered by Spring
          </A>
          <span>|</span>
          <A href="/">
            Support
          </A>
          <span>|</span>
          <A href="/">
            Track Order
          </A>
          <span>|</span>
          <A href="/">
            Contact Us
          </A>
          <span>|</span>
          <A href="/">
            Refund Policy
          </A>
          <span>|</span>
          <A href="/">
            Terms of Use
          </A>
          <span>|</span>
          <A href="/">
            Privacy Policy
          </A>
        </footer>
      </Show>
    </>
  );
}