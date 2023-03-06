import { For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { FullProduct } from '~/lib/typeDefs';
import styles from './cartItem.module.scss';
import { useStoreInfo } from '~/lib/store';

export default function CartLine(props: {
  product: FullProduct;
  quantity: string;
}) {
  const { cart } = useStoreInfo()!;
  return (
    <div class={styles.cartItem}>
      <div class={styles.image}>
        <img src={props.product.images?.at(0)?.thumblarge} />
      </div>
      <div class={styles.left}>
        <A
          href={`/${props.product.url}?product=${props.product.primaryProductId}`}
          class={styles.name}
        >
          {props.product.title}
        </A>
        <p class={styles.type}>{props.product.primaryProductType}</p>
        <p class={styles.options}>
          Size: {props.product.primaryProduct?.at(0)?.sizes[0]?.label}, Color:{' '}
          {props.product.primaryProduct?.at(0)?.color}
        </p>
        <button
          class={styles.remove}
          onClick={() => cart.removeItem(props.product.url!)}
        >
          Remove
        </button>
      </div>
      <div class={styles.right}>
        <div class={styles.quantity}>
          <button
            onClick={() =>
              cart.updateItemQuantity(
                props.product.url!,
                parseInt(props.quantity) - 1
              )
            }
          >
            -
          </button>
          <input
            type="number"
            value={props.quantity}
            onChange={(evt) =>
              cart.updateItemQuantity(
                props.product.url!,
                parseInt(evt.currentTarget.value)
              )
            }
          />
          <button
            onClick={() =>
              cart.updateItemQuantity(
                props.product.url!,
                parseInt(props.quantity) + 1
              )
            }
          >
            +
          </button>
        </div>
        <div class={styles.space}></div>
        <p class={styles.total}>Total</p>
        <p class={styles.price}>
          $
          {(
            parseFloat(props.product.primaryProduct?.at(0)?.price!) *
            parseInt(props.quantity)
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
