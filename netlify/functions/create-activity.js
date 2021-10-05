require("dotenv").config();
const { Client } = require("pg");
const format = require("pg-format");
const { v4 } = require("uuid");

const client = new Client({
  user: process.env.USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});

exports.handler = async ({ body }, context, callback) => {
  const { duration, activity_type, distance, description, name } =
    JSON.parse(body);

  try {
    await client.connect();

    const uuid = v4();
    const sqlStatement = format(
      "INSERT INTO activities(id, name, description , activity_type, duration, distance, date_created) VALUES(%L, %L, %L, %L, %L, %L, %L)",
      uuid,
      name,
      description,
      activity_type,
      duration,
      distance,
      new Date()
    );

    try {
      await client.query(sqlStatement);

      await client.end()

      return {
        statusCode: 200,
        body: JSON.stringify({ response: `${activity_type} activity created` }),
      };
    } catch (e) {
      return {
        statusCode: 422,
        body: JSON.stringify({ response: "Error inserting activity" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An internal error occurred. Try again later",
        error
      }),
    };
  }
};
