"use client";

import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
}

export const NewAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const enviar = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(enviar)} className="flex flex-col">
       {errors.name && <p>Nombre es requerido</p>} 
      <label htmlFor="name">Nombre:</label>
      <input
        {...register("name", { required: true })}
        type="text"
        name="name"
        id="name"
        className="rounded-md py-1"
        autoFocus
      />
      <button type="submit" className="btn-primary mt-2">
        CREAR USER
      </button>
    </form>
  );
};
