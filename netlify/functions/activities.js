const { Client } = require("pg");
const format = require("pg-format");
const fs = require("fs");
// const f = require('./cert')

// const cert = fs.readFileSync('./cert')

const client = new Client({
  host: "free-tier5.gcp-europe-west1.cockroachlabs.cloud",
  database: "jaded-orca-1425.defaultdb",
  password: "SP0sv1pRB_pb-ob0",
  port: 26257,
  user: "wane",
  // host: "free-tier5.gcp-europe-west1.cockroachlabs.cloud",
  // database: "soft-gopher-1424.defaultdb",
  // password: "vUAktHji5sBXzAmB",
  // port: "2657",
  // user: "nwani",
  ssl: {
    rejectUnauthorized: true,
    cert: process.env.DB_CERT
  },
});

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};


exports.handler = async ({ queryStringParameters }, context, callback) => {
  const { order } = queryStringParameters;

  try {
    await client.connect();

    const sqlStatement = format(
      "SELECT * FROM activities ORDER BY date_created %s",
      order || "ASC"
    );

    const { rows } = await client.query(sqlStatement);

    await client.end();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ data: rows }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "An internal server error occurred",
        error
      }),
    };
  }
};
