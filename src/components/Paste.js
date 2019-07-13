import React, { Component } from 'react';
import { Form, Label, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../App.css'
import { apiPost } from './common/api';

export default class Paste extends Component {

    componentWillMount() {
        this.setState({});
    }

    chooseLang = () => {
        this.setState({...this.state, ...{dropdownOpen: !this.state.dropdownOpen}});
    }

    selectLang = (e, name) => {
        const newState = this.state;  
        newState.chosenLang = {text: e.target.innerText, name: name};
        this.setState(newState);
    }

    handleChange = (e) => {
        this.setState({...this.state, ...{value: e.target.value}});
    }

    handleSubmit = (e) => {
        if (this.state) {
            const valState = this.state.value;
            let headers;
            if (this.state.chosenLang) {
                headers = new Headers();
                headers.append('X-Paste-Lang', this.state.chosenLang.name);
            }
            if (valState) {
                apiPost('/paste/', valState, headers)
                    .then(json => {
                        if (json) {
                            window.location.href = json.pasteId;
                        }
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
                    <div>
                        <Button color="info">Submit</Button>
                        &nbsp;
                        <ButtonDropdown 
                            isOpen={this.state.dropdownOpen} 
                            toggle={this.chooseLang} 
                            onSelect={this.selectLang}
                        >
                            <DropdownToggle caret>
                                {(this.state.chosenLang && this.state.chosenLang.text) || "Select language"}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={(e) => this.selectLang(e, "cpp")}>C++</DropdownItem>
                                <DropdownItem onClick={(e) => this.selectLang(e, "java")}>Java</DropdownItem>
                                <DropdownItem onClick={(e) => this.selectLang(e, "csharp")}>C#</DropdownItem>
                                <DropdownItem onClick={(e) => this.selectLang(e, "js")}>JavaScript</DropdownItem>                                
                                <DropdownItem onClick={(e) => this.selectLang(e, "shell")}>Bash</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                </Form>
            </div>
        )
    }
}
