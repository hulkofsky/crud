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

    isEmail(value) {
        const emailPattern = /^\w+@\w+\.\w{2,4}$/i;
        if(value.search(emailPattern)|| !value) {
            showError('Invalid email!');
            return false;
        } else {
            return true;
        }
    };

    isName(value) {
        const namePattern = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;
        if(value.search(namePattern)|| !value)  {
            showError('Invalid name!');
            return false;
        } else { 
            return true;
        }
    };

    isPassword(value) {
        const passPattern = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/;
        if(value.search(namePattern)|| !value)  {
            showError('Password must be at least 6 symbols and contain at least 1 number!');
            return false;
        } else { 
            return true;
        }
    };

    isPhoto(value) {
        const filesExt = ['jpg', 'gif', 'png'];
        
        if (value) {
            const parts = value.split('.');
            if(filesExt.join().search(parts[parts.length - 1]) = -1){
                showError(`Only "jpg", "gif", "png" images supported!`);
            }
        } else {
            const photo = 'http://icons.iconarchive.com/icons/artua/dragon-soft/512/User-icon.png'
            return photo
        } 
    }

    showError(message) {
        let errorDiv = doc.createElement('div');

        if(doc.querySelector('.error')) doc.querySelector('.error').remove();
        errorDiv.classList.add('error');
        errorDiv.innerHTML = message;
        doc.querySelector('button[name=addUser]').parentElement.appendChild(errorDiv);
    };

    addUser(){
        const fName = doc.querySelector('input[name=firstName]').value;
        const lName = doc.querySelector('input[name=lastName]').value;
        const email = doc.querySelector('input[name=email]').value;
        const photo = doc.querySelector('input[type=file]').files[0];
        let password = doc.querySelector('input[name=password]').value;

        if(this.isEmail(email)) return;
       

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