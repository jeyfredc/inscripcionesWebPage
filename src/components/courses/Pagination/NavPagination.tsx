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
    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                        >
                            <span className="sr-only">Primera página</span>
                            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Siguiente</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Última página</span>
                            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default NavPagination