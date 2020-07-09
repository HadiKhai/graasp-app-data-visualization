import React from 'react';

import VerbChart from './containers/VerbChart';
import KeyedDatePicker from '../../../common/KeyedDatePicker';
import { VERB_CHART_DATE_PICKER_ID } from './types';

const VerbWidget = () => {
  const initialState = {
    from: new Date('2019-05-20'),
    to: new Date('2019-05-31'),
  };

  return (
    <div>
      <VerbChart />
      <KeyedDatePicker
        id={VERB_CHART_DATE_PICKER_ID}
        initialValue={initialState}
      />
    </div>
  );
};

export default VerbWidget;
