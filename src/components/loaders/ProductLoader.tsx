import styles from '../../routes/base.module.scss';
import ProductCard from '../cards/productCard';

export default function ProductLoader() {
  return (
    <main>
      <div class={styles.productPage}>
        <div class={styles.images}>
            <div class={styles.shelf}>
                <div class={styles.noImage}></div>
                <div class={styles.noImage}></div>
                <div class={styles.noImage}></div>
            </div>
            <div class={styles.main}>
                <div class={styles.noImage}></div>
            </div>
        </div>
        <div class={styles.info}>
            <div class={styles.title}>Product Name</div>
            <div class={styles.price}>$0.00</div>
            <div class={styles.type}>Product Types</div>
        </div>
      </div>
    </main>
  );
}
