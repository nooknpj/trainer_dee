import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap'

class ReserveSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
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

                <DropdownButton id="dropdown-basic-button" title="Select time">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>

                
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