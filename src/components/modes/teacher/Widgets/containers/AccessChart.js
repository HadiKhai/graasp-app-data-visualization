import { connect } from 'react-redux';
import getDateById from '../../../../../reducers/chartDateById';

import LineChart from '../components/LineChart';
import {
  ChangePropertyNameOfObjectFromArray,
  createObjectForLine,
  DataPicking,
  fillTheDates,
  RemovePropertyOfObjectFromArray,
  TotalAccesses,
  UniqueAccesses,
} from '../util';

const id = 'AccessChart';
const xAxis = 'date';
const yAxis = 'Visits';

const AccessData = (actions, from, to) => {
  const data = [];
  const date = fillTheDates(from, to);

  let accesses = DataPicking(
    actions,
    ['createdAt', 'verb', 'userId'],
    [undefined, 'navigate', undefined],
  );

  accesses = RemovePropertyOfObjectFromArray(accesses, 'verb');

  accesses = ChangePropertyNameOfObjectFromArray(accesses, 'createdAt', 'date');

  let totalAccesses = TotalAccesses(accesses, 'date', date);

  let uniqueAccesses = UniqueAccesses(accesses, 'date', 'userId', date);

  totalAccesses = createObjectForLine('Total', totalAccesses);
  uniqueAccesses = createObjectForLine('Unique', uniqueAccesses);
  data.push(totalAccesses);
  data.push(uniqueAccesses);

  return data;
};

const colors = {
  Unique: '#82ca9d',
  Download: '#8884d8',
};

const getColor = bar => colors[bar.id];

const from = state => {
  const { chartDateById } = state;
  if (chartDateById) {
    const Obj = getDateById(chartDateById, id)[id];
    if (Obj) {
      return Obj.from;
    }
  }
  return undefined;
};

const to = state => {
  const { chartDateById } = state;
  if (chartDateById) {
    const Obj = getDateById(chartDateById, id)[id];
    if (Obj) {
      return Obj.to;
    }
  }
  return undefined;
};

const mapStateToProps = state => ({
  data: AccessData(state.action.content, from(state), to(state)),
  colors: getColor,
  xAxis,
  yAxis,
});

export default connect(mapStateToProps)(LineChart);
