/** @format */
import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import axios from "axios";
import { Baseurl, showMsg } from "../../../../../Baseurl";
import { Link } from "react-router-dom";

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
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/admin/payment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchData();
      showMsg("Success", "Payment Removed !", "success");
    } catch (e) {
      console.log(e);
    }
  };

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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Payment
          </span>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th> User</th>
                <th> Order</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Download Status</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    {i.user === (undefined || null) ? "" : i.user?.userName}
                  </td>
                  <td>
                    {i.order === (undefined || null)
                      ? ""
                      : i.order?.paymentStatus}
                  </td>
                  <td> {i.amount} </td>
                  <td>{i.paymentMethod}</td>
                  <td>
                    <Button onClick={() => handleDownloadStatus(i.pdfLink)}>
                      Download Invoice
                    </Button>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                    {/* <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setId(i._id);
                        setEdit(true);
                        setModalShow(true);
                      }}
                    ></i> */}
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
