'use client'

import {useAppSelector} from "@/lib/hooks";
import {removeBook, selectBooks} from "@/lib/book/bookSlice";
import {useDispatch} from "react-redux";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography
} from "@mui/material";
import {useState} from "react";
import BookCreate from "@/app/BookCreate";

export default function Home() {
  const books = useAppSelector(selectBooks);
  const dispatch = useDispatch();

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
      <BookCreate open={open} close={closeNewBook}/>
    </Box>
  )
}
