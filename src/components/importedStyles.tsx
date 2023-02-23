import { A, useLocation, Style } from 'solid-start';
import { useStoreInfo } from '~/lib/store';

export default function ImportedStyles() {
  const { theme, storeInfo, collections } = useStoreInfo()!;
  return <Style>{`
        body {
            background: ${theme()?.styles?.footer.bgStyles.backgroundColor};
          }

          .customFooter {
            color: ${theme()?.styles?.footer.textStyles.color}
          }
          .customFooter a {
            color: ${theme()?.styles?.footer.textStyles.color};
          }
    `}</Style>;
}