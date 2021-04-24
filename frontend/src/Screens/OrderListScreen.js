import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import DeleteModal from "../components/DeleteModal";

import { listOrders } from "../actions/orderAction";
import ProductListScreen from "./ProductListScreen";

const OrderListScreen = ({ history }) => {
  const [show, setShow] = useState(false);
  const [userID, setUserID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteOrderHandler = () => {
    // dispatch(deleteOrder(userID));
    handleClose();
  };
  const handleShowModal = (userID) => {
    handleShow();
    // setUserID(userID);
  };

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : orders.length === 0 ? (
        <h1>No Orders</h1>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TOTAL PRICE</th>
              <th>TAX PRICE</th>
              <th>SHIPPING PRICE</th>
              <th>SHIPPING ADDRESS</th>
              <th>IS PAID</th>
              <th>IS DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.totalPrice}</td>
                <td>{order.taxPrice}</td>
                <td>{order.shippingPrice}</td>
                <td>
                  {order.shippingAddress.address}
                  {order.shippingAddress.city}
                  {order.shippingAddress.postalCode}
                  {order.shippingAddress.country}
                </td>
                <td>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/orders/${order._id}/edit`}>
                    <Button className="btn-sm" variant="primary">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => handleShowModal(order._id)}
                    className="btn-sm"
                    variant="danger"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>

                  <DeleteModal
                    show={show}
                    onHide={() => setShow(false)}
                    onConfirm={() => deleteOrderHandler()}
                  />
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
