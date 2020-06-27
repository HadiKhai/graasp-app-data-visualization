import { connect } from 'react-redux';
import getDateById from '../../../../../reducers/chartDateById';

import BarChart from '../components/BarChart';
import {
  createDataForBarChart,
  fillDataForBarChart,
  fillTheDates,
  Occurrence,
} from '../util';

const id = 'VerbChart';
const xAxis = 'date';
const yAxis = 'Occurrence';

const BarData = (actions, from, to) => {
  if (actions && from && to) {
    const verbs = Occurrence(actions, 'verb');

    const dates = fillTheDates(from, to);

    const dataFormat = createDataForBarChart(dates, verbs, 'date');

    return fillDataForBarChart(actions, dataFormat);
  }
  if (actions) {
    const verbs = Occurrence(actions, 'verb');
    let dates = Occurrence(actions, 'createdAt');

    dates = fillTheDates(dates[0], dates[dates.length - 1]);

    const dataFormat = createDataForBarChart(dates, verbs, 'date');

    return fillDataForBarChart(actions, dataFormat);
  }
  return {};
};
const colors = {
  change: '#9696ff',
  access: '#7878fa',
  open: '#6464e6',
  login: '#3f3cbe',
  navigate: '#5a5adc',
  create: '#3232b4',
  unload: '#8082a5',
  cancel: '#8082a5',
  logout: '#5050d2',
};

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
  data: BarData(state.action.content, from(state), to(state)),
  keys: Occurrence(state.action.content, 'verb'),
  colors,
  indexBy: 'date',
  xAxis,
  yAxis,
});

export default connect(mapStateToProps)(BarChart);
