import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface NavPaginationProps {
    startIndex: number,
    itemsPerPage: number,
    coursesAndSchedules: any[],
    goToPage: (page: number) => void,
    currentPage: number,
    totalPages: number,
    getPageNumbers: () => number[],
}

const NavPagination: React.FC<NavPaginationProps> = ({
    startIndex,
    itemsPerPage,
    coursesAndSchedules,
    goToPage,
    currentPage,
    totalPages,
    getPageNumbers,
}) => {
    const pageNumbers = getPageNumbers();
    const showEllipsis = pageNumbers.length > 5;

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between items-center sm:hidden">
                <p className="text-sm text-gray-700">
                    Pág. {currentPage} de {totalPages}
                </p>
                <div className="flex space-x-2">
                    <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        title="Primera página"
                    >
                        <ChevronDoubleLeftIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        title="Página anterior"
                    >
                        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        title="Página siguiente"
                    >
                        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                    </button>


                    <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        title="Última página"
                    >
                        <ChevronDoubleRightIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>


            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                        <span className="font-medium">
                            {Math.min(startIndex + itemsPerPage, coursesAndSchedules.length)}
                        </span>{' '}
                        de <span className="font-medium">{coursesAndSchedules.length}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            title="Primera página"
                        >
                            <ChevronDoubleLeftIcon className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            title="Página anterior"
                        >
                            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                        </button>

                        {pageNumbers.map((page, index) => {
                            if (showEllipsis && page > 2 && page < totalPages - 1 &&
                                (page < currentPage - 1 || page > currentPage + 1)) {
                                return null;
                            }

                            if (showEllipsis && page === currentPage - 2 && currentPage > 3) {
                                return (
                                    <span key={`ellipsis-start-${page}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                );
                            }

                            if (showEllipsis && page === currentPage + 2 && currentPage < totalPages - 2) {
                                return (
                                    <span key={`ellipsis-end-${page}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page}
                                </button>
                            );
                        })}


                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            title="Página siguiente"
                        >
                            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                        </button>


                        <button
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            title="Última página"
                        >
                            <ChevronDoubleRightIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default NavPagination