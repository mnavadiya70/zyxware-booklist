import { makeAutoObservable, observable, action } from "mobx";
import { IBook } from "../../types/booklist";
import { getAll } from "../../services/BookService";

class BookListStore {
  @observable bookList: IBook[];
  @observable filteredBookList: IBook[];
  @observable page: number;
  @observable rowsPerPage: number;
  @observable errorMessage: string;
  @observable search: string;
  @observable orderBy: string;
  @observable order: string;

  constructor() {
    makeAutoObservable(this);
    this.bookList = [];
    this.filteredBookList = [];
    this.page = 0;
    this.rowsPerPage = 5;
    this.errorMessage = "";
    this.search = "";
    this.order = "asc";
    this.orderBy = "publication_date";
  }

  @action
  setPage = (page: number) => {
    this.page = page;
    this.getFilteredData();
  };

  @action
  setRowsPerPage = (rows: number) => {
    this.rowsPerPage = rows;
    this.getFilteredData();
  };

  @action
  setSearch = (value: string) => {
    this.search = value;
    this.getFilteredData();
  };

  @action
  setOrderAndOrderBy = (value: any) => {
    const values = value.split(",");
    this.order = values[0].trim();
    this.orderBy = values[1].trim();
    this.getFilteredData();
  };

  @action
  getFilteredData = () => {
    let books = [...this.bookList];
    books = books
      .filter((book) =>
        this.search
          ? book.author
              .trim()
              .toLowerCase()
              .includes(this.search.trim().toLowerCase())
          : true
      )
      .sort((a: any, b: any) => {
        if (this.order === "asc") {
          return a[this.orderBy] > b[this.orderBy] ? 1 : -1;
        } else if (this.order === "desc") {
          return a[this.orderBy] > b[this.orderBy] ? -1 : 1;
        }
        return 0;
      })
      .slice(
        this.page * this.rowsPerPage,
        this.page * this.rowsPerPage + this.rowsPerPage
      );
    this.filteredBookList = [...books];
  };

  @action
  getAll = async () => {
    const data = await getAll();
    if (data.status !== 200) {
      this.errorMessage = "There is some error while getting data.";
      return;
    }
    let list: IBook[] = [];
    list = data.data.books.map((item: any) => {
      const maxDate = Date.now();
      const timestamp = Math.floor(Math.random() * maxDate);
      const randomDate = new Date(timestamp);
      return {
        title: item.title,
        author: item.author,
        ISBN: item.ISBN,
        publication_date: randomDate,
      };
    });

    this.bookList = [...list];
    this.getFilteredData();
  };
}
const bookListStore = new BookListStore();
export default bookListStore;
