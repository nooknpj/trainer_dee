import React, { Component } from 'react';
import ScheduleSelector from "react-schedule-selector";
import BigCalendar from 'react-big-calendar';
import dates from '../dates'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class ReserveSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: []
        }
    }

    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <ScheduleSelector
                    selection={this.state.schedule}
                    onChange={this.handleChange}
                    numDays={8}
                    minTime={0}
                    maxTime={24}
                />

                <BigCalendar
                    events={events}
                    views={allViews}
                    step={60}
                    showMultiDayTimes
                    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                    defaultDate={new Date(2015, 3, 1)}
                    localizer={localizer}
                />
            </div>
        );
    }
}


let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const now = new Date()

const events = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
    },
  
    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },
  
    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },
  
    {
      id: 4,
      title: 'Some Event',
      start: new Date(2015, 3, 9, 0, 0, 0),
      end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(2015, 3, 11),
      end: new Date(2015, 3, 13),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 10, 30, 0, 0),
      end: new Date(2015, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2015, 3, 12, 12, 0, 0, 0),
      end: new Date(2015, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 14, 0, 0, 0),
      end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(2015, 3, 12, 17, 0, 0, 0),
      end: new Date(2015, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2015, 3, 12, 20, 0, 0, 0),
      end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2015, 3, 13, 7, 0, 0),
      end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
      id: 12.5,
      title: 'Late Same Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(2015, 3, 20, 19, 30, 0),
      end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
      id: 15,
      title: 'Point in Time Event',
      start: now,
      end: now,
    },
  ]

export default ReserveSession;