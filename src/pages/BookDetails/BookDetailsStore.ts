import { makeAutoObservable, observable, action } from "mobx";
import { IBook } from "../../types/booklist";
import { get } from "../../services/BookService";

class BookDetailsStore {
  @observable isbn: string;
  @observable bookDetail: any;
  @observable errorMessage: string;

  constructor() {
    makeAutoObservable(this);
    this.isbn = "";
    this.bookDetail = null;
    this.errorMessage = "";
  }

  @action
  setISBN = (isbn: string) => {
    this.isbn = isbn;
  };

  @action
  get = async (isbn: string) => {
    const data = await get(isbn);
    if (data.status !== 200) {
      this.errorMessage = "There is some error while getting data.";
      return;
    }
    this.bookDetail = data.data.book;
  };
}
const bookDetailsStore = new BookDetailsStore();
export default bookDetailsStore;
