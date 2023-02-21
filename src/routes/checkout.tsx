import { Suspense,Show } from "solid-js";
import { 
  Title,
  Meta,
} from "solid-start";


export default function CheckoutPage() {
  return (
    <>
      <Suspense fallback={<></>}>
        <main>
          <Title>Checkout Page</Title>
          <Meta property="og:title" content="Checkout Page" />
          {/* <Meta
            property="og:image"
            content={storeInfo()?.banner}
          />
          <Link
            rel="icon"
            href={storeInfo()?.logo}
          /> */}
          
          <h1>Hello Checkout</h1>
        </main>
      </Suspense>
    </>
  );
}