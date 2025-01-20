import { getAllOrders } from "@/actions";
import clsx from "clsx";
import { redirect } from "next/navigation";

export default async function OrdersAdminPage() {
  const { ok, orders } = await getAllOrders();

  if (!ok) redirect("/");

  return (
    <div>
      <h2 className="font-bold text-2xl mt-10">Ordenes</h2>
      <div className="w-full flex justify-center mt-10 ">
        <table className="grow max-w-[1600px] ">
          <thead className="bg-gray-200 border-b">
            <tr className="rounded-xl">
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Order Id
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                User Id
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Nombre Completo
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Estado
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, i) => {
              const { id, isPaid, userId, user } = order;
              const isOdd =
                i % 2 === 0 ? "bg-white" : "bg-orange-100";

              return (
                <tr className={`text-center ${isOdd} my-2`} key={id}>
                  <td className="py-2">{id.split("-").at(-1)}</td>
                  <td>{userId.split("-").at(-1)}</td>
                  <td>{user.name}</td>
                  <td
                    className={clsx({
                      "text-green-800": isPaid,
                      "text-red-700": !isPaid,
                    })}
                  >
                    {isPaid ? "Pagada" : "No Pagada"}
                  </td>
                  <td>Detalles</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
