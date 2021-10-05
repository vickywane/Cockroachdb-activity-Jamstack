import React, { useState } from "react";
import { navigate } from "@reach/router";
import "../app.css";

const activities = ["Hiking", "Skating", "Swimming", "Soccer"];

const CreateActivity = () => {
 const [isLoading, setLoading] = useState(false);
 const [selectedActivity, selectActivity] = useState(null);
 const [activityName, setActivityName] = useState("");
 const [description, setDescription] = useState("");
 const [distance, setDistance] = useState("");
 const [duration, setDuration] = useState("");

 const createAnActivity = async () => {
   setLoading(true);

   try {
     await fetch(`http://localhost:5050/.netlify/functions/create-activity`, {
       method: "POST",
       body: JSON.stringify({
         duration,
         distance,
         description,
         activity_type: selectedActivity,
         name: activityName,
       })
     });
   } catch (e) {
     console.log(e);
   } finally {
     setLoading(false);
   }
 };

 return (
   <div className="activities" style={{ height: "100vh" }}>
     <header className="activity-header">
       <h2 className="title"> Outdoor Activity Tracker </h2>
     </header>
     <br />

     <div className={"activities-items"}>
       <div className="flex" style={{ justifyContent: "space-between" }}>
         <h2 className="title"> Create New Activity </h2>

         <div className="align-center">
           <button onClick={() => navigate("/")} className="activity-btn">View Previous Activities</button>
         </div>
       </div>
       <hr />
       <div>
         <label id={"newActivity"}> Activity Name: </label>
         <br />

         <div className="align-center">
           <input
             value={activityName}
             onChange={(e) => {
               setActivityName(e.target.value);
             }}
             className={"input-element"}
             type={"text"}
             placeholder={"What is your activity name?"}
           />
         </div>

         <br />
         <label id={"newActivity"}> Activity Description: </label>
         <br />

         <div className="align-center">
           <input
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             className={"input-element"}
             type={"text"}
             placeholder={"What is your activity about?"}
           />
         </div>
         <br />
         <div className="flex" style={{ justifyContent: "space-between" }}>
           <div className="flex" style={{ flexDirection: "column" }}>
             <label>Distance Covered</label>
             <input
               value={distance}
               onChange={({ target }) => setDistance(target.value)}
               className="input-element"
               placeholder={"Distance Covered"}
             />
           </div>

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
         <label> Activity Type: </label>
         <ul className={"type-list"}>
           {activities.map((i) => (
             <li
               key={i}
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
         <br />

         <div className="align-center">
           <button
             className="activity-btn"
             style={{ width: "100%" }}
             onClick={() => createAnActivity()}
           >
             {isLoading ? "Creating" : "Create"} Activity
           </button>
         </div>
       </div>
       <br />
       <br />
     </div>
   </div>
 );
};

export default CreateActivity;

