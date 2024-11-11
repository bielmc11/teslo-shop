import prisma from "../lib/prisma";
import { initialData } from "./seed";
async function main() {
  //1. Borrar datos previos
  await Promise.all([
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),
  ]);

  //2. Categorias
  const { categories } = initialData;
  const categoryData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({
    data: categoryData,
  });

  const categoriesDb = await prisma.category.findMany();

  const mappedCategories = categoriesDb.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });
  console.log(mappedCategories);

  //3. Productos

  /* initialData.products.forEach(async (product) => {
    const { images, type, ...rest } = product;
    await prisma.product.create({
      data: {
        ...rest,
        categoryId: mappedCategories[Number(type)],
      },
    });
  }); */

  /* await prisma.product.create({
    data: {
      ...rest,
      categoryId: mappedCategories[type]
    },
  }); */

  console.log("seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
