import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  formatMinutesDurationToHours,
  formatCorrectTransfersText,
  calculateFlightStart,
  calculateFlightEnd,
  formatPrice,
} from '../helpers';

import classes from './App.module.scss';

const TicketsList = ({ selectedTickets }) => {
  return selectedTickets.map((ticket) => {
    return (
      <button type="button" className={classes.ticket} key={uuidv4()}>
        <div className={classes['info-row']}>
          <div className={classes.price}>{formatPrice(ticket.price)}</div>
          <img className={classes['company-logo']} alt="logo" src={`//pics.avs.io/99/36/${ticket.carrier}.png`} />
        </div>
        <div className={classes.info}>
          {ticket.segments.map((transfer) => {
            return (
              <div className={classes['info-row']} key={uuidv4()}>
                <div className={classes['info-block']}>
                  <div className={classes['block-header']}>
                    {transfer.origin} – {transfer.destination}
                  </div>
                  <div className={classes['block-description']}>
                    {`${calculateFlightStart(Date.parse(transfer.date))} - ${calculateFlightEnd(
                      Date.parse(transfer.date),
                      transfer.duration
                    )}`}
                  </div>
                </div>
                <div className={classes['info-block']}>
                  <div className={classes['block-header']}>В пути</div>
                  <div className={classes['block-description']}>{formatMinutesDurationToHours(transfer.duration)}</div>
                </div>
                <div className={classes['info-block']}>
                  <div className={classes['block-header']}>{formatCorrectTransfersText(transfer.stops.length)}</div>
                  <div className={classes['block-description']}>{transfer.stops.join(', ')}</div>
                </div>
              </div>
            );
          })}
        </div>
      </button>
    );
  });
};

export default TicketsList;
