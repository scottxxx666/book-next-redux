import {addBook, Book} from "@/lib/book/bookSlice";
import BookForm from "@/app/BookForm";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";

export default function BookCreate({open, close}: { open: boolean, close: () => void }) {

  const dispatch = useDispatch();

  function createBook(book: Book) {
    const uuid = uuidv4();
    dispatch(addBook({
      id: uuid,
      name: book.name,
      category: book.category,
      price: book.price,
      description: book.description,
    }))
  }

  return (
    <BookForm open={open} close={close} save={createBook}/>
  )
}
