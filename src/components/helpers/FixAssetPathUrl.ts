export default function FixAssetPathUrl(url: string) {
    if (url) {
        return url.replace(
            '{{assetPath}}',
            `//premium-storefronts.s3.amazonaws.com/storefronts/browniebits/assets`
          );
    }
    return '';

}