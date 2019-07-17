import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { apiPost } from './common/api';
import { toast } from 'react-toastify';
import md5 from 'md5';

function loginHandler(res) {
    if (res) {
        if (res.status === 400) {   
            toast.warn(res.error);    
        } else if (res.status === 200) {
            this.modal = false;
            toast.success('Logged in');              
        } else {
            toast.error('Something went wrong');  
        }
    }
}

class LoginModal extends Component {
    constructor(props) {
        super(props);
        var newState = {
            modal: props.modal || false
        };
        this.state = newState;
    }

    componentWillReceiveProps(x) {
        this.setState({...this.state,...x})
    }


    submit = (e) => {
        apiPost('/login/?handle=' + this.state.handle, 'PM:' + md5(this.state.pass))
            .then(loginHandler);
        e.preventDefault();     
    }

    usernameChange = (e) => {
        this.setState({...this.state, ...{handle: e.target.value}});
    }
    
    passwordChange = (e) => {
        this.setState({...this.state, ...{pass: e.target.value}});
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} unmountOnClose={false}>
                    <ModalHeader toggle={this.toggle}>Sign in</ModalHeader>
                    <ModalBody>
                        <Input type="text" placeholder="Username" onChange={this.usernameChange}/>
                        <br/>
                        <Input type="password" placeholder="Password" onChange={this.passwordChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>Sign in</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default LoginModal;