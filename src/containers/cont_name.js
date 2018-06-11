import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {} from '../actions/actions';

class ContactList extends Component {

    showlist(searchCriteria){
        console.log(searchCriteria, 'in showlist');
        return this.props.contacts.map((contact) => {
            return (
                <List.Item onClick={() => this.props.select(contact)} key={contact.id}>
                    <Image avatar src={contact.photo}/>
                    <List.Content>
                        <List.Header>{contact.name}</List.Header>
                        {contact.company}
                    </List.Content>
                </List.Item>
            );
        });
    };

    render() {
        return (
            <div>
                <Input icon='search' iconPosition='left' placeholder='Search users...' onChange={() => {
                            const searchCriteria = this.props.search(document.querySelector('input[type=text]').value).payload;
                            
                            return (
                                <List animated celled verticalAlign='middle'>
                                    {this.showlist(searchCriteria)}
                                </List>
                            );
                        }
                    }/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        contacts: state.contacts
    };
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({select: select, search: search}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactList);