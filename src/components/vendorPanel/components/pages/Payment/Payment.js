/** @format */
import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import axios from "axios";
import { Baseurl, showMsg } from "../../../../../Baseurl";

const Payment = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/payment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };



  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `${Baseurl}api/admin/payment/${id}`,
          { status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        showMsg("Success", "Status Edit", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {"Set Sta"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <select
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                placeholder="status  ..."
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected>Open this select menu</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }



  const handleDownloadStatus = (pdfLink) => {
    const link = document.createElement("a");

    // Set the href attribute to the PDF link
    link.href = pdfLink;

    // Set the download attribute with the desired file name
    link.download = "invoice.pdf";

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Payments
          </span>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>User</th>
                <th>Order</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Download Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item._id}>
                  {/* <td>{item?.order?.user ? item.order.user : "N/A"}</td> */}
                  <td>
                    {/* Displaying order details */}
                    {item?.order?.products?.map((product, idx) => (
                      <div key={idx}>
                        {product?.product}
                      </div>
                    ))}
                  </td>
                  <td>{item?.amount}</td>
                  <td>{item?.paymentMethod}</td>
                  <td>{item?.order.paymentStatus}</td>
                  <td>
                    <Button onClick={() => handleDownloadStatus(item.pdfLink)}>
                      Download Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>

    </>
  );
};

export default HOC(Payment);
