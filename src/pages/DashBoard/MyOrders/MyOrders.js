import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const MyOrders = () => {
    const [orders,setOrders]=useState([]);
    //fetch orders data from database
    fetch('http://localhost:5000/orders')
    .then(res=>res.json())
    .then(data=>setOrders(data))

    
  //DELETE an order from API
  const handleDeleteOrder=id=>{
    const proceed=window.confirm('Are You sure,You Want To Delete?')
    if(proceed){
        const url=`http://localhost:5000/orders/${id}`;
    fetch(url,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.deletedCount>0){
            alert('deleted Successfully');
            //to delete the id automaticslly
            const remainingUsers=orders.filter(order=>order._id!==id)
            setOrders(remainingUsers);
        }
    })
    }
}
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="right">Product Price($)</StyledTableCell>
            <StyledTableCell align="right">Product Status</StyledTableCell>
            <StyledTableCell align="right">Product Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order._id}>
              <StyledTableCell component="th" scope="row">
                {order.productName}
              </StyledTableCell>
              <StyledTableCell align="right">{order.productPrice}</StyledTableCell>
              <StyledTableCell align="right">Pending</StyledTableCell>
              <StyledTableCell align="right"><DeleteIcon onClick={()=>handleDeleteOrder(order._id)}></DeleteIcon></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
};

export default MyOrders;