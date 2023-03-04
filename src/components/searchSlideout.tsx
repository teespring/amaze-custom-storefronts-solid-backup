import { createMemo, createSignal, For, Show } from 'solid-js';
import { useStoreInfo } from '~/lib/store';
import styles from './searchSlideout.module.scss';
import ProductCard from './cards/productCard';

export default function SearchSlideout() {
  const [search, setSearch] = createSignal('');

  const { products, searchOpen, setSearchOpen } = useStoreInfo()!;
  const filteredProducts = createMemo(() => {
    if (products() === undefined) return [];
    if (search() === '') return products()?.products;
    return products()?.products?.filter((product) =>
      product.name?.toLocaleLowerCase().includes(search().toLocaleLowerCase())
    );
  });

  return (
    <div class={`${styles.searchSlideout} ${searchOpen() ? styles.open : ''}`}>
      <div class={styles.closeSection}>
        <button
          onclick={() => setSearchOpen((prev) => !prev)}
          class={styles.closeButton}
        >
          <i class={`fa-solid fa-close`} />
        </button>
      </div>
      <div class={styles.searchSection}>
        <input
          type="text"
          id="search"
          name="search products"
          placeholder="Search Products"
          onKeyUp={(evt) => setSearch(evt.currentTarget.value)}
        />
      </div>
      <Show when={search() !== ''}>
        <div class={styles.products}>
          <For each={filteredProducts()}>
            {(product) => <ProductCard product={product} />}
          </For>
        </div>
      </Show>
    </div>
  );
}
