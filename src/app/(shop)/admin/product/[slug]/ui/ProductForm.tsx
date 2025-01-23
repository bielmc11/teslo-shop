"use client";

import { updateProducts } from "@/actions/admin/products/update-products";
import { Size } from "@/interfaces/product.interface";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import clsx from "clsx";

export type ProductsBD = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: Size[];
  tags: string[];
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;

  images: string[];
  productImages: { id: number; url: string; productId: string }[];
};

interface Props {
  product: ProductsBD;
  categories: { id: string; name: string }[];
}

const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const [loading, setLoading] = useState(false);
  const [tallas, setTallas] = useState(product.sizes);

  const params = useParams();
  const router = useRouter();
  const oldSlug = params.slug as string;

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductsBD>({
    defaultValues: {
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      sizes: product.sizes ?? [],
      tags: product.tags,
      gender: product.gender,
      categoryId: product.categoryId,

      images: product.images,
    },
  });

  const changeSizes = (size: Size) => {

    if (getValues('sizes').includes(size)) {
      setValue('sizes', getValues('sizes').filter((s) => s !== size))
      return
    }
    setValue('sizes',[...getValues('sizes'), size])
    
  }

  watch('sizes')

  const onSubmit = async (data: ProductsBD) => {
    //Todo cuando envio el objeto recordar que tengo que cambiar el size por mi estado de tallas
    console.log(data);
    /* const res = await updateProducts(data, oldSlug);


    toast.loading("Guardando...");

    if (res.ok) {
      toast.success("Guardado");
    } */
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        {
          errors.title && <span className="text-sm text-red-600">Campo obligatorio</span>
        }
        <div className="flex flex-col mb-2">
          
          <span>Título</span>
          <input
            {...register("title", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
        {
          errors.slug && <span className="text-sm text-red-600">Campo obligatorio</span>
        }
          <span>Slug</span>
          <input
            {...register("slug", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
        {
          errors.description && <span className="text-sm text-red-600">Campo obligatorio</span>
        }
          <span>Descripción</span>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
        {
          errors.price && <span className="text-sm text-red-600">Campo obligatorio</span>
        }
          <span>Price</span>
          <input
            {...register("price", { required: true })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
        {
          errors.tags && <span className="text-sm text-red-600">Campo obligatorio</span>
        }
          <span>Tags</span>
          <input
            {...register("tags", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
        {
          errors.gender && <span className="text-sm text-red-600">Campo obligatorio</span>
        }
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
        {
          errors.categoryId && <span className="text-sm text-red-600">Campo obligatorio</span>
        }
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
          {
            tallas.length === 0 && <span className="text-xs text-red-600">No hay tallas seleccionadas</span>
          }
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => {
              const selectedSize = getValues('sizes').includes(size)

              return (
                <div
                onClick={() => changeSizes(size)}
                  key={size}
                  className={clsx(
                    "flex  cursor-pointer items-center justify-center w-10 h-10 mr-2 border rounded-md transition-colors",
                    selectedSize ? "bg-blue-500 text-white hover:bg-blue-700" : "hover:bg-gray-200"
                  )}
                >
                  <span>{size}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {product.productImages.map((image) => (
                <div key={image.id}>
                  <Image
                    alt=""
                    src={`/products/${image.url}`}
                    width={300}
                    height={300}
                    className="rounded-t-md shadow-md"
                  />
                  <button
                    type="button"
                    className="bg-red-500 w-full hover:bg-red-700 text-white py-2 px-4 transition-all rounded-b-xl"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </form>
  );
};
