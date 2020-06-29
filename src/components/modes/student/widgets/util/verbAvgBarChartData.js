export const getVerbsTypesForBarChart = actions => {
  const verbs = [];
  actions.forEach(action => {
    const { verb } = action;
    if (verb && !verbs.includes(verb)) {
      verbs.push(verb);
      verbs.push(`${verb}Avg`);
    }
  });
  verbs.sort();
  return verbs;
};

export const formatDataForChart = (key, value, attribute) => {
  const data = [];
  key.forEach(entry => {
    const entryObj = {};
    entryObj[attribute] = entry;
    value.forEach(v => {
      entryObj[v] = 0;
    });
    data.push(entryObj);
  });

  return data;
};

function isActionInRange(data, createdAt) {
  const correspondingObject = data.find(
    obj => obj.date === new Date(createdAt).toLocaleDateString(),
  );
  return correspondingObject;
}

function calculateAvg(verbs, data, nbOfUsers) {
  const verbsAvg = verbs.filter(e => e.indexOf('Avg') !== -1);
  data.forEach(e => {
    verbsAvg.forEach(verbAvg => {
      e[verbAvg] /= nbOfUsers;
    });
  });
  return data;
}

export const fillData = (actions, dataFormat, id, verbs, nbOfUsers) => {
  const data = dataFormat;
  actions.forEach(entry => {
    const { createdAt, verb, userId } = entry;
    const correspondingObject = isActionInRange(data, createdAt);

    // if the action is done by this user in the date range chosen: Increment the type of verb that he had done
    if (userId === id && verb && correspondingObject) {
      correspondingObject[verb] += 1;
      correspondingObject[`${verb}Avg`] += 1;
    }
    if (verb && correspondingObject) {
      correspondingObject[`${verb}Avg`] += 1;
    }
  });

  return calculateAvg(verbs, data, nbOfUsers);
};

export const AddSelectedAction = (Obj, properties) => {
  const newObj = {};
  newObj.date = Obj.date;
  Object.keys(Obj).forEach(key => {
    if (properties.indexOf(key) !== -1) {
      newObj[key] = Obj[key];
      newObj[`${key}Avg`] = Obj[`${key}Avg`];
    }
  });

  return newObj;
};

export const displayTheSelectedData = (data, properties) => {
  const newArr = [];

  data.forEach(e => {
    const Obj = AddSelectedAction(e, properties);
    newArr.push(Obj);
  });

  return newArr;
};
