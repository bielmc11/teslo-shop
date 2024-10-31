import { Title } from "@/components/inedx";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  //Tenhgo que ver como hacerlo mejor
  if(id !== 'men' && id !== 'women' && id !== 'kids') {
    return notFound()
  }
  return (
    <Title title='tienda' subtitle="Todos los productos"/>
  );
}
