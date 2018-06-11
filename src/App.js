import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {addUser,deleteUser,updateUser} from './actions/users';
import {List,Image} from 'semantic-ui-react';
import AddUserModal from './containers/AddUserModal'

class App extends Component {
    render() {
        const imageStyle = {
            width: '80px',
            height: '80px'
        }
        const nameStyle = {
            fontSize: '20px'
        }
        return (<div>
                    <List selection verticalAlign='middle'>
                        <AddUserModal/>
                        {this.props.users.map((user, index) => 
                            <List.Item key={index}>
                                <Image avatar src={user.photo} style={imageStyle}/>
                                <List.Content>
                                    <List.Header style={nameStyle}>{user.first_name} {user.last_name}</List.Header>
                                </List.Content>
                            </List.Item>
                        )}
                        
                    </List>
                </div>)
    }
};

function mapStateToProps (state) {
    return {
        fields: state.fields,
        users: state.users
    }
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({ addUser: addUser, 
                                deleteUser: deleteUser,
                                updateUser: updateUser
                            }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);