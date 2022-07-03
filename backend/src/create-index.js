const esClient = require("./elastic-client");

const createIndex = async (indexName) => {
    await esClient.indices.create({ index: indexName });
    console.log(`Index created with name: ${indexName}`);
};

createIndex("posts");