import { A, useLocation, Style } from 'solid-start';
import { useStoreInfo } from '~/lib/store';

export default function ImportedStyles() {
  const { theme, storeInfo, collections } = useStoreInfo()!;
  return (
    <Style>{`
        body {
          background: ${theme()?.styles?.footer.bgStyles.backgroundColor};
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
    `}</Style>
  );
}
