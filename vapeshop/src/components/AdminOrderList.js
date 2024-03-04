import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import MyTable from "./MyTable";
import { useAdmin } from "../components/admin/AdminContext";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { updateOrderStatus } = useAdmin();

  const getTypeTextColor = (type) => {
    switch (type) {
      case "In-store":
        return "text-blue-500 text-sm font-bold";
      default:
        return "text-green-500 text-sm font-bold";
    }
  };

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/items");
        if (response.ok) {
          const data = await response.json();
          const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
          setFilteredOrders(sortedOrders);
          if (sortedOrders.length > 0) {
            setOrderId(sortedOrders[0]._id);
          }
        } else {
          console.error("Failed to fetch orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter) {
      const filtered = orders.filter((order) => order.status === statusFilter);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [statusFilter, orders]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleConfirm = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "confirmed");
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: "confirmed" };
          } else {
            return order;
          }
        })
      );
      closeModal();
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "cancelled");
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: "cancelled" };
          } else {
            return order;
          }
        })
      );
      closeModal();
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handleUpdate = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "delivered");
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: "delivered" };
          } else {
            return order;
          }
        })
      );
      closeModal();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const openModal = (type, orderId) => {
    setActionType(type);
    setOrderId(orderId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const columns = [
    { Header: "User", accessor: "user" },
    { Header: "Product", accessor: "products[0].product.name" },
    { Header: "Quantity", accessor: "products[0].quantity" },
    { Header: "Total Price", accessor: "totalAmount" },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ value }) => <span className={getTypeTextColor(value)}>{value}</span>
    },
    
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        let color;
        switch (value) {
          case "pending":
            color = "orange";
            break;
          case "confirmed":
            color = "blue";
            break;
          case "cancelled":
            color = "red";
            break;
          case "delivered":
            color = "green";
            break;
          default:
            color = "black";
        }
        return <span style={{ color }}>{value}</span>;
      },
    },
    {
      Header: "Date",
      accessor: "createdAt",
      Cell: ({ value }) => new Date(value).toISOString().slice(0, 10),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        const { status, _id } = row.original;
        const isDisabled = status === "delivered" || status === "cancelled";

        return (
          <div className="flex gap-2">
            <button
              className={`btn-update text-sm  text-white py-1 px-4 rounded ${
                isDisabled
                  ? "opacity-50 bg-gray-500 text-gray-300   cursor-not-allowed"
                  : "hover:bg-blue-600 bg-blue-500 "
              }`}
              onClick={() => openModal("deliver", _id)}
              disabled={isDisabled}
            >
              Deliver
            </button>
            <button
              className={`btn-cancel  text-sm  text-white py-1 px-4 rounded ${
                isDisabled
                  ? "opacity-50  bg-gray-500   cursor-not-allowed"
                  : "hover:bg-red-600 bg-red-500"
              }`}
              onClick={() => openModal("cancel", _id)}
              disabled={isDisabled}
            >
              Cancel
            </button>
            <button
              className={`btn-confirm text-sm text-white py-1 px-4 rounded ${
                isDisabled
                  ? "opacity-50 bg-gray-500 cursor-not-allowed"
                  : "hover:bg-green-600 bg-green-500 "
              }`}
              onClick={() => openModal("confirm", _id)}
              disabled={isDisabled}
            >
              Confirm
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Order List</h2>
        <div className="bg-white shadow-md rounded-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Filter by Status:</h3>
            <select
              className="px-2 py-1 border border-gray-300 rounded"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <MyTable data={filteredOrders} columns={columns} />
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to{" "}
              {actionType === "confirm"
                ? "confirm"
                : actionType === "cancel"
                ? "cancel"
                : "deliver"}{" "}
              this order?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`bg-${
                  actionType === "confirm"
                    ? "green"
                    : actionType === "cancel"
                    ? "red"
                    : "green"
                }-500 hover:bg-${
                  actionType === "confirm"
                    ? "green"
                    : actionType === "cancel"
                    ? "red"
                    : "green"
                }-600 text-white py-2 px-4 rounded`}
                onClick={
                  actionType === "confirm"
                    ? () => handleConfirm(orderId)
                    : actionType === "cancel"
                    ? () => handleCancel(orderId)
                    : () => handleUpdate(orderId)
                }
              >
                {actionType === "confirm"
                  ? "Confirm"
                  : actionType === "cancel"
                  ? "Yes"
                  : "Deliver"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
