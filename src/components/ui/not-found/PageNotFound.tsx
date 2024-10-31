import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-center  sm:h-[800px] w-full ">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-8xl`}>
          404 
        </h2>
        <p className="text-xl font-semibold">
          The page you are looking for does not exist.
        </p>
        <p className="font-light">
          <span>Puedes regredar al:</span>
          <Link href="/" className="font-normal hover:underline transition-all">
            Inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image src="/imgs/starman_750x750.png" alt="starman" className="p-5 sm:p-0" width={500} height={500} />
      </div>
    </div>
  );
};
