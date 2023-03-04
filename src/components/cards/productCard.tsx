import { useStoreInfo } from '~/lib/store';
import { A } from '@solidjs/router';
import { Product } from '~/lib/typeDefs';
import styles from './productCard.module.scss';
import { Show } from 'solid-js';

export default function ProductCard(props: { product?: Product }) {
  const { cart } = useStoreInfo()!;
  const productID = props.product?.url?.match(/pid=(\d+)/)?.at(1);
  const productSlug = props.product?.url?.split('?')?.at(0)?.split('/').at(1);
  return (
    <>
      <Show when={props.product}>
        <div class={styles.productCard}>
          <A href={`/listing/${productSlug}?product=${productID}`}>
            <img
              class={styles.productImage}
              src={props.product?.imageUrl}
              alt={props.product?.name}
              loading="lazy"
            />
            <div class={styles.productDetails}>
              <div class={styles.info}>
                <p class={styles.name}>{props.product?.name}</p>
                <p class={styles.type}>{props.product?.productName}</p>
              </div>
              <div class={styles.price}>
                <p>{props.product?.price}</p>
              </div>
            </div>
          </A>
          <button
            onClick={() => {
              cart.addProduct({colorID: '12', sizeID: '34', productID: '56', quantity: 2, itemGroupID: '78', slug: 'myProd', sku: props.product?.id?.toString()!});
            }}
            class={styles.quickAddButton}
          >
            <i class={`fa-solid fa-cart-plus`} />
          </button>
        </div>
      </Show>
      <Show when={!props.product}>
        <div class={styles.productCard}>
            <div class={styles.noProductImage}></div>
            
            <div class={styles.productDetails}>
              <div class={styles.info}>
                <p class={styles.name}>Product Name</p>
                <p class={styles.type}>Product Type</p>
              </div>
              <div class={styles.price}>
                <p>$0.00</p>
              </div>
            </div>
        </div>
      </Show>
    </>
  );
}
