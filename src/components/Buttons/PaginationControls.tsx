import React from "react";
import { Button, Pagination } from "@heroui/react";

interface PaginationControlsProps {
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, pages, setPage }) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">{`${page} of ${pages}`}</span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={page === 1} size="sm" variant="flat" onPress={() => setPage(page - 1)}>
          Previous
        </Button>
        <Button isDisabled={page === pages} size="sm" variant="flat" onPress={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
