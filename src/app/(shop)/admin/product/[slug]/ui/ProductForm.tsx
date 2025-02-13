"use client";

import { Size } from "@/interfaces/product.interface";
import { useParams, useRouter } from "next/navigation";
import {  useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateProduct } from "@/actions";
import { revalidatePaths } from "@/actions/admin/products/revalidatePaths";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { deleteProductImage } from "@/actions/admin/products/delete-product-image";

export type ProductsBD = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: Size[];
  tags: string[];
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
//ANTES PONIA FILElIST PERO LA PAGINA ANTERIOR SE QUEJABA
  images?: any;
  productImages?: { id: number; url: string; productId: string }[];
};

interface Props {
  product: Partial<ProductsBD>;
  categories: { id: string; name: string }[];
}

const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {
  const [loading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductsBD>({
    defaultValues: {
      id: product.id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      sizes: product.sizes ?? [],
      tags: product.tags,
      gender: product.gender,
      categoryId: product.categoryId,

      //por defecto el las pone undefined
      images: undefined,
    },
  });

  const changeSizes = (size: Size) => {
    if (getValues("sizes").includes(size)) {
      setValue(
        "sizes",
        getValues("sizes").filter((s) => s !== size)
      );
      return;
    }
    setValue("sizes", [...getValues("sizes"), size]);
  };

  //watch("sizes");

  useWatch({ name: "sizes", control });

  const onSubmit = async (data: ProductsBD) => {
    //Todo cuando envio el objeto recordar que tengo que cambiar el size por mi estado de tallas
    const formData = new FormData();

    //!Me falta el id

    if (data.id) {
      formData.append("id", data.id ?? "");
    }

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("description", data.description);

    formData.append("categoryId", data.categoryId);

    formData.append("price", data.price.toString());
    formData.append("inStock", data.inStock.toString());
    formData.append("sizes", JSON.stringify(data.sizes));
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("gender", data.gender);


    if(data.images){
      for (let i = 0; i < data.images.length; i++){
        console.log(data.images[i]);
        formData.append("images", (data.images[i]));
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Error al guardar");
      return;
    }

    if (updatedProduct) {
      router.push(`/admin/product/${updatedProduct?.slug}`);

      revalidatePaths(["/admin/products", "/",`admin/product/${updatedProduct?.slug}`]);
    }
  };


  const onDeleteImage = async (image: { id: number, url: string }) => {
    const eliminado = await deleteProductImage(image.id, image.url);
    console.log(eliminado);

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        {errors.title && (
          <span className="text-sm text-red-600">Campo obligatorio</span>
        )}
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            {...register("title", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          {errors.slug && (
            <span className="text-sm text-red-600">Campo obligatorio</span>
          )}
          <span>Slug</span>
          <input
            {...register("slug", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>


        <div className="flex flex-col mb-2">
          {errors.description && (
            <span className="text-sm text-red-600">Campo obligatorio</span>
          )}
          <span>Descripción</span>
          <textarea
            {...register("description", { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          {errors.price && (
            <span className="text-sm text-red-600">Campo obligatorio</span>
          )}
          <span>Price</span>
          <input
            {...register("price", { required: true })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          {errors.tags && (
            <span className="text-sm text-red-600">Campo obligatorio</span>
          )}
          <span>Tags</span>
          <input
            {...register("tags", { required: true })}
            type="text"
            autoFocus
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          {errors.gender && (
            <span className="text-sm text-red-600">Campo obligatorio</span>
          )}
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
          {errors.categoryId && (
            <span className="text-sm text-red-600">Campo obligatorio</span>
          )}
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
        <div className="flex flex-col mb-2">
          {errors.inStock && (
            <span className="text-sm text-red-600">Campo obligatorio</span>
          )}
          <span>Stock</span>
          <input
            {...register("inStock", { required: true })}
            type="number"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          {getValues("sizes").length === 0 && (
            <span className="text-xs text-red-600">
              No hay tallas seleccionadas
            </span>
          )}
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => {
              const selectedSize = getValues("sizes").includes(size);

              return (
                <div
                  onClick={() => changeSizes(size)}
                  key={size}
                  className={clsx(
                    "flex  cursor-pointer items-center justify-center w-10 h-10 mr-2 border rounded-md transition-colors",
                    selectedSize
                      ? "bg-blue-500 text-white hover:bg-blue-700"
                      : "hover:bg-gray-200"
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
              multiple={true}
              {...register("images")}
              className="p-2 border rounded-md bg-gray-200"
              accept="image/*"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {product?.productImages?.map((image) => (
                <div key={image.id}>
                  <ProductImage
                    alt=""
                    src={`${image.url}`}
                    width={300}
                    height={300}
                    className="rounded-t-md shadow-md overflow-hidden max-h-[300px]"
                  />
                  <button
                    type="button"
                    onClick={() => onDeleteImage(image)}
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
    </form>
  );
};
