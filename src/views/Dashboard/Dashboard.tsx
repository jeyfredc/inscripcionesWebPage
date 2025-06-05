import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuDashboard from '../../components/Dashboard/MenuDashboard';


const Dashboard = () => {


    return (
        <>
            <MenuDashboard>
                <Outlet />
            </MenuDashboard>

        </>

    );
};



export default Dashboard;