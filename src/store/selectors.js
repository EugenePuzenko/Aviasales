import { createSelector } from '@reduxjs/toolkit';
import { filterTicketsListByTransfers, sortTickets } from '../helpers';

export const selectAll = (store) => store.ticketsList;
export const selectCheckboxList = (store) => store.checkboxList.checkboxList;

export const selectTickets = (store) => store.ticketsList.ticketsList;
export const selectFilters = (store) => store.ticketsList.filtersList;
export const selectSortType = (store) => store.ticketsList.sortType;

export const selectCurrentTickets = createSelector(
  [selectTickets, selectFilters, selectSortType],
  (allTickets, filters, sortType) => {
    return filterTicketsListByTransfers(sortTickets([...allTickets], sortType), filters);
  }
);
