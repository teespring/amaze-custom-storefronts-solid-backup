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
          <div class={styles.mainInfo}>
            <div class={styles.title}>
              <h2>Product Name</h2>
            </div>
            <div class={styles.price}>
              <h2>$0.00</h2>
            </div>
          </div>
          <div class={styles.type}>
            <p>Product Type</p>
          </div>
          <div class={styles.colorInfo}>
            <p>
              Color: <span>Black</span>
            </p>
          </div>
          <div class={styles.colorSwatches}>
            <div class={`${styles.color} ${styles.selected}`}>
              <div class={styles.swatch} style={`background: #000000;`}></div>
            </div>
            <div class={`${styles.color}`}>
              <div class={styles.swatch} style={`background: #ff00000;`}></div>
            </div>
            <div class={`${styles.color}`}>
              <div class={styles.swatch} style={`background: #00ff00;`}></div>
            </div>
            <div class={`${styles.color}`}>
              <div class={styles.swatch} style={`background: #0000ff;`}></div>
            </div>
            <div class={`${styles.color}`}>
              <div class={styles.swatch} style={`background: #ffffff;`}></div>
            </div>
            <div class={`${styles.color}`}>
              <div class={styles.swatch} style={`background: #f0f000;`}></div>
            </div>
          </div>
          <div class={styles.sizeInfo}>
            <p>
              Size: <span>Small</span>
            </p>
            <button disabled>
              <i class={`fa-solid fa-ruler`} /> Sizing Guide
            </button>
          </div>
          <div class={styles.sizeSwatch}>
            <div class={`${styles.size} ${styles.selected}`}>XS</div>
            <div class={`${styles.size}`}>S</div>
            <div class={`${styles.size}`}>M</div>
            <div class={`${styles.size}`}>L</div>
            <div class={`${styles.size}`}>XL</div>
            <div class={`${styles.size}`}>2X</div>
            <div class={`${styles.size}`}>3X</div>
            <div class={`${styles.size}`}>4X</div>
            <div class={`${styles.size}`}>5X</div>
          </div>
          <button disabled class={styles.addButton}>
            Add to Cart
          </button>
          <div class={styles.afterPay}>
            <p>Pay in 4 payments of $7.25 with</p>
            {' '}
            <button>
              <img
                src="https://teespring-ass.s3.amazonaws.com/branded_stores/images/Afterpay.svg"
                class=""
                alt="Afterpay"
              />
            </button>
            {' '}
            <i class={`fa-solid fa-circle-info`} />
          </div>
        </div>
      </div>
    </main>
  );
}
