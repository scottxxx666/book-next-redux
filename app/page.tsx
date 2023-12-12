'use client'

import {useAppSelector} from "@/lib/hooks";
import {addBook, Book, removeBook, selectBooks} from "@/lib/book/bookSlice";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog, DialogActions,
  DialogContent, DialogTitle,
  Stack, TextField,
  Typography
} from "@mui/material";
import {ChangeEvent, useState} from "react";

export default function Home() {
  const books = useAppSelector(selectBooks);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({} as Book);

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

    closeNewBook()
  }

  function closeNewBook() {
    setOpen(false);
  }

  function handleBookChange(e: ChangeEvent<HTMLInputElement>) {
    setBook(book => ({
      ...book,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Box sx={{
      width: "80vw",
      maxWidth: "600px",
      mx: "auto",
      marginTop: "4%",
    }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Book List</Typography>
        <button onClick={() => setOpen(true)}>+</button>
      </Stack>
      {books.map(book => (
        <Card key={book.id}>
          <CardHeader title={book.name} subheader={book.category}>
          </CardHeader>
          <Stack direction="row" justifyContent="space-between">
            <CardContent>
              <div>Price: {book.price}</div>
              <p>{book.description}</p>
            </CardContent>
            <CardActions>
              <button onClick={() => dispatch(removeBook(book.id))}>-</button>
            </CardActions>
          </Stack>
        </Card>
      ))}
      <Dialog
        open={open}
        onClose={closeNewBook}
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
          <button onClick={closeNewBook}>Cancel</button>
          <button onClick={createBook}>Save</button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
