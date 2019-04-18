import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap'
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
            <div className="box">
                <p className="pageHeader">Reserve Session</p>

                <DropdownButton id="dropdown-basic-button" title="Select course">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>

                <div className="descriptionLine">
                    <a className="descriptionTitle">Select range of available time</a>
                    <div className="courseDescriptionBox">
                        <div style={{ maxWidth: "80%" }}>
                            <ScheduleSelector
                                selection={this.state.schedule}
                                onChange={this.handleChange}
                                numDays={8}
                                minTime={0}
                                maxTime={24}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ display: "Block" }}>
                    <Button variant="primary" size="small" type="submit">
                        Reserve
                    </Button>
                </div>

            </div>
        );
    }
}

export default ReserveSession;