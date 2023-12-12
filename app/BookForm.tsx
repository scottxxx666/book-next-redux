import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Book} from "@/lib/book/bookSlice";

export default function BookForm({open, close, save, bookProp}: {
  open: boolean,
  close: () => void,
  save: (book: Book) => void,
  bookProp?: Book,
}) {
  const initBook = useCallback(() => {
    return {
      ...bookProp ?? {
        id: "",
        name: "",
        category: "",
        price: 0,
        description: "",
      }
    }
  }, [bookProp])

  const [book, setBook] = useState(initBook());

  useEffect(() => {
    setBook(initBook())
  }, [bookProp, initBook])

  function createBook() {
    save(book)

    setBook(initBook());

    close()
  }

  function handleBookChange(e: ChangeEvent<HTMLInputElement>) {
    setBook(book => ({
      ...book,
      [e.target.name]: e.target.value
    }))
  }

  function cancel() {
    setBook(initBook());
    close()
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
    >
      <DialogTitle>New Book</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          type="string"
          fullWidth
          value={book.name}
          onChange={handleBookChange}
        />
        <TextField
          margin="dense"
          label="Category"
          name="category"
          type="string"
          fullWidth
          value={book.category}
          onChange={handleBookChange}
        />
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          fullWidth
          value={book.price}
          onChange={handleBookChange}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          type="number"
          fullWidth
          value={book.description}
          onChange={handleBookChange}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <button onClick={cancel}>Cancel</button>
        <button onClick={createBook}>Save</button>
      </DialogActions>
    </Dialog>
  )
}
