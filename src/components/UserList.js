import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions/actions';
import {Table, Space} from 'antd';

function UserList(props) {

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
      render: () => (
        <Space size="middle">
          <span className="edit_delete">Edit</span>
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

export default connect(mapStateToProps,{fetchUsers})(UserList);
