import { Route, Routes } from "react-router";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/books/:id" element={<BookDetails />} />
    </Routes>
  );
};

export default App;
