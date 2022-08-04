import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import logo from '../assets/img/Logo.svg';
import { fetchSearchId, fetchTicketsPart, getMoreFiveTickets } from '../store/ticketsSlice';
import { selectAll, selectCurrentTickets } from '../store/selectors';

import classes from './App.module.scss';
import LoadingSpin from './LoadingSpin';
import CheckboxList from './CheckboxList';
import SortList from './SortList';
import TicketsList from './TicketsList';

function App() {
  const dispatch = useDispatch();
  const selector = useSelector(selectAll);
  const selectedTickets = useSelector(selectCurrentTickets);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, []);

  useEffect(() => {
    if (selector.searchId && !selector.stopFetchTickets) {
      dispatch(fetchTicketsPart(selector.searchId));
    }
  }, [selector.searchId, selector.ticketsList, selector.requestError]);

  const showMoreTicketsBtn = selectedTickets.length > selector.countOfVisibleTickets && (
    <button onClick={() => dispatch(getMoreFiveTickets())} className={classes['btn-more-tickets']} type="button">
      Показать еще 5 билетов!
    </button>
  );

  const isZeroResultMessage = !selectedTickets.length && !selector.isLoading && (
    <Alert
      message="Результат фильтрации:"
      description="Рейсов, подходящих под заданные фильтры, не найдено."
      type="info"
      showIcon
    />
  );

  const isResourceIsntAvailableMessage = selector.ticketsListStatus === 'rejected' && (
    <Alert message="Сервис временно недоступен" type="error" showIcon />
  );

  const LoadingSpinner = selector.isLoading && selector.ticketsListStatus !== 'rejected' && <LoadingSpin />;

  return (
    <main className={classes.main}>
      <img className={classes.logo} src={logo} alt="logo" />
      <div className={classes.content}>
        <CheckboxList />
        <div className={classes['ticket-block']}>
          <SortList />
          {isZeroResultMessage}
          {isResourceIsntAvailableMessage}
          {LoadingSpinner}
          <TicketsList selectedTickets={selectedTickets.slice(0, selector.countOfVisibleTickets)} />
          {showMoreTicketsBtn}
        </div>
      </div>
    </main>
  );
}

export default App;
