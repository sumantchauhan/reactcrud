import React from 'react'
import CreateUser from './CreateUser';
import UserList from './UserList';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TodoList from './TodoList';

function Home(props) {
    
    return (
        <div>
          <Tabs defaultActiveKey="todo" transition={false} id="noanim-tab-example">
            <Tab eventKey="todo" title="Todo">
                <TodoList/>
            </Tab>
            <Tab eventKey="users" title="Users">
                <CreateUser/>
                <UserList/>
            </Tab>
          </Tabs>
        </div>
    )
}
  
  export default Home;

