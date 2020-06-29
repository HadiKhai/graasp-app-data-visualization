import moment from 'moment';

import getDateById from '../../../../../reducers/chartDataById';

export const fromDate = (chartDataById, id) => {
  if (chartDataById) {
    const Obj = getDateById(chartDataById, id)[id];
    if (Obj) {
      return Obj.from;
    }
  }
  return undefined;
};

export const toDate = (chartDataById, id) => {
  if (chartDataById) {
    const Obj = getDateById(chartDataById, id)[id];
    if (Obj) {
      return Obj.to;
    }
  }
  return undefined;
};

export const selectedActions = (chartDataById, id) => {
  if (chartDataById) {
    const Obj = getDateById(chartDataById, id)[id];
    if (Obj) {
      return Obj.payload;
    }
  }
  return [];
};

export const buildDateRange = (from, to) => {
  const dates = [];
  const fromTemp = new Date(from);
  const toTemp = new Date(to);
  while (fromTemp <= toTemp) {
    dates.push(fromTemp.toLocaleDateString());
    fromTemp.setDate(fromTemp.getDate() + 1);
  }
  return dates;
};

export const Occurrence = (actions, attribute) => {
  const data = [];
  actions.forEach(action => {
    let entry = action[attribute];

    if (attribute === 'createdAt') {
      entry = entry.slice(0, 10);
    }
    if (entry && !data.includes(entry)) {
      data.push(entry);
    }
  });
  data.sort();

  return data;
};

export const filterVerbs = (verbList, list) => {
  let filteredList = [];
  verbList.forEach(verb => {
    if (list.indexOf(verb) === -1) {
      filteredList = [...filteredList, verb];
      console.log(filteredList);
    }
  });

  return filteredList;
};

export const RemovePropertyOfObject = (Obj, property) => {
  const newObj = {};

  Object.keys(Obj).forEach(key => {
    if (key !== property) {
      newObj[key] = Obj[key];
    }
  });

  return newObj;
};

export const RemovePropertyOfObjectFromArray = (arr, property) => {
  const newArr = [];

  arr.forEach(e => {
    const Obj = RemovePropertyOfObject(e, property);
    newArr.push(Obj);
  });

  return newArr;
};

export const RemoveAttributeOfObject = (Obj, property) => {
  const newObj = {};

  Object.keys(Obj).forEach(key => {
    if (key !== property) {
      newObj[key] = Obj[key];
    }
  });

  return newObj;
};

export const RemoveObjectWithAttributeFromArray = (
  arr,
  property,
  attribute,
) => {
  const newArr = [];

  arr.forEach(e => {
    if (!attribute.includes(e[property])) {
      newArr.push(e);
    }
  });

  return newArr;
};

export const changeDateFormat = date => {
  return moment(date).format('D/M');
};

export const changeDateFormatForBarChart = arr => {
  const newArr = [...arr];

  newArr.forEach(e => {
    const { date } = e;

    e.date = changeDateFormat(date);
  });
  return newArr;
};
