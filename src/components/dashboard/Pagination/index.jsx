import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./styles.css";

export default function PaginationComponent({ page, handlePageChange, count }) {

  return (
    <div className="pagination-container">
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
          className="custom-pagination"
        />
      </Stack>
    </div>
  );
}