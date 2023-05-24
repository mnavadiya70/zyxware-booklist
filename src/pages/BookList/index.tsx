import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { Column, IBook } from "../../types/booklist";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router";
import bookListStore from "./BookListStore";

const columns: Column[] = [
  { id: "title", label: "Title" },
  { id: "author", label: "Author" },
  {
    id: "publication_date",
    label: "Publication Date",
    align: "right",
    format: (value) => moment(value).format("MM/DD/YYYY"),
  },
];

const BookList = observer(() => {
  let {
    bookList,
    page,
    rowsPerPage,
    search,
    filteredBookList,
    order,
    orderBy,
    setSearch,
    setPage,
    setRowsPerPage,
    setOrderAndOrderBy,
  } = bookListStore;
  bookList = toJS(bookList);
  const navigate = useNavigate();

  useEffect(() => {
    bookListStore.getAll();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ width: "100%", overflow: "hidden" }}>
      <h1 style={{ textAlign: "center" }}>Book List</h1>
      <Box display="flex" alignItems="right" marginY={3} justifyContent="right">
        <FormControl variant="outlined">
          <InputLabel htmlFor="standard-adornment-password">
            Search by author
          </InputLabel>
          <OutlinedInput
            id="standard-adornment-password"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        &nbsp;&nbsp;
        <FormControl variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select
            native
            label="Sort By"
            onChange={(e) => setOrderAndOrderBy(e.target.value)}
            value={[`${order}`, `${orderBy}`]}
          >
            <option value={["asc", "title"]}>Title ↑</option>
            <option value={["desc", "title"]}>Title ↓</option>
            <option value={["asc", "publication_date"]}>
              Publication date ↑
            </option>
            <option value={["desc", "publication_date"]}>
              Publication date ↓
            </option>
          </Select>
        </FormControl>
        &nbsp;&nbsp;
      </Box>

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookList.length > 0 ? (
              filteredBookList.map((row: IBook) => {
                return (
                  <TableRow key={row.ISBN}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            cursor:
                              column.id === "title" ? "pointer" : "inherit",
                          }}
                          onClick={() =>
                            column.id === "title"
                              ? navigate(`/books/${row.ISBN}`)
                              : undefined
                          }
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>No data</TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 100]}
        component="div"
        count={bookList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
});

export default BookList;
