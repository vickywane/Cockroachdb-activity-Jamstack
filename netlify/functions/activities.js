const { Client } = require("pg");
const format = require("pg-format");

const client = new Client({
  user: process.env.USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});

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
      body: JSON.stringify({ data: rows }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An internal server error occurred",
        error
      }),
    };
  }
};
