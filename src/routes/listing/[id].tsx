import { Title, useParams } from "solid-start";
import Counter from "~/components/Counter";
import CapitalizeFirstLetter from "~/components/CapitalizeFirstLets";
export default function CategoryPage() {
    const params = useParams();
  return (
    <main>
      <Title>{CapitalizeFirstLetter(params.id)} Category Page</Title>
      <h1>Hello {CapitalizeFirstLetter(params.id)}!</h1>
    </main>
  );
}