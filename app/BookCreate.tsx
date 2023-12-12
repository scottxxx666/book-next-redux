import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {addBook, Book} from "@/lib/book/bookSlice";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";

export default function BookCreate({open, close}: { open: boolean, close: () => void }) {
  const [book, setBook] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
  } as Book);

  const dispatch = useDispatch();

  function createBook() {
    const uuid = uuidv4();
    dispatch(addBook({
      id: uuid,
      name: book.name,
      category: book.category,
      price: book.price,
      description: book.description,
    }))

    setBook({} as Book);

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
