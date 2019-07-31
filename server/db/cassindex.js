const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'alsoviewed',
  pooling: {
    maxRequestsPerConnection: 32768,
  },
});

const ViewedItems = `CREATE TABLE vieweditems (
    id int,
    image text,
    title text,
    itemurl text,
    oldprice decimal,
    currentprice decimal,
    freesheeping boolean,
    shippingcost decimal,
    categoryid int,
    PRIMARY KEY (id, categoryid)
  ) WITH CLUSTERING ORDER BY (categoryid DESC);
`;
const getCategoryId = (id, categoryid) => {
  const query = 'SELECT * FROM vieweditems WHERE id = ? AND categoryid = ?;';
  return client.execute(query, [id, categoryid], { prepare: true });
};

module.exports = { ViewedItems, getCategoryId, client };
