export const generatePagination = (currentPage: number, totalPages: number) => {
    //Si solo hay 7 paginas o menos las devuelvo todas
    if(totalPages <= 7){
        return Array.from({length: totalPages}, (_, i) => i + 1) //[1,2,3,4,5,6,7]
    }

    //
    if(currentPage <=3){
        return [1,2,3,4,'...', totalPages - 1, totalPages] //[1,2,3,4,...,49,50]
    }

    if(currentPage >= totalPages - 2){
        return [1,2,'...', totalPages -2, totalPages - 1, totalPages] //[1,2,...,48,49,50]
    }

    return [1,'...', currentPage -1, currentPage, currentPage + 1, '...',totalPages] //[1,...,46,47,48,,...,50]
}