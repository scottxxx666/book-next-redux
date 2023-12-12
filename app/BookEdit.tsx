import {addBook, Book, editBook} from "@/lib/book/bookSlice";
import BookForm from "@/app/BookForm";
import {useDispatch} from "react-redux";

export default function BookEdit({open, close, bookProp}: { open: boolean, close: () => void, bookProp: Book }) {
  const dispatch = useDispatch();

  function updateBook(book: Book) {
    dispatch(editBook({
      id: book.id,
      name: book.name,
      category: book.category,
      price: book.price,
      description: book.description,
    }))
  }

  return (
    <BookForm open={open} close={close} save={updateBook} bookProp={bookProp}/>
  )
}
