/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const AproveVendor = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [userId, setUserId] = useState('')

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/approved-vendors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  function UpdateVendorModal(props) {
    const [username, setUserName] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState("");

    useEffect(() => {
      const fetchUsersDetails = async () => {
        try {
          const response = await axios.get(`${Baseurl}/api/admin/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const { userName, mobileNumber, email, isVendorVerified } = response.data.data;
          setUserName(userName);
          setEmail(email);
          setMobileNumber(mobileNumber);
          setIsActive(isVendorVerified);
        } catch (error) {
          console.error('Error fetching User details:', error);
        }
      };
      fetchUsersDetails();
    }, [userId]);

    const handleApproveAndProfileUpdate = async () => {
      try {
        await axios.put(`${Baseurl}api/admin/approve-vendor/${userId}`,
          {
            isVendorVerified: isActive,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

        const data = {
          userName: username,
          mobileNumber: mobilenumber,
          email: email,
        };

        const response = await axios.put(`${Baseurl}api/admin/update/${userId}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        showMsg("Success", "Vendor Updated", "success");
        setModalShow(false);
        fetchData();
      } catch (error) {
        console.error('Error updating Vendor:', error)
        toast.error("Error updating Vendor")
      }
    }


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Approved Vendor Profile/View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleApproveAndProfileUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobilenumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  checked={isActive}
                  onChange={() => setIsActive(true)}
                />
                <Form.Check
                  type="radio"
                  label="Deactive"
                  name="status"
                  checked={!isActive}
                  onChange={() => setIsActive(false)}
                />
              </div>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }


  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchData();
      const msg = data.message;
      showMsg("Success", msg, "success");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/admin/export/customers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'blob', // Receive binary data
      });

      // Create a temporary URL for the blob object
      const url = window.URL.createObjectURL(response.data);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;

      // Set the download attribute with the desired file name
      link.setAttribute('download', 'vendor.xlsx');

      // Append the link to the document body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document body after download
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  return (
    <>
      <UpdateVendorModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Approve Vendor ( Total : {data?.length} )
          </span>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.userName}</td>
                  <td>{i.mobileNumber}</td>
                  <td>{i.email}</td>
                  <td>{i.userType}</td>
                  <td>{i.isVendorVerified ? "active" : "Deactivate"}</td>
                  <td className="user121">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setUserId(i._id);
                        setModalShow(true);
                      }}
                    ></i>
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
export default HOC(AproveVendor);
