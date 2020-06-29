import { makeMultiGetter, makeMultiReducer } from 'dextrous';
import chartData from './chartData';

const chartDataById = makeMultiReducer(chartData);
export default chartDataById;

export const getDateById = makeMultiGetter(chartData);
