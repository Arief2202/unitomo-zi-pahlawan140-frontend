import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { Person, Apartment, Face } from "@mui/icons-material";

function DashboardAdmin() {
  return (
    <AdminLayout>
      <div className="bg-grayCustom min-h-screen p-10 mt-0 mx-auto">
        <h1 className="text-3xl text-pdarkblue font-bold">
          Selamat Datang, Admin 3515!
        </h1>

        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-5 justify-between space-y-5 md:space-y-0">
          <div className="flex items-center space-x-5">
            <Person
              className="text-primaryBlue bg-secondaryBlue p-1 rounded-lg"
              fontSize="large"
            />
            <div className="flex flex-col text-sm">
              <p className="mb-0 font-semibold text-ternaryBlue">Role Akun</p>
              <p className="text-gray-500 text-[12px]">Admin</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <Face
              className="text-primaryBlue bg-secondaryBlue p-1 rounded-lg"
              fontSize="large"
            />
            <div className="flex flex-col text-sm">
              <p className="mb-0 font-semibold text-ternaryBlue">Username</p>
              <p className="text-gray-500 text-[12px]">Admin</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <Apartment
              className="text-primaryBlue bg-secondaryBlue p-1 rounded-lg"
              fontSize="large"
            />
            <div className="flex flex-col text-sm">
              <p className="mb-0 font-semibold text-ternaryBlue">Instansi</p>
              <p className="text-gray-500 text-[12px]">
                BPS Kabupaten Sidoarjo
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-5 justify-between space-y-5 md:space-y-0">
            <img src="/image/maklumat.svg" alt="" />
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardAdmin;
