import { Accessor, Resource, Setter } from "solid-js";

interface HeaderStyles {
  bgStyles: { backgroundColor: string };
  logo: { maxHeight: string };
  template: number;
  textStyles: { color: string };
}

interface Collection {
  name: string;
  slug: string;
  collections?: {
    name: string;
    slug: string;
  }[];
}

export interface Collections {
  storeId: number;
  storeSlug: string;
  collections: Collection[];
}

interface Button {
  color: string;
  backgroundColor: string;
  borderColor: string;
}

interface Header {
  bgStyles: { backgroundColor: string };
  logo: { maxHeight: string };
  template: number;
  textStyles: { color: string };
}

interface Footer {
  bgStyles: { backgroundColor: string };
  template: number;
  textStyles: { color: string };
}

interface HeroBannerStyles {
  bgStyles: { backgroundColor: string };
  ctaBtnStyles: { backgroundColor: string; color: string };
  template: number;
  textStyles: { color: string };
}

interface FontType {
  letterSpacing?: string;
  fontSize?: string;
  fontWeight?: string;
  textTransform?: string;
}

interface Typography {
  bodyFontFamily: string;
  headingFontFamily: string;
  h1: FontType;
  h2: FontType;
  h3: FontType;
  h4: FontType;
  h5: FontType;
  h6: FontType;
}

interface Styles {
  about: { bgStyles: object; textStyles: object };
  button: { primary: Button; secondary: Button };
  customCSS: string;
  fonts: string[];
  footer: Footer;
  header: Header;
  heroBanner: HeroBannerStyles;
  linkStyles: { color: string; textDecoration: string };
  listing: { bgStyles: object; textStyles: object };
  modal: { overlayColor: string; closeButtonColor: string };
  primaryColor: string;
  productList: { titleStyles: object };
  search: {
    textStyles: object;
    bgStyles: object;
    titleStyles: object;
    closeBtnStyles: object;
  };
  typography: Typography;
}

export interface StoreInfo {
  name?: string;
  id?: number;
  slug?: string;
  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
  linkColor?: string;
  socialIdentities?: object;
  logoWidth?: number;
  logoHeight?: number;
  useLogo?: boolean;
  themeColor?: string;
  navPrimary?: string[];
  sellerId?: number;
  sellerToken?: string;
  marketingPixels?: {
    googleAnalytics?: string;
    googleAdwords?: string;
    googleAdwordsLabel?: string;
    twitter?: string;
    pinterest?: string;
    facebook?: string;
    facebookCustomCategory?: string;
    gmcMerchantId?: string;
  };
  faviconUrl?: string;
  errors?: string;
  promoCodes?: { code?: string; type: string; value: number | object }[];
}

export interface HeroBannerContent {
  body?: string;
  containerBg?: string;
  ctaLink?: string;
  ctaOpenInNewWindow?: boolean;
  ctaText?: string;
  subtitle?: string;
  title?: string;
}

interface Content {
  about: { aboutText: { id: string; text: string }[] };
  categories: string[];
  favicon: string;
  footer: {
    about: { textContent: string };
    newsletter: boolean;
    showSocialIcons: boolean;
  };
  header: {
    customLinks: {name: string, slug: string, id: string}[];
    hideSearch: boolean;
    logo: string;
    showAbout: boolean;
    showCategories: boolean;
    showSocialIcons: boolean;
  };
  heroBanner: HeroBannerContent;
}
interface Meta {
  logoHeight: string;
  mailchimpAudienceId?: string;
  mailchimpUserId?: string;
  primaryColor: string;
  searchOptions: { placeholder: string };
  seoTitle: { title?: string; keywords?: string; description?: string };
  storeId: string;
  storeName: string;
  storeUrl?: string;
}

export interface ThemeInfo {
  content?: Content;
  storeKey?: string;
  userId?: number;
  meta?: Meta;
  brand?: {
    socialMedia: { icon: string; id: string; label: string; url: string }[];
  };
  layout?: { productList: { grid: string }; heroBanner: { type: number } };
  styles?: Styles;
}

export interface Product {
  imageUrl?: string;
  additionalImages?: {
    front?: {
      src?: string;
    };
    back?: {
      src?: string;
    };
  };
  daysLeft?: number;
  id?: number;
  name?: string;
  price?: string;
  productGroupName?: string;
  productName?: string;
  timeLeft?: string;
  url?: string;
  orders?: 0;
  twitchSubOnly?: false;
  collections?: {
    id?: number;
    name?: string;
    slug?: string;
  }[];
  listingId?: number;
}

export interface ProductCollection {
  products?: Product[];
  count?: number;
  total_count?: number;
  page?: 1;
  next?: string;
  per_page?: number;
  facebook_pixel_html?: string;
  collection?: string;
}

interface ProductImage {
  label?: string;
  src?: string;
  full?: string;
  small?: string;
  thumblarge?: string;
  thumbsmall?: string;
}

export interface FullProduct {
  listingId?: number;
  title?: string;
  description?: string;
  googleProductCategory?: string;
  url?: string;
  itemGroupId?: string;
  primaryProductSku?: string;
  orders?: number;
  gender?: string;
  ageGroup?: string;
  primaryProduct?: {
    variationId: number;
    teespringId: number;
    productId: number;
    productType: string;
    productionEndDate: string;
    color: string;
    sizes: {
      id?: number;
      label?: string;
      price?: string;
    }[];
    availableSizes?: {
      id?: number;
      label?: string;
      price?: string;
    }[];
    availableSizesWithId?: {
      id?: number;
      label?: string;
      price?: string;
    }[];
    thumbnail?: {
      primary?: string;
      front?: { src?: string };
      back?: { src?: string };
    };
    images?: ProductImage[];
    attributes?: { hex?: string };
    customOptions?: {};
    price?: string;
    basePrice?: string;
    currency?: string;
    inventoryCount?: number;
  }[];
  currency?: string;
  listingThumbnails?: {
    primary?: string;
    front?: { src?: string };
    back?: { src?: string };
  };
  images?: ProductImage[];
  inventoryCount?: number;
  primaryProductId?: number;
  primaryProductType?: string;
  activeStoreSlug?: string;
  checkout_flow?: number;
  fulfillmentDetails?: { productionTechniques?: string[] };
  isPublic?: boolean;
  visibility?: string;
}

export interface ContextInterface {
  slug: string;
  theme: Resource<ThemeInfo>;
  storeInfo: Resource<StoreInfo>;
  collections: Resource<Collections>;
  products: Resource<ProductCollection>;
  searchOpen: Accessor<boolean>;
  setSearchOpen: Setter<boolean>;
  cartCount: Accessor<number>;
  setCartCount: Setter<number>;
  mobileMenuOpen: Accessor<boolean>;
  setMobileMenuOpen: Setter<boolean>;
  cart: {
    cart: Cart;
    addProduct(addCartItem: AddCartItem): void;
    updateCart(newCart: Cart): void;
    removeItem(sku: string): void;
    updateItemQuantity(slug: string, newQuantity: number): void;
    clear(): void;
  };
}
export interface CartItem {
  colorID: string;
  sizeID: string;
  productID: string;
  quantity: number;
  slug: string;
  itemGroupID: string;
}
export interface Cart {
  items: Record<string, CartItem>;
  region: string;
}
export interface AddCartItem {
  sku: string;
  colorID: string;
  sizeID: string;
  productID: string;
  quantity: number;
  itemGroupID: string;
  slug: string;
}
