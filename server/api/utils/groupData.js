const groupById = (array, obj, property1, property2) => {
  array.forEach(row => {
    obj[row.dm_id] = {
      name: `${row.first_name} ${row.last_name}`,
      [property1]: row[property1],
      [property2]: row[property2]
    };
  });
};
const groupRowData = (array, obj, property) => {
  array.forEach(row => {
    obj[row.dm_id][property] = obj[row.dm_id][property] || [];
    obj[row.dm_id][property] = [
      ...obj[row.dm_id][property],
      { ...row }
      // { date: row.date, minutes: row.minutes, timeframe: row.timeframe }
    ];
  });
};
const objToArray = obj =>
  Object.keys(obj).reduce(
    (acc, cur) => [...acc, { ...obj[cur], dm_id: cur }],
    []
  );

module.exports = { groupById, groupRowData, objToArray };
