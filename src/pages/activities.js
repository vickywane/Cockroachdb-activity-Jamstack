import React, { useState, useEffect } from "react";
import "../App.css";

const data = [
  {
    id: 1,
    name: "Sample Activity",
    dateCreated: new Date(),
    activityType: "Hiking",
    duration: "2 hours",
    distance: "2km",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
  },
  {
    id: 1,
    name: "Sample Activity 2",
    dateCreated: new Date(),
    activityType: "Hiking",
    duration: "",
    distance: "",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
  },
];

const activities = ["Hiking", "Skating", "Swimming", "Soccer"];

const Activities = () => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [isFetchingActivities, setIsFetchingActivities] = useState(true);

  useEffect(() => {
    fetchActivities();

    return () => fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const body = await fetch(
        `${process.env.REACT_APP_FUNCTION_ENDPOINT}/activities`,
        {
          method: "GET",
          headers: {},
        }
      );

      const { data } = await body.json();

      setActivitiesData(data);
    } catch (e) {
      console.log("error fetching data", e);
    } finally {
      setIsFetchingActivities(false);
    }
  };

  const [selectedActivity, selectActivity] = useState(null);
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div className="activities">
      <div className="activity-header">
        <h2 className="title"> Outdoor Activity Tracker </h2>
      </div>
      <br />
      <div className={"activities-items"}>
        <div className="flex">
          <h2 className="title"> Create New Activity </h2>
        </div>
        <hr />

        <div>
          <label id={"newActivity"}> Activity Description: </label>
          <br />

          <div className="align-center">
            <input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className={"input-element"}
              type={"text"}
              placeholder={"What is your activity about?"}
            />
          </div>

          <br />

          <label> Activity Type: </label>
          <ul className={"type-list"}>
            {activities.map((i) => (
              <li
                className={"activity-type"}
                onClick={() => selectActivity(i)}
                style={{
                  background: i === selectedActivity && "#6933ff",
                  color: i === selectedActivity && "#fff",
                  border: i === selectedActivity && 0,
                }}
              >
                <p>{i}</p>
              </li>
            ))}
          </ul>

          <div className="flex" style={{ flexDirection: "column" }}>
            <label>Distance Covered</label>
            <input
              value={distance}
              onChange={({ target }) => setDistance(target.value)}
              className="input-element"
              placeholder={"Distance Covered"}
            />
          </div>
          <br />

          <div className="flex" style={{ flexDirection: "column" }}>
            <label>Total Time Spent</label>
            <input
              value={duration}
              onChange={({ target }) => setDuration(target.value)}
              className="input-element"
              placeholder={"Total Time Spent"}
            />
          </div>
        </div>
        <br />
        <br />
        <br />

        <div className={"flex"} style={{ justifyContent: "space-between" }}>
          <div className={"align-center"}>
            <h2 className="title"> All Outdoor Activities </h2>
          </div>

          <div className={"flex"}>
            <p style={{ margin: "0 .5rem" }}> Sort By: </p>
            <div>
              <select className={"align-center"}>
                <option> Date Created </option>
                <option> Distance Covered</option>
                <option> Total Duration </option>
              </select>
            </div>
          </div>
        </div>
        <hr />

        <ul className={"cards-list"}>
          {activitiesData.map(
            ({
              activity_type,
              duration,
              distance,
              date_created,
              name,
              id,
              description,
            }) => {
              return (
                <li key={id}>
                  <div className={"card"}>
                    <div
                      className="flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div>
                        <h2 className="title-sm"> {name} </h2>

                        <div className="flex">
                          <i
                            style={{
                              fontSize: "1.2rem",
                              marginRight: ".4rem",
                              padding: 0,
                            }}
                            class="bi bi-calendar-date"
                          ></i>
                          <p> {date_created.toString()} </p>
                        </div>
                      </div>

                      <div className="activity-type">
                        <p> {activity_type} </p>
                      </div>
                    </div>

                    <hr />

                    <div
                      className={"flex"}
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className="flex">
                        <i
                          style={{
                            fontSize: "1.2rem",
                            marginRight: ".3rem",
                          }}
                          class="bi bi-stopwatch"
                        ></i>

                        <p> {duration} Spent </p>
                      </div>

                      <div className="flex">
                        <i
                          style={{
                            fontSize: "1.2rem",
                            marginRight: ".3rem",
                          }}
                          class="bi bi-cone-striped"
                        ></i>

                        <p> {distance} Covered </p>
                      </div>
                    </div>

                    <p>{description}</p>
                    <hr />
                    <div
                      className="flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      .<button className="delete-btn">Delete Activity</button>
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default Activities;
