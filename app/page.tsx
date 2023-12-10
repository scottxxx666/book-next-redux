'use client'

import {useAppSelector} from "@/lib/hooks";
import {addBook, removeBook, selectBooks} from "@/lib/book/bookSlice";
import {useDispatch} from "react-redux";

export default function Home() {
  const books = useAppSelector(selectBooks);
  const dispatch = useDispatch();

  function saveBook() {
    dispatch(addBook({
      id: 'id 2',
      name: 'Book 2',
      category: 'Category 2',
      price: 101,
      description: 'Description 2'
    }))
  }

  return (
    <main>
      {books.map(book => (
        <div key={book.id}>
          <h1>{book.name}</h1>
          <div>{book.category}</div>
          <div>{book.price}</div>
          <p>{book.description}</p>
          <button onClick={() => dispatch(removeBook(book.id))}>-</button>
        </div>
      ))}
      <button onClick={saveBook}>+</button>
    </main>
  )
}
