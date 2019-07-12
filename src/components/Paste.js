import React, { Component } from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import '../App.css'

export default class Paste extends Component {

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    handleSubmit = (e) => {
        if (this.state) {
            var valState = this.state.value;
            if (valState) {
                fetch('http://localhost:228/api/paste/',
                    {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        body: valState
                })  .then(response => response.json())
                    .then(function(myJson) {
                        console.log(JSON.stringify(myJson));
                    });
            }
        }
        e.preventDefault();
    }

    render() {
        return (
            <div style={{padding:20}}>
                <Form onSubmit={this.handleSubmit}>
                    <Label for="paste-text">Post new paste</Label>
                    <Input 
                        style={{height: 400, border:"solid 1px grey"}} 
                        type="textarea" 
                        name="text" 
                        id="paste-text" 
                        onChange={this.handleChange}
                    />
                    <br/>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}
