import React, { Component } from 'react'
import { Form, Label, Input, Button } from 'reactstrap';

export default class SpecificPaste extends Component {

    componentWillMount() {
        this.setState({loaded:false})
        var href = new URL(window.location.href);
        var id = href.pathname.split('/', 2)[1];
        fetch('http://localhost:228/api/getpaste/?id=' + id)
            .then(r => r.json())
            .then(r => this.setState({
                loaded:true, value:r.content, owner:r.owner
            }))
        this.setState({isOpen: false});
      }
    
    render() {
        return (
            <div style={{padding:20}}>
                {this.state.loaded && (
                    <Form onSubmit={this.handleSubmit}>
                        <Label for="paste-text"><b>Posted by:</b> <i>{this.state.owner}</i></Label>
                        <Input 
                            style={{height: 400, border:"solid 1px grey"}} 
                            type="textarea" 
                            name="text" 
                            id="paste-text" 
                            value={this.state.value}
                            readOnly
                        />
                    </Form>
                )}
            </div>
        )
    }
}
