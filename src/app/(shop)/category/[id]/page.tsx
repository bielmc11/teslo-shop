import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  if(id !== 'men' && id !== 'women' && id !== 'kids') {
    return notFound()
  }
  return (
    <div>
      <h1>Catategory Page {id} </h1>
    </div>
  );
}
