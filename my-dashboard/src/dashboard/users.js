import { useEffect, useState } from "react";
import { Spin, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apiInstance from "../config/apis/axiosconfig";
import BATable from "../components/BATable";
import BAScreenHeader from "../components/BAScreenHeader";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    setLoader(true);
    apiInstance
      .get("users")
      .then((res) => {
        setLoader(false);
        setListData([...res.data]);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" min-h-screen md:p-3 rounded-lg max-w-4xl mx-auto pt-10">
      <BAScreenHeader
        title="User Management"
        actionButtons={[
          {
            display: () => (
              <Button
                type="none"
                icon={<PlusOutlined />}
                onClick={() => navigate("/dashboard/usersform")} // Updated path
                className="bg-green-600 py-5 hover:bg-green-500 font-semibold text-white flex items-center gap-2"
              >
                Add New User
              </Button>
            ),
          },
        ]}
      />

      {loader ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="mt-6">
          <BATable
            data={listData}
            columns={[
              {
                key: "name",
                label: "User Name",
              },
              {
                key: "phone",
                label: "Contact Number",
              },
              {
                key: "email",
                label: "Email",
              },
            ]}
            className="bg-white border border-gray-200 rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
}
