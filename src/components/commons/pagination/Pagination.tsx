import React from "react";
import { Link } from "react-router-dom";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPage: number;
  page: number;
  limit?: number;
  pathname: string;
}

export default function Pagination({
  totalPage,
  page,
  limit = 3,
  pathname,
}: PaginationProps) {
  const centerNum = Math.ceil(totalPage / 2);
  const limitHalf = Math.floor(limit / 2);

  const PageItem = ({ pageNum }: { pageNum: number }) => (
    <Link
      to={`/${pathname}?page=${pageNum}`}
      className={pageNum === page ? styles.active : ""}
    >
      {pageNum}
    </Link>
  );

  return (
    <div className={styles.pagination}>
      {totalPage <= limit ? (
        [...Array(totalPage)].map((_, i) => (
          <PageItem pageNum={i + 1} key={i} />
        ))
      ) : (
        <>
          {page > centerNum - limitHalf + 1 && (
            <>
              <PageItem pageNum={1} />
              ...
            </>
          )}

          {page <= centerNum - limitHalf + 1 ? (
            [...Array(limit)].map((_, i) => (
              <PageItem pageNum={i + 1} key={i} />
            ))
          ) : page < totalPage - limit ? (
            <>
              {[...Array(limitHalf)].map((_, i) => (
                <PageItem pageNum={page - limitHalf + i} key={i} />
              ))}

              <PageItem pageNum={page} />

              {[...Array(limitHalf)].map((_, i) => (
                <PageItem pageNum={page + limitHalf + i - 1} key={i} />
              ))}
            </>
          ) : (
            <>
              {[...Array(limit)].map((_, i) => (
                <PageItem pageNum={totalPage - limit + i + 1} key={i} />
              ))}
            </>
          )}

          {page <= totalPage - limit + 1 && (
            <>
              ...
              <PageItem pageNum={totalPage} />
            </>
          )}
        </>
      )}
    </div>
  );
}
