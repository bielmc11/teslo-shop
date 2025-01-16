import { getAllOrders } from "@/actions";
import clsx from "clsx";
import { redirect } from "next/navigation";

export default async function OrdersAdminPage() {
  const { ok, orders } = await getAllOrders();

  if (!ok) redirect("/");
  console.log(orders);

  return (
    <div>
        <h2 className="font-bold text-2xl mt-10">Ordenes</h2>
      <div className="w-full flex justify-center mt-10">
        <table className="grow">
          <thead className="bg-gray-200 border-b rounded">
            <tr>
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
            {orders?.map((order) => {
              const { id, isPaid, total, userId,user } = order;

              console.log(isPaid);

              return (
                <tr className="text-center" key={id}>
                  <td>{id.split("-").at(-1)}</td>
                  <td>{userId.split("-").at(-1)}</td>
                  <td>{user.name}</td>
                  <td className={clsx(
                    {
                        'text-green-800' : isPaid,
                        'text-red-700': !isPaid
                    }
                  )}>{isPaid ? "Pagada" : "No Pagada"}</td>
                  <td>delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}