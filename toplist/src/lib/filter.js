import _ from 'lodash';

export const filterByText = (dataCollection, dataToFilterBy, filteringText) =>
  _.filter(dataCollection, (data) =>
    _.get(data, dataToFilterBy)
      .toLowerCase()
      .includes(filteringText.toLowerCase())
  );

export const getOrderedDataByPage = (
  dataCollection,
  orderBy,
  order,
  page,
  rowsPerPage
) =>
  _.slice(
    _.orderBy(dataCollection, orderBy, order),
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

export const getNewOrderDirecton = (
  currentOrderBy,
  newOrderBy,
  currentOrder
) => {
  const isSameOrderBy = _.isEqual(currentOrderBy, newOrderBy);
  const isAsc = _.isEqual(currentOrder, 'asc');
  return isSameOrderBy && isAsc ? 'desc' : 'asc';
};

export const findAll = (collection, search) => {
  const searchFor = _.values(search)[0];
  const searchBy = _.keys(search)[0];
  return _.reduce(
    collection,
    (result, member) => {
      if (member[searchBy] === searchFor) {
        result.push(member);
        return result;
      }
      return result;
    },
    []
  );
};
