import { getAllProducts } from "@/actions";
import { Title } from "@/components/inedx";
import Image from "next/image";

export default async function NamePage() {
    const { ok, products } = await getAllProducts();
  return (
    <div>
        <Title title="Mantenimiento de Productos"/>
      <div className="flex  max-w-[1600px] flex-col mx-auto ">
        <button className="btn-primary sm:max-w-[150px] self-end mb-4">Nuevo producto </button>
        <table className=" content-center  ">
            <thead className="bg-gray-200 border-b h-10">
                <tr>
                    <th >Imagen</th>
                    <th>Titulo</th>
                    <th>Precio</th>
                    <th>Genero</th>
                    <th>Inventario</th>
                    <th>Tallas</th>
                </tr>
            </thead>
            <tbody>
                {
                    products?.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td><Image src={`/products/${product.images[0].url}`} width={120} height={120} alt="producto" className="object-contain center"/></td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
    </div>
  );
}