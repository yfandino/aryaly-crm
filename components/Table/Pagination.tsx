import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function Pagination({ page, count, perPage, onPagination }) {

  const handleBack = () => {
    if (page > 1) onPagination(page => page - 1);
  }

  const handleNext = () => {
    if (page < Math.ceil(count/perPage)) onPagination(page => page + 1);
  }

  return (
    <div className="bg-white flex items-center justify-between border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando del <span className="font-medium">{page * perPage - perPage + 1} </span>
            al <span className="font-medium">{page * perPage > count ? count : page * perPage} </span>
            de <span className="font-medium">{count}</span> resultados
          </p>
        </div>
        <div>
          <nav className="relative inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={handleBack}
              disabled={page <= 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-auto"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={handleNext}
              disabled={page >= Math.ceil(count/perPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-auto"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
