'use client'

import {useAppSelector} from "@/lib/hooks";
import {addBook, removeBook, selectBooks} from "@/lib/book/bookSlice";
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
import {useState} from "react";

export default function Home() {
  const books = useAppSelector(selectBooks);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  function createBook() {
    const uuid = uuidv4();
    dispatch(addBook({
      id: uuid,
      name: name,
      category: category,
      price: price,
      description: description,
    }))

    setName('');
    setCategory('');
    setPrice(0);
    setDescription('');

    closeNewBook()
  }

  const [open, setOpen] = useState(false);

  function closeNewBook() {
    setOpen(false);
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
            type="string"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Category"
            type="string"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Description"
            type="number"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
