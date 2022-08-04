import { configureStore } from '@reduxjs/toolkit';

import checkboxListReducer from './checkboxListSlice';
import ticketsReducer from './ticketsSlice';

export default configureStore({
  reducer: {
    checkboxList: checkboxListReducer,
    ticketsList: ticketsReducer,
  },
});
