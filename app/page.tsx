import ProductItem from "@/components/ProductItem";
import { getCategories } from "@/lib/prisma/category";
import { getUsers } from "@/lib/prisma/user";
import { Category } from '@prisma/client';

async function getCategoriesData(): Promise<Category[]> {
  "use server"
  return await getCategories();
}

export default async function Home() {
  // const users = await getUsers();
  console.log("users");
  return (
    <main className="min-h-screen container mx-auto bg-red-300">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center justify-items-center">
        {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((item, index) => {
          console.log(item);
          return <ProductItem key={index} addHandler={getCategoriesData}/>;
        })}
      </section>
    </main>
  );
}
