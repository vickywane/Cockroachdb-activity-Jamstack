import React from "react";
import { FiCalendar, FiClock } from 'react-icons/fi'
import { BsConeStriped } from 'react-icons/bs'

const ActivityCard = ({
    distance,
    duration,
    date_created,
    name,
    description,
    activity_type
}) => {
    return (
        <div className="card" >
            <div className="flex" style={{ justifyContent: 'space-between' }} >
                <h3 className="title-sm" > {name} </h3>

                <div className="activity-type" >
                    {activity_type}
                </div>
            </div>

            <div className="flex" >
                <div className="icon-ctn" >
                    <FiCalendar size={19} />
                </div>
                <p>{new Date(date_created).toDateString()}</p>
            </div>

            <hr />

            <div className="flex" style={{ justifyContent: 'space-between' }} >
                <div className="flex" >
                    <div className="icon-ctn" >
                        <FiClock size={19} />
                    </div>
                    {duration} Spent
                </div>

                <div className="flex" >
                    <div className="icon-ctn" >
                        <BsConeStriped size={19} />
                    </div>
                    {distance} Covered
                </div>
            </div>
            <br />
            <br />
            <p> {description} </p>
        </div>
    )
}

export default ActivityCard