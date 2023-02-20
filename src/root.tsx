// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Link,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import MainHeader from "./components/menus/mainHeader";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>My Big Store</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="The Amaze Marketplace" />
        <Meta property="og:locale" content="en_US" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content="Home - Amaze" />
        <Meta
          property="og:description"
          content="Amaze has everything you need to create beautiful experiences that bring your content to life, increase engagement, and boost sales."
        />
        <Meta property="og:url" content="https://amaze.co/" />
        <Meta property="og:site_name" content="Amaze" />
        <Meta
          property="article:modified_time"
          content="2022-10-18T01:49:37+00:00"
        />
        <Meta
          property="og:image"
          content={`https://og-image.vercel.app/boop.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <Link rel="canonical" href="https://amaze.co/" />
        <Link rel="shortlink" href="https://amaze.co/" />
        <Link
          rel="icon"
          href="/favicon.png"
        />
      </Head>
      <Body>
        <MainHeader/>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
