import { A, useLocation, Style } from 'solid-start';
import { useStoreInfo } from '~/lib/store';
import FixAssetPathUrl from './helpers/FixAssetPathUrl';

export default function ImportedStyles() {
  const { theme, storeInfo, collections, searchOpen } = useStoreInfo()!;
  return (
    <Style>{`
        body {
          background: ${theme()?.styles?.footer.bgStyles.backgroundColor};
          overflow-y: ${searchOpen() ? 'hidden !important' : 'scroll'};
        }

        .customFooter {
          color: ${theme()?.styles?.footer.textStyles.color};
          background: ${theme()?.styles?.footer.bgStyles.backgroundColor};
        }
        .customFooter a {
          color: ${theme()?.styles?.footer.textStyles.color};
        }

        .customHeader {
          background: ${theme()?.styles?.header.bgStyles.backgroundColor};
        }
        .customHeader .customLogo h1 {
          color: ${theme()?.styles?.header.textStyles.color};
        }
        .customHeader .customNav .customNavItem > a {
          color: ${theme()?.styles?.header.textStyles.color};
        }
        .customHeader .customRightBar .customCartIcon svg {
          color: ${theme()?.styles?.header.textStyles.color};
        }
        .customHeader .customRightBar .customSocialLink svg {
          color: ${theme()?.styles?.header.textStyles.color};
        }
        .customHeader .customRightBar .customSearchButton svg {
          color: ${theme()?.styles?.header.textStyles.color};
        }

        .hero {
          background: ${theme()?.styles?.heroBanner.bgStyles.backgroundColor};
          ${theme()?.content?.heroBanner.containerBg ? 'background-image:url(' + FixAssetPathUrl(theme()?.content?.heroBanner.containerBg!) + ')' : ''}
        }
        .hero span {
          color: ${theme()?.styles?.heroBanner.textStyles.color};
        }
        .hero p {
          color: ${theme()?.styles?.heroBanner.textStyles.color};
        }
        .hero h1 {
          color: ${theme()?.styles?.heroBanner.textStyles.color};
        }
        .hero a {
          background: ${theme()?.styles?.heroBanner.ctaBtnStyles.backgroundColor};
          color: ${theme()?.styles?.heroBanner.ctaBtnStyles.color};
        }
    `}</Style>
  );
}
