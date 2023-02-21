import { onMount } from "solid-js";
import { redirect } from "solid-start";

export default function ListingLander() {
  onMount(async () => {
    redirect('/')
  });
  return <></>;
}