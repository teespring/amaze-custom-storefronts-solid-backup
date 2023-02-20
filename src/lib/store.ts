import { createSignal, createResource } from 'solid-js';
import { StoreInfo } from './storeInfo';

export const [storeInfo] = createResource<StoreInfo>(
  () => {
    return {
      name: '',
      slug: '',
      logo: '',
      banner: '',
      styles: {},
      collections: [],
    };
  },
  {
    initialValue: {
      name: '',
      slug: '',
      logo: '',
      banner: '',
      styles: {},
      collections: [],
    },
  }
);
