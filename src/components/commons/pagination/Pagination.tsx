import { Link } from "react-router-dom";

interface PaginationProps {
  totalPage?: number;
  page: number;
  limit?: number;
  pathname: string;
}
export default function Pagination({
  totalPage = 0,
  page,
  limit,
  pathname,
}: PaginationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black">
      {totalPage <= 10 ? (
        [...Array(totalPage)].map((x, i) => (
          // <Link to={{ pathname: pathname, query: { page: i + 1 } }} key={i}>
          <Link to={`/${pathname}?page=${i + 1}`} key={i}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                i + 1 === page ? "text-blue-600 font-bold" : "text-gray-300"
              }`}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {page > 1 && (
            <Link to={`/${pathname}?page=${page - 1}`}>
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                이전
              </span>
            </Link>
          )}
          <Link to={`/${pathname}?page=${page}`}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white text-blue-600`}
            >
              {page}
            </span>
          </Link>
          {totalPage > page && (
            <Link to={`/${pathname}?page=${page + 1}`}>
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
