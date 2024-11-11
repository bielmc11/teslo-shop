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

  const mappedCategories = categoriesDb.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.id;
    return accumulator;
  }, {} as Record<string, string>);


  //3. Productos

  initialData.products.forEach(async (product) => {
    const { images, type, ...rest } = product;
  });

  const { images, type, ...rest } = initialData.products[0];


  initialData.products.forEach(async (product) => {

    const { images, type, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: mappedCategories[type]
      }
    })

    //4. Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }))

    console.log(imagesData)

    await prisma.productImage.createMany({
      data: imagesData
    })

  })
  

  console.log("seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
