import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

//Cuadno el carrito este totalmente cacio
export default function EmtyPage() {
  return (
    <div className="flex justify-center items-center h-[800px] gap-2">
      <IoCartOutline size={80} />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito esta vacio</h1>
        <Link
          href="/cart"
          className="text-blue-600 mt-2 text-4xl hover:underline hover:text-blue-800"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
}
