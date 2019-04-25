import React, { Component } from "react";
import TimeSlot from "./TimeSlot";
import "../css/timeTable.css";
export class TimeTableRow extends Component {
  render() {
    // display the course item for each courseItem
    // in searchResults( passed as props from state of SearchCoursesPage)
    return this.props.timeTableResult.map(timeSlot => (
      //   <div>
      //     <span> {timeSlot.startTime}</span>
      //     <span> {timeSlot.status}</span>
      //   </div>

      <TimeSlot startTime={timeSlot.startTime} status={timeSlot.status} />

      //   <CourseItem
      //     courseID={courseItem.courseID}
      //     cName={courseItem.cName}
      //     service={courseItem.service}
      //     courseDescription={courseItem.courseDescription}
      //     cost={courseItem.cost}
      //     fName={courseItem.fName}
      //     lName={courseItem.lName}
      //     courseHour={courseItem.courseHour}
      //     gender={courseItem.gender}
      //     imageUrl={courseItem.imageUrl}
      //     rating={courseItem.rating}
      //   />
    ));
  }
}

export default TimeTableRow;
