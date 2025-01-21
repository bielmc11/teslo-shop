"use client";

import { updateProducts } from "@/actions/admin/products/update-products";
import {  Size } from "@/interfaces/product.interface";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export type ProductsBD = {
  id: string;
  title: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
};

interface Props {
  product: ProductsBD;
  categories: { id: string; name: string }[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const oldSlug = params.slug as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductsBD>({
    defaultValues: {
      title: product.title,
      description: product.description,
      images: product.images,
      inStock: product.inStock,
      price: product.price,
      sizes: product.sizes,
      slug: product.slug,
      tags: product.tags,
      gender: product.gender,
      categoryId: product.categoryId,
    },
  });

  const onSubmit = async (data: ProductsBD) => {
  


    const res = await updateProducts(data, oldSlug) ;
    
    toast.loading("Guardando...");


    if(res.ok){
        toast.success("Guardado");
    }

    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            {...register("title", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            {...register("slug", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            {...register("price", { required: true })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            {...register("tags", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            {...register("gender", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            {...register("categoryId", { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {" "}
                {category.name.toUpperCase()}{" "}
              </option>
            ))}
          </select>
        </div>

        <button disabled={loading} className="btn-primary w-full">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className="flex  items-center justify-center w-10 h-10 mr-2 border rounded-md"
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
       <Toaster position="bottom-right" /> 
    </form>
  );
};
