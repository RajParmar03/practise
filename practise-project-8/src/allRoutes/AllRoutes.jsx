import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../components/DashBoard';
import Login from '../components/Login';
import Portfolio from '../components/Portfolio';
import Register from '../components/Register';
import Stock from '../components/Stock';

const AllRoutes = () => {
  return (
    <Box>
        <Routes>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/dashboard' element={<DashBoard />}></Route>
            <Route path='/stocks' element={<Stock />}></Route>
            <Route path='/portfolio' element={<Portfolio />}></Route>
        </Routes>
    </Box>
  )
}

export default AllRoutes;