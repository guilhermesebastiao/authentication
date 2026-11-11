"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ApiPageBody } from "@/shared/types/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/shared/components/ui/pagination";

type SessionPaginationProps = {
  pagination: Omit<ApiPageBody, "results">;
  onPageChange: (page: number) => void;
};

export const SessionPagination = ({ pagination, onPageChange }: SessionPaginationProps) => {
  const visibleCount = Math.min(3, pagination.totalPages);

  const startPage = Math.max(
    1,
    Math.min(pagination.page - 1, pagination.totalPages - visibleCount + 1),
  );

  const pages = Array.from({ length: visibleCount }, (_, index) => startPage + index);

  const isFirstPage = pagination.page <= 1;
  const isLastPage = pagination.page >= pagination.totalPages;

  const onFirstPage = () => {
    onPageChange(1);
  };

  const onLastPage = () => {
    onPageChange(pagination.totalPages);
  };

  const onPrevPage = () => {
    if (isFirstPage) return;
    onPageChange(pagination.page - 1);
  };

  const onNextPage = () => {
    if (isLastPage) return;
    onPageChange(pagination.page + 1);
  };

  return (
    <Pagination>
      <PaginationContent className="mt-2">
        <PaginationItem>
          <Button size="icon" variant="ghost" onClick={onFirstPage} disabled={isFirstPage}>
            <ChevronsLeft />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="icon" variant="ghost" onClick={onPrevPage} disabled={isFirstPage}>
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {startPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={pageNumber === pagination.page}
              onClick={(event) => {
                event.preventDefault();
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {startPage + visibleCount - 1 < pagination.totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <Button size="icon" variant="ghost" onClick={onNextPage} disabled={isLastPage}>
            <ChevronRight />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button size="icon" variant="ghost" onClick={onLastPage} disabled={isLastPage}>
            <ChevronsRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
