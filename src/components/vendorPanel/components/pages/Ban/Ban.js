/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Baseurl, showMsg } from "../../../../../Baseurl";

const Ban = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/offers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data);
      console.log(data, "data offers");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/admin/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const msg = data.message;
      showMsg("Success", msg, "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const [product, setProduct] = useState("");
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [validFrom, setValidForm] = useState("");
    const [validTo, setValidTo] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("product", product);
      formdata.append("title", title);
      formdata.append("description", desc);
      formdata.append("code", code);
      formdata.append("discountPercentage", discountPercentage);
      formdata.append("validFrom", validFrom);
      formdata.append("validTo", validTo);
      formdata.append("image", image);

      try {
        const { data } = await axios.post(
          `${Baseurl}api/admin/offers`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        props.onHide();
        showMsg("Success", "Banner Created ! ", "success");
      } catch (e) {
        console.log(e);
      }
    };

    const [showProduct, setShowProduct] = useState([]);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/admin/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setShowProduct(data.products);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        fetchData();
      }
    }, [props]);

    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Banner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={postData}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Banner"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option>Open this select menu</option>
                {showProduct?.map((i, index) => (
                  <option value={i._id} key={index}>
                    {" "}
                    {i.productName}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="text"
                placeholder="discountPercentage"
                required
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valid From</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date ..."
                required
                value={validFrom}
                onChange={(e) => setValidForm(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valid To</Form.Label>
              <Form.Control
                type="date"
                placeholder="discountPercentage"
                required
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 Heading_Container w-full flex justify-between items-center ">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Banner
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
          >
            Create New
          </button>
        </div>
      </section>

      <section className="main-card--container" style={{ marginBottom: "10%" }}>
        {data?.data?.map((i) => {
          return (
            <>
              <div className="three-container">
                <img
                  src={i.image}
                  style={{ width: "400px", height: "200px" }}
                  alt={i.desc}
                />
                <p>{i.desc}</p>

                <button
                  style={{ width: "100%" }}
                  onClick={() => deleteData(i._id)}
                >
                  Delete
                </button>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Ban);
