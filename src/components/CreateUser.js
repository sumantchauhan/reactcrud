import React, { Component } from 'react';
import { Input,Card } from 'antd';
import {connect} from 'react-redux';
import {createUsers} from '../actions/actions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


 class CreateUser extends Component {
     constructor(props){
         super(props);
         this.state = {
             name:'',
             email:'',
             modalOpen:false,
             showSpinner:false
         }
     }

     showModal = () => {
       this.setState({modalOpen:true});
     }

     closeModal = () => {
      this.setState({modalOpen:false,name:'',email:''});
     }

     handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.name !=='' && this.state.email !==''){
            let newUser = {
                name:this.state.name,
                email:this.state.email
            }
            this.setState({showSpinner:true});
            setTimeout(() => {
              this.setState({modalOpen:false,showSpinner:false});
              this.props.createUsers(newUser);
              this.setState({name:'',email:''});
             },1000)
        }
        
     }

     handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
     }


  render() {
    return (
      <div>
        <button className="create-user" onClick={this.showModal}>Create User</button>
        <Modal show={this.state.modalOpen} backdrop='static' onHide={this.closeModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card style={{ width: 465 }}>
        <form onSubmit={this.handleSubmit}>
        <div className="inputbox">
        <Input 
            type="text" 
            name="name" 
            value={this.state.name} 
            placeholder="Enter name"
            onChange={this.handleChange} />
        </div>
        <div className="inputbox">
        <Input 
            type="text" 
            name="email" 
            value={this.state.email} 
            placeholder="Enter email"
            onChange={this.handleChange} />
        </div>
        <div>
        </div>
        <div style={{marginTop:'30px',float: 'right'}}>
        <Button variant="secondary" onClick={this.closeModal}>
            Close
        </Button>
          {
            this.state.showSpinner ? (
              <Button variant="primary" disabled className="customspinner">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </Button>
            ) :
            (
              <input type="submit" value="Create User" className="btn btn-primary submit_button"/>
            )
          }
        </div>
      </form>
        </Card>
        </Modal.Body>
      </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    users:state.posts.users
});

export default connect(mapStateToProps,{createUsers})(CreateUser);
