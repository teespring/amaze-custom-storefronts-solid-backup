interface HeaderStyles {
    bgStyles: {backgroundColor: string},
    logo: {maxHeight: string},
    template: number,
    textStyles: {color: string},
};

interface Collection { 
    name: string, 
    slug: string,
    collections?: { 
        name: string, 
        slug: string, 
    }[]
};

interface Button {
    color: string,
    backgroundColor: string,
    borderColor: string
}

interface Header {
    bgStyles: { backgroundColor: string },
    logo: { maxHeight: string },
    template: number,
    textStyles: { color: string }
}

interface Footer {
    bgStyles: { backgroundColor: string },
    template: number,
    textStyles: { color: string }
}

interface HeroBanner {
    bgStyles: { backgroundColor: string },
    ctaBtnStyles: { backgroundColor: string, color: string },
    template: number,
    textStyles: { color: string }
}

interface FontType {
    letterSpacing: string,
    fontSize: string,
    fontWeight: string,
    textTransform: string,
}

interface Typography {
    bodyFontFamily: string,
    headingFontFamily: string,
    h1: FontType,
    h2: FontType,
    h3: FontType,
    h4: FontType,
    h5: FontType,
    h6: FontType,
}

interface Styles {
    about: {bgStyles: object, textStyles: object},
    button: { primary: Button, secondary: Button},
    customCSS: string,
    fonts: string[],
    footer: Footer,
    header: Header,
    heroBanner: HeroBanner,
    linkStyles: { color: string, textDecoration: string },
    listing: { bgStyles: object, textStyles: object },
    modal: { overlayColor: string, closeButtonColor: string },
    primaryColor: string,
    productList: { titleStyles: object },
    search: { textStyles: object, bgStyles: object, titleStyles: object, closeBtnStyles: object },
    typography: Typography,
};

export  interface StoreInfo {
    name: string,
    slug: string,
    logo: string,
    banner: string,
    styles: object,
    collections: Collection[],
}

// styles: {
//     bgStyles: {backgroundColor: string},
//     logo: {maxHeight: string},
//     template: number,
//     textStyles: {color: string},
// },
// logo?: string
// storeName: string
// collections: { 
//     name: number, 
//     slug: string,
//     collections?: { 
//         name: number, 
//         slug: string, 
//     }[]
// }[]



interface Content {
    about: { aboutText: {id: string, text: string}[] },
    categories: string[],
    favicon: string,
    footer: { about: { textContent: string }, newsletter: boolean, showSocialIcons: boolean },
    header: {
        customLinks: [],
        hideSearch: boolean,
        logo: string,
        showAbout: boolean,
        showCategories: boolean,
        showSocialIcons: boolean
    },
    heroBanner: {
        body: string,
        containerBg: string,
        ctaLink: string,
        ctaOpenInNewWindow: boolean,
        ctaText: string,
        subtitle: string,
        title: string
    }
};
interface Meta {
    logoHeight: string,
    mailchimpAudienceId?: string,
    mailchimpUserId?: string,
    primaryColor: string,
    searchOptions: { placeholder: string },
    seoTitle: { title?: string, keywords?: string, description?: string },
    storeId: string,
    storeName: string,
    storeUrl?: string
};

export interface ThemeInfo {
    content: Content,
    storeKey: string,
    userId: number,
    meta: Meta,
    brand: { socialMedia: string[] },
    layout: { productList: { grid: string }, heroBanner: { type: number } },
    styles: Styles,
}