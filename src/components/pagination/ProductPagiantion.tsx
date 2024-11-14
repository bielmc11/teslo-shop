"use client";
import clsx from "clsx";
import {  useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline, } from "react-icons/io5";

interface Props {
  page: number;
  totalPages: number;
}
export const ProductPagination = ({ totalPages, page }: Props) => {
  const params = useSearchParams(); 
  const pageParams = (params.get("page")) ? Number(params.get("page")) : page;

  const [currentPage, setCurrentPage] = useState(pageParams);

  const router = useRouter();
  const miArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const changePage = (page: number) => {
    if (page < 1) return;
    if (page > totalPages) return;
    if (page === undefined) setCurrentPage(1);
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  useEffect(() => {
    setCurrentPage(pageParams)
  },[pageParams])

  return (
      <div className="flex justify-center text-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item ">
              <a
                onClick={() => changePage(currentPage - 1)}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                aria-disabled={currentPage === 1}
              >
                <IoChevronBackOutline size={24} />
              </a>
            </li>
            {miArray.map((pagNum) => (
              <li
                onClick={() => changePage(pagNum)}
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
              <a
                onClick={() => changePage(currentPage + 1)}
                className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              >
                <IoChevronForwardOutline size={24} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
  );
};
