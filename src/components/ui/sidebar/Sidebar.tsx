"use client";
import Link from "next/link";
import React from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  return (
    <div>
      {/* bacground black */}
      <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>

      {/* Blur */}
      <div className="fixed top-0 left-0 w-screen h-screen z-10  backdrop-blur-sm "></div>

      {/* Sidemenu */}
      {/* Condiciones para si esta abierto o no */}
      <nav className="fixed top-0 right-0 w-[500px] h-screen z-20 bg-white shadow-2xl transition-all duration-300 transform">
        {/* todo: efecto slide */}
        <IoCloseOutline
          size={45}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => console.log("clic")}
        />

        {/* Input de busqueda */}
        <div className="relative mt-16 mx-6 ">
          <IoSearchOutline
            size={25}
            className="absolute top-2 left-2 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Buscar..."
            className=" w-full bg-gray-50 pl-10 pr-10 py-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 rounded-md"
          />
        </div>

        {/* Manu */}

        <Link
          href={"/"}
          className="flex items-center gap-2 mt-10 p-2 rounded hover:bg-gray-100 translate-all"
        >
          <IoPersonOutline size={20} />
          <span className="text-xl">Perfil</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center gap-2 mt-10 p-2 rounded hover:bg-gray-100 translate-all"
        >
          <IoTicketOutline size={20} />
          <span className="text-xl">Ordenes</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center gap-2 mt-10 p-2 rounded hover:bg-gray-100 translate-all"
        >
          <IoLogInOutline size={20} />
          <span className="text-xl">Ingresar</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center gap-2 mt-10 p-2 rounded hover:bg-gray-100 translate-all"
        >
          <IoLogOutOutline size={20} />
          <span className="text-xl">Salir</span>
        </Link>

        {/* line separated */}
        <div className="w-full h-px bg-gray-200 my-10">
          <Link
            href={"/"}
            className="flex items-center gap-2 mt-10 p-2 rounded hover:bg-gray-100 translate-all"
          >
            <IoShirtOutline size={20} />
            <span className="text-xl">Productos</span>
          </Link>

          <Link
            href={"/"}
            className="flex items-center gap-2 mt-10 p-2 rounded hover:bg-gray-100 translate-all"
          >
            <IoTicketOutline size={20} />
            <span className="text-xl">Ordenes</span>
          </Link>

          <Link
            href={"/"}
            className="flex items-center gap-2 mt-10 p-2 rounded hover:bg-gray-100 translate-all"
          >
            <IoPeopleOutline size={20} />
            <span className="text-xl">usuarios</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
