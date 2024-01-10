

export default function Pagination(props) {
    const { className, style, currentPage, setCurrentPage, totalNumPages } = props;

    const pagination = generatePagination(currentPage, totalNumPages);

    return (
        <div
            className={'flex justify-between items-center ' + className}
            style={{
                ...style
            }}
        >
            <PaginationItem
                paginationItem='<'
                currentPage={currentPage}
                setCurrentPage={() => setCurrentPage(
                    currentPage - 1 <= 0
                        ? 1
                        : currentPage - 1
                )}
                disabled={currentPage - 1 <= 0}
            />
            {pagination.map((paginationItem, index) => (
                <PaginationItem
                    key={index}
                    paginationItem={paginationItem}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ))}
            <PaginationItem
                paginationItem='>'
                currentPage={currentPage}
                setCurrentPage={() => setCurrentPage(
                    currentPage + 1 > totalNumPages
                        ? totalNumPages
                        : currentPage + 1
                )}
                disabled={currentPage + 1 > totalNumPages}
            />
        </div>
    )
}

export function PaginationItem(props) {
    const { paginationItem, currentPage, setCurrentPage, disabled } = props;

    return (
        <div
            className={
                (currentPage === paginationItem
                    ? 'text-green-500 '
                    : ' '
                )
                + ((paginationItem !== '...' && disabled !== true)
                    ? ' hover:underline cursor-pointer'
                    : ' '
                )
                + (disabled ? ' text-gray-400 cursor-not-allowed' : ' text-black')
            }
            onClick={e => {
                if (paginationItem === '...' || disabled === true) return;
                setCurrentPage(paginationItem);
            }}
        >
            {paginationItem}
        </div>
    )
}

export function filterByCurrentPage(pages, currentPage, numItemsPerPage) {
    return pages.filter((page, index) => {
        return (index < currentPage * numItemsPerPage && index >= (currentPage - 1) * numItemsPerPage);
    });
}

export function calcTotalNumPages(pages, numItemsPerPage) {
    return Math.ceil(pages.length / numItemsPerPage);
}

export const generatePagination = (currentPage, totalPages) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};
