import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {addBook, Book} from "@/lib/book/bookSlice";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";

function initBook() {
  return {
    id: "",
    name: "",
    category: "",
    price: 0,
    description: "",
  }
}

export default function BookForm({open, close, save}: {
  open: boolean,
  close: () => void,
  save: (book: Book) => void
}) {

  const [book, setBook] = useState(initBook());

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
    setBook({} as Book);
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
