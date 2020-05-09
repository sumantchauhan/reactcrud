import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUsers,editUser} from '../actions/actions';
import {Table, Space,Input,Card} from 'antd';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function UserList(props) {
  const [modalOpen,setModalOpen] = useState(false);
  const [name,setName] = useState('');
  const [showSpinner,setShowSpinner] = useState(false);
  const [editedData,setEditedData] = useState([]);

  const showModal = (text) => {
    setModalOpen(true);
    setEditedData(text);
    setName(text.name);
  }

  const closeModal = () => {
    setModalOpen(false);
    setName('');
  }

  const handleChange = event => {
    setName(event.target.value);
 }

 const handleSubmit = (event) => {
  event.preventDefault();
  if(name !==''){
    setShowSpinner(true);
      setTimeout(() => {
        setModalOpen(false);
        setShowSpinner(false);
        props.editUser(editedData.id,name);
        setName('');
       },1000)
  }
  
}

  const OpenModal = () => {
    return(
      <Modal show={modalOpen} backdrop='static' onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Card style={{ width: 465 }}>
      <form onSubmit={handleSubmit}>
      <div className="inputbox">
      <Input 
          type="text" 
          name="name" 
          value={name} 
          onChange={handleChange} />
      </div>
      <div>
      </div>
      <div style={{marginTop:'30px',float: 'right'}}>
      <Button variant="secondary" onClick={closeModal}>
          Close
      </Button>
        {
          showSpinner ? (
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
            <input type="submit" value="Edit User" className="btn btn-primary submit_button"/>
          )
        }
      </div>
    </form>
      </Card>
      </Modal.Body>
    </Modal>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span className="table_data_text">{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <span className="edit_delete" onClick={() => showModal(text)}>Edit</span>
          <span className="edit_delete" style={{marginLeft:'20px'}}>Delete</span>
        </Space>
      ),
    },
  ];

  
      let data = props.usersList.map(item => {
        item.key = item.id;
        return item;
      });
  
    useEffect(() => {
        props.fetchUsers();
        // eslint-disable-next-line
    },[]);

    return (
        <div>
          <Table columns={columns} dataSource={data} />
          <OpenModal/>
          {/* <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              props && props.usersList && props.usersList.length>0 ? props.usersList.map(user => (
                <tr key={user.id}>
                  <td>
                  {user.name}
                  </td>
                  <td>
                    <span className="edit_delete">Edit</span> <span className="edit_delete" style={{marginLeft:'20px'}}>Delete</span>
                  </td>
                </tr>
              )):<></>
          }
            </tbody>
          </Table> */}
        </div>
    )
}

const mapStateToProps = state => ({
    usersList:state.posts.users
});

export default connect(mapStateToProps,{fetchUsers,editUser})(UserList);
