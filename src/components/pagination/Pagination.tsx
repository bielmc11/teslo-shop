"use client";
import Link from "next/link"
import clsx from "clsx";
import {  usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline, } from "react-icons/io5";

interface Props {
  page: number;
  totalPages: number;
}
export const MyPagination = ({ totalPages, page }: Props) => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) ?? 1

  const miArray = Array.from({length: totalPages}, (_, i) => i+ 1)

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
            {miArray.map((pagNum) => (
              <li
                //onClick={() => changePage(pagNum)}
                key={pagNum}
                className={clsx("rounded", {
                  "bg-blue-400 text-white": currentPage === pagNum,
                })}
              >
                <a className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                  {pagNum}
                </a>
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
