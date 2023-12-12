'use client'

import {useAppSelector} from "@/lib/hooks";
import {Book, removeBook, selectBooks} from "@/lib/book/bookSlice";
import {useDispatch} from "react-redux";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import {useState} from "react";
import BookCreate from "@/app/BookCreate";
import BookEdit from "@/app/BookEdit";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookList() {
  const books = useAppSelector(selectBooks);
  const dispatch = useDispatch();

  const [bookCreateToggle, setBookCreateToggle] = useState(false);
  const [bookEditToggle, setBookEditToggle] = useState(false);
  const [selectedBook, setSelectedBook] = useState({} as Book)

  function openBookEdit(book: Book) {
    setSelectedBook(book)
    setBookEditToggle(true)
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
        <IconButton
          arial-label="add a book"
          onClick={() => setBookCreateToggle(true)}>
          <AddIcon/>
        </IconButton>
      </Stack>
      {books.map(book => (
        <Card key={book.id} sx={{mb: 2}}>
          <Stack direction="row" justifyContent="space-between">
            <CardActionArea onClick={() => openBookEdit(book)}>
              <CardHeader title={book.name} subheader={book.category}/>
              <CardContent>
                <Typography>Price: {book.price}</Typography>
                <Typography sx={{whiteSpace: "pre-wrap"}}>{book.description}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <IconButton
                arial-label="delete the book"
                onClick={() => dispatch(removeBook(book.id))}>
                <DeleteIcon/>
              </IconButton>
            </CardActions>
          </Stack>
        </Card>
      ))}
      <BookCreate open={bookCreateToggle} close={() => setBookCreateToggle(false)}/>
      <BookEdit open={bookEditToggle} close={() => setBookEditToggle(false)} bookProp={selectedBook}/>
    </Box>
  )
}
