import styles from '../../routes/base.module.scss';
import ProductCard from '../cards/productCard';

export default function CollectionLoader() {
  return (
    <main>
      <div class={styles.collectionPage}>
        <div class={styles.collectionTitle}>
          <h2>Collection</h2>
        </div>
          <div class={styles.productShelf}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          </div>
      </div>
    </main>
  );
}
