import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated } from '@/src/interfaces/general'
import { State as AppState } from '@/src/state/store'
import { IBlog } from '@/src/interfaces/blogs'

type State = {
  blogs: Nullable<Paginated<IBlog>>
  toEditBlog: Nullable<IBlog>
}

const initialState: State = {
  blogs: null,
  toEditBlog: null,
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    initializeblogs: () => initialState,

    setBlogs: (state, action: PayloadAction<Paginated<IBlog>>) => {
      state.blogs = action.payload
    },

    addNewBlog: (state, action: PayloadAction<IBlog>) => {
      if (state.blogs) {
        state.blogs.items = [action.payload, ...state.blogs.items]
      }
    },

    setToEditBlog: (state, action: PayloadAction<IBlog>) => {
      state.toEditBlog = action.payload
    },

    removeToEditblog: (state) => {
      state.toEditBlog = null
    },

    removeBlogs: (state) => {
      state.blogs = null
    },
  },
})

export const { initializeblogs, setBlogs, removeBlogs, addNewBlog, setToEditBlog, removeToEditblog } = blogsSlice.actions

export default blogsSlice.reducer

export const selectBlogs = (state: AppState) => state.blogs
