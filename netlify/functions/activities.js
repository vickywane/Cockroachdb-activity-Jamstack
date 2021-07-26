const { Client } = require("pg");
const format = require("pg-format");

const client = new Client({
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  user: process.env.USERNAME,
  ssl: {
    rejectUnauthorized: false,
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ data: rows }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 505,
      headers,
      body: JSON.stringify({
        response: "An internal server error occurred",
        e,
      }),
    };
  }
};
