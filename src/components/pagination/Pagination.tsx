"use client";
import Link from "next/link"
import clsx from "clsx";
import {  usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline, } from "react-icons/io5";
import { generatePagination } from "@/utils";

interface Props {
  page: number;
  totalPages: number;
}
export const MyPagination = ({ totalPages, page }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) ?? 1

  const arrayPages = generatePagination(currentPage, totalPages)

  const createPageUrl = (pageNumber : number | string ) => {
    const params = new URLSearchParams( searchParams )
    
    if(pageNumber === '...'){
      return `${pathName}?${params.toString()}` //no hace nada
    }

    if(Number(pageNumber) === 0){
      return `${pathName}` //te lleva a la primera o rasa
    }

    if(Number(pageNumber) > totalPages){
      return `${pathName}?${params.toString()}` //te lleva a la ultima
    }

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`


  }

  return (
      <div className="flex justify-center text-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item ">
              <Link
              href={createPageUrl(currentPage - 1)}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                aria-disabled={currentPage === 1}
              >
                <IoChevronBackOutline size={24} />
              </Link>
            </li>
            {arrayPages.map((pagNum) => (
              <li
                key={pagNum}
                className="rounded"
              >
                <Link href={createPageUrl(pagNum)} 
                className={clsx(
                  "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800  focus:shadow-none",
                  {
                    "bg-blue-500 hover:bg-blue-400 text-white" : currentPage === pagNum,
                    "hover:bg-gray-200" : currentPage !== pagNum,
                  }
                )}>
                  {pagNum}
                </Link>
              </li>
            ))}

            <li className="page-item">
              <Link
              href={createPageUrl(currentPage + 1)}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              >
                <IoChevronForwardOutline size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};
