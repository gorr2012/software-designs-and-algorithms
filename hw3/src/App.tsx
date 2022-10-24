import React, {FC, useState, useEffect} from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Image, User, Account } from '../types';
import { Table, Filters, Sort, Search, Row } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

const getLastPayments = (accounts: Account[], id: string) => 
  ({
    lastPayments: accounts
      .find(account => id === account.userID).payments
      .sort((paymentA, paymentB) => new Date(paymentB.date).getTime() - new Date(paymentA.date).getTime())
      [0]?.totalSum ?? 0,
    posts: accounts.find(account => id === account.userID).posts
  });

const getAvatars = (images: Image[], id: string) => 
  images.map(({userID, url}) => ({userID, avatar: url})).find(el => id === el.userID);

const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Row[] => users.map(user => ({
    ...user,
    ...getAvatars(images, user.userID),
    ...getLastPayments(accounts, user.userID),
  })
);

const sort = (data: Row[], typeSort?: string) => {
  const newData = [...data];
  if(!typeSort) return newData;
  return newData.sort((a, b) => typeSort === 'desc' ? b.posts - a.posts : a.posts - b.posts);
}

const filter = (data: Row[], typeFilter?: string[]) => {
  switch (typeFilter.length) {
    case 1:
      return data.filter(item => typeFilter[0] === 'More than 100 posts' ? item.posts >= 100 : item.posts === 0);
    case 2:
      return data.filter(item => item.posts >= 100 || item.posts === 0);
    default:
      return data;
  }
}

const searched = (data: Row[], value?: string) => {
  if(!value) return [];
  return data.filter(item => item.country.toLowerCase().indexOf(value.toLowerCase()) >= 0);
}

const applyFilters = (data: Row[], selected?: string, filtered?: string[], search?: string) => {
  if (!filtered.length && !search) return sort(data, selected);

  const filteredData = filtered.length ? filter(data, filtered) : [];
  const searchData = searched(data, search);
  const modifiedData = Array.from(new Set([...searchData, ...filteredData]));
  const sorted = sort(modifiedData, selected);
  
  return sorted;
}

export const App: FC = () => {
  const [initialData, setInitialData] = useState<Row[]>([]);
  const [modifiedData, setModifiedData] = useState<Row[]>([]);
  const [sortValue, setSortValue] = useState<'asc' | 'desc'>(undefined);
  const [filterValue, setFilterValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  
  useEffect(() => {
    Promise.all([
      getImages(),
      getUsers(),
      getAccounts(),
    ]).then(([images, users, accounts]: [Image[], User[], Account[]]) => {
      const resData = dataConverter(users, accounts, images);
      setInitialData(resData);
      setModifiedData(resData);
    });
  }, []);
  
  useEffect(() => {
    setModifiedData(applyFilters(initialData, sortValue, filterValue, searchValue));
  }, [sortValue, filterValue, searchValue]);

  const handleSort = (value: 'asc' | 'desc') => {
    setSortValue(value);
  }

  const handleSearch = (value: string) => {
    setSearchValue(value);
  }

  const handleFilter = (value: string) => {
    setFilterValue(prev => prev.find(el => el === value) ? prev.filter(el => el !== value) : [...prev, value]);
  }
  
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters handleFilter={handleFilter}/>
            <Sort handleSort={handleSort}/>
          </div>
          <Search handleSearch={handleSearch}/>
        </div>
        <Table rows={modifiedData} />
      </div>
    </StyledEngineProvider>
  );
};
