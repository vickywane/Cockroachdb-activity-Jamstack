import React, { useState, useEffect } from "react";
import "../app.css";
import { navigate } from "@reach/router";
import ActivityCard from "../components/activityCard";

const Activities = () => {
 const [activitiesData, setActivitiesData] = useState([]);
 const [isLoading, setLoading] = useState(true);
 const [sortMode, setSortMode] = useState("ASC");

 useEffect(() => {
   fetchActivities();

   return () => fetchActivities();
 }, [sortMode]);

 const fetchActivities = async () => {
   setLoading(true);

   try {
     const body = await fetch(
       `http://localhost:5050/.netlify/functions/activities?order=${sortMode}`
     );
     const { data } = await body.json();

     setActivitiesData(data);
   } catch (e) {
     console.log("error fetching data", e);
   } finally {
     setLoading(false);
   }
 };

 return (
   <div className="activities">
     <header className="activity-header">
       <h2 className="title"> Outdoor Activity Tracker </h2>
     </header>
     <br />

     <section className={"activities-items"}>
       {isLoading ? (
         <div className="align-center" style={{ height: "100vh" }}>
           <h4> Fetching Your Activities .... </h4>
         </div>
       ) : activitiesData.length === 0 ? (
         <div style={{ height: "100vh" }}>
           <div className="align-center" style={{display: 'flex', justifyContent : 'center'}}>
             <button
               className={"activity-btn"}
               onClick={() => navigate("/create-activity")}
             >
               Create New Activity
             </button>
           </div>
           <h4 style={{ textAlign: "center" }}>
             You currently have no past activity. <br /> Click the button above
             to create your first activity
           </h4>
         </div>
       ) : (
         <div>
           <div className={"flex"} style={{ justifyContent: "space-between" }}>
             <div className={"align-center"}>
               <h2 className="title"> All Outdoor Activities </h2>
             </div>

             <div>
               <button
                 onClick={() => navigate("/create-activity")}
                 className={"activity-btn"}
               >
                 Create New Activity
               </button>
             </div>
           </div>
           <hr />

           <div className={"flex"}>
             <p style={{ margin: "0 .5rem" }}> Sort By: </p>
             <div>
               <select
                 onChange={(e) => {
                   setSortMode(e.target.value);
                 }}
                 value={sortMode}
                 className={"align-center"}
               >
                 <option value="ASC"> Recently Created </option>
                 <option value="DESC"> First Created </option>
               </select>
             </div>
           </div>
             <br />     
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
                     <ActivityCard
                       distance={distance}
                       duration={duration}
                       date_created={date_created}
                       name={name}
                       description={description}
                       activity_type={activity_type}
                     />
                   </li>
                 );
               }
             )}
           </ul>
         </div>
       )}
     </section>
   </div>
 );
};

export default Activities;

