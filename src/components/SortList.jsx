import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Radio } from 'antd';

import { onTabListClick } from '../store/ticketsSlice';
import classes from './App.module.scss';

function SortList() {
  const dispatch = useDispatch();

  const [sortValue, setSortValue] = useState('Самый дешевый');

  const tabList = [
    {
      label: 'Самый дешевый',
      value: 'Самый дешевый',
    },
    {
      label: 'Самый быстрый',
      value: 'Самый быстрый',
    },
    {
      label: 'Оптимальный',
      value: 'Оптимальный',
    },
  ];

  const onChange = ({ target: { value } }) => {
    setSortValue(value);
    dispatch(onTabListClick(value));
  };

  return (
    <Radio.Group
      className={classes['radio-group']}
      options={tabList}
      onChange={onChange}
      value={sortValue}
      optionType="button"
      buttonStyle="solid"
    />
  );
}

export default SortList;
