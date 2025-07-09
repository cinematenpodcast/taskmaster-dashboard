import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    setTasksLoading: (state) => {
      state.status = 'loading';
    },
    setTasksFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setTasks, setTasksLoading, setTasksFailed } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.data;
export const selectTasksStatus = (state) => state.tasks.status;

export default tasksSlice.reducer; 