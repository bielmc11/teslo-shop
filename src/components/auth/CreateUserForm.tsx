"use client";
import { authentificate, login, newUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  name: string;
  password: string;
};

export const CreateUserForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setErrorMessage("");
    const { name, email, password } = data;

    //Server acction
    const resp = await newUser(email.toLocaleLowerCase(), name, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    if (resp.ok) {
      const resp2 = await login(email.toLocaleLowerCase(), password);
      if (resp2 === "success") {
        router.push("/");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
      {errors.name && (
        <p className="text-red-500 text-xs">Nombre es requerido</p>
      )}
      <label htmlFor="email">Nombre Completo</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 transition-all",
          {
            "border-red-500": errors.name,
          }
        )}
        type="text"
        autoFocus
        {...register("name", { required: true, minLength: 4 })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 transition-all",
          {
            "border-red-500": errors.email,
          }
        )}
        type="email"
        {...register("email", { required: true })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 transition-all",
          {
            "border-red-500": errors.password,
          }
        )}
        type="password"
        {...register("password", { required: true })}
      />

      {errorMessage && (
        <p className="text-red-500  transition-all">{errorMessage}</p>
      )}
      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      {/* TODO ME FALTA INICIAR SESION AUTOMETICAMENTE LLAMANDO A AUTHENTICATE SI LA REESPUESTA ES CORRECTA */}

      <Link href="/auth/login" className="btn-secondary text-center">
        ingresar
      </Link>
    </form>
  );
};
