import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/lib/store";

export interface Book {
  id: string
  name: string
  price: number
  category: string
  description: string
}

const initialState: Book[] = [{
  id: "id 1",
  name: 'Book 1',
  price: 100,
  category: 'Category 1',
  description: 'Description 1',
}]

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    value: initialState,
  },
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.value.push(action.payload)
    },
    removeBook: (state, action) => {
      state.value = state.value.filter(book => book.id !== action.payload)
    },
    editBook: (state, action) => {
      state.value = state.value.map(book => {
        if (book.id !== action.payload.id) {
          return book
        }

        return {
          ...book,
          ...action.payload
        }
      })
    },
  }
})

export const {addBook, removeBook, editBook} = bookSlice.actions

export const selectBooks = (state: RootState) => state.books.value

export default bookSlice.reducer

