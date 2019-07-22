import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { apiPost } from './common/api';
import { toast } from 'react-toastify';
import md5 from 'md5';

function loginHandler(modal, res) {
    if (res) {
        if (res.status === 400) {   
            toast.warn(res.error);    
        } else if (res.status === 200) {
            toast.success('Logged in');
            modal.toggle();             
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
        this.toggle = () => {
            props.toggle();
        }
    }

    componentWillReceiveProps(x) {
        this.setState({...this.state,...x})
    }


    submit = (e) => {
        if (this.state.handle && this.state.pass) {
            apiPost('/login/?handle=' + this.state.handle, 'PM:' + md5(this.state.pass))
                .then(res => loginHandler(this, res));
        }
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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