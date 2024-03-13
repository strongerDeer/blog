import { Link } from "react-router-dom";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPage: number;
  page: number;
  limit?: number;
  pathname: string;
}

const PAGE_ITEMS_DISPLAYED = 5;
const PAGE_ITEMS_AROUND_CURRENT = 3;

export default function Pagination({
  totalPage,
  page,
  pathname,
}: PaginationProps) {
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
      {totalPage <= PAGE_ITEMS_DISPLAYED ? (
        [...Array(totalPage)].map((_, i) => (
          <PageItem pageNum={i + 1} key={i} />
        ))
      ) : (
        <>
          {page > PAGE_ITEMS_AROUND_CURRENT && (
            <>
              <PageItem pageNum={1} />
              ...
            </>
          )}

          {page <= PAGE_ITEMS_AROUND_CURRENT && (
            <>
              {[...Array(PAGE_ITEMS_DISPLAYED)].map((_, i) => (
                <PageItem pageNum={i + 1} key={i} />
              ))}
            </>
          )}
          {page > PAGE_ITEMS_AROUND_CURRENT &&
            page < totalPage - PAGE_ITEMS_AROUND_CURRENT && (
              <>
                <PageItem pageNum={page - 1} />
                <PageItem pageNum={page} />
                <PageItem pageNum={page + 1} />
              </>
            )}
          {page >= totalPage - PAGE_ITEMS_AROUND_CURRENT && (
            <>
              {[...Array(PAGE_ITEMS_DISPLAYED)].map((_, i) => (
                <PageItem
                  pageNum={totalPage - (PAGE_ITEMS_DISPLAYED - i - 1)}
                  key={i}
                />
              ))}
            </>
          )}

          {page < totalPage - 3 && (
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
