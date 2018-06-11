import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addUser} from '../actions/users';
import bcrypt from 'bcryptjs'
import {Modal, Button, Header, Input} from 'semantic-ui-react';

const doc=document;

const modalStyle = {
    width: '300px'
};

const modalContentStyle = {
    display: 'flex',
    flexDirection: 'column'
};

const inputStyle = {
    marginBottom: '10px'
};

class AddUserModal extends Component {
    fileToBase64(file) {
        return new Promise ( (resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload =  () => {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    };

    addUser(){
        const fName = doc.querySelector('input[name=firstName]').value;
        const lName = doc.querySelector('input[name=lastName]').value;
        const email = doc.querySelector('input[name=email]').value;
        const photo = doc.querySelector('input[type=file]').files[0];
        let password = doc.querySelector('input[name=password]').value;
        const hash = bcrypt.hashSync(password, 8);
       
        password = hash;
        this.fileToBase64(photo).then(image => {
            const newUser = {
                first_name: fName,
                last_name: lName,
                password: password,
                email: email,
                photo: image
            };
            this.props.addUser(newUser);
            console.log(newUser)
            
        });
    };

    render () {
        return(
            <Modal style={modalStyle} trigger={<Button color='green'>Add User</Button>}>
                <Modal.Header>Add User</Modal.Header>
                <Modal.Content style={modalContentStyle}>
                    <Modal.Description>
                        <Input fluid style={inputStyle} name='firstName' type='text' label={{ icon: 'asterisk' }} labelPosition='right corner' placeholder='Firstname' />
                        <Input fluid style={inputStyle} name='lastName' type='text' label={{ icon: 'asterisk' }} labelPosition='right corner' placeholder='Lastname' />
                        <Input fluid style={inputStyle} name='password' type='password' label={{ icon: 'asterisk' }} labelPosition='right corner' placeholder='Password' />
                        <Input fluid style={inputStyle} name='email' type='email' label={{ icon: 'asterisk' }} labelPosition='right corner' placeholder='E-mail' />
                        <Input fluid style={inputStyle} name='file' type='file' label={{ icon: 'asterisk' }} labelPosition='right corner' placeholder='Photo' />
                    </Modal.Description>
                    <Button fluid color='green' onClick={this.addUser.bind(this)}>Add User</Button>
                </Modal.Content>
            </Modal>
        );
    };    
};

function mapStateToProps (state) {
    return {
        users: state.users
    };
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({addUser: addUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddUserModal);