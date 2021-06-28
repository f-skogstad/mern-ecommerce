import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th className='text-center'>PAID</th>
              <th className='text-center'>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td className='align-middle'>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className='fas fa-times d-block text-center'
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>
                <td className='align-middle'>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className='fas fa-times d-block text-center'
                      style={{ color: 'red' }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer
                    className='d-block text-center'
                    to={`/order/${order._id}`}
                  >
                    <p>Details</p>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
