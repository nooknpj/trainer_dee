import React, { Component } from 'react';
import ScheduleSelector from "react-schedule-selector";

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
            </div>
        );
    }
}

export default ReserveSession;