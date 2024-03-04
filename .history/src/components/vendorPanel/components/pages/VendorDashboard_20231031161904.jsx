/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../../vendorPanel/components/layout/HOC";
import { MdDashboardCustomize, MdOutlineLibraryBooks } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";
import { Baseurl } from "../../../../Baseurl";

const VendorDashboard = () => {
  const [user, setUser] = useState(0);
  const [product, setProduct] = useState(0);
  const [order, setOrder] = useState(0);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(data?.users?.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/products`);
      setProduct(data?.products?.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrder(data?.data?.length);
    } catch (e) {
      console.log(e);
    }
  };


  const fetchcategory = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/catogory/getAllCategory`
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchUser();
    fetchProduct();
    fetchOrder();
    fetchcategory()
  }, []);

  const card = [
    {
      progress: "bg-blue-400",
      title: "All Users",
      number: user,
      icon: <FaUserFriends className="text-2xl text-[#0D99FF]" />,
    },
    {
      progress: "bg-green-400",
      title: "All Products",
      number: product,
      icon: <MdOutlineLibraryBooks className="text-2xl text-[#0D99FF]" />,
    },
    {
      progress: "bg-yellow-400",
      title: "All Orders",
      number: order,
      icon: <MdDashboardCustomize className="text-2xl text-[#0D99FF]" />,
    },
    {
      progress: "bg-yellow-400",
      title: "All Categories",
      number: "150",
      icon: <MdDashboardCustomize className="text-2xl text-[#0D99FF]" />,
    },
  ];
  return (
    <>
      <section className="grid md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-4">
        {/* Card */}
        {card.map((card) => {
          return (
            <div className="px-5 py-8 bg-[#444444] space-y-2 shadow-xl flex flex-col  rounded-md">
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span className="tracking-widest text-[#fff]">
                    {card.title}
                  </span>
                  <span className="tracking-wider text-[#fff] text-xl md:text-2xl font-semibold">
                    {card.number}
                  </span>
                </div>
                {/* Icons */}
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(VendorDashboard);
