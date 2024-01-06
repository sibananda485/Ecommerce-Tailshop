import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEM_PER_PAGE } from "../../app/constant";

export default function Pagination({ totalResult, filterObj, handlePage }) {
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => {filterObj._page!==1 && handlePage(filterObj._page - 1); filterObj._page!==1 && window.scroll(0,0)}}
            className={`cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 ${
              filterObj._page === 1 ? "text-gray-100" : "text-gray-700"
            }`}
          >
            Previous
          </button>
          <p
            onClick={
              filterObj._page < Math.ceil(totalResult / ITEM_PER_PAGE)
                ? () => handlePage(filterObj._page + 1)
                : null
            }
            className={`cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              filterObj._page >= Math.ceil(totalResult / ITEM_PER_PAGE)
                ? "text-gray-100"
                : "text-gray-700"
            }`}
          >
            Next
          </p>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {filterObj._page * ITEM_PER_PAGE - (ITEM_PER_PAGE - 1)}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {totalResult < ITEM_PER_PAGE
                  ? totalResult
                  : ITEM_PER_PAGE * filterObj._page}
              </span>{" "}
              of <span className="font-medium">{totalResult}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <p
                onClick={() => handlePage(filterObj._page - 1)}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  filterObj._page === 1 ? "text-red-100" : ""
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </p>
              {Array.from({
                length: Math.ceil(totalResult / ITEM_PER_PAGE),
              }).map((el, i) => {
                return (
                  <p
                    key={i}
                    onClick={() => handlePage(i + 1)}
                    aria-current="page"
                    className={`cursor-pointer relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      filterObj._page === i + 1
                        ? "text-white  bg-cyan-700"
                        : "border"
                    }`}
                  >
                    {i + 1}
                  </p>
                );
              })}

              <p
                onClick={
                  filterObj._page < Math.ceil(totalResult / ITEM_PER_PAGE)
                    ? () => handlePage(filterObj._page + 1)
                    : null
                }
                className={`cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  filterObj._page < Math.ceil(totalResult / ITEM_PER_PAGE)
                    ? ""
                    : "text-red-100"
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </p>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
