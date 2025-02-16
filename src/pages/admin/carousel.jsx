import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminLayout from "../layout/AdminLayout";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button as NextUIButton,
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "../../components/assets/Icon/EditIcon";
import { DeleteIcon } from "../../components/assets/Icon/DeleteIcon";
import { EyeIcon } from "../../components/assets/Icon/EyeIcon";
import { Form, message, Button as AntButton, Input, Upload, Modal as AntModal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;


const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  { name: "Id", uid: "urut_tl" },
  { name: "Gambar", uid: "carousel_tl" },
  { name: "Aksi", uid: "aksi_tl" },
];

const Carousel = () => {
  const [modalActionTL, setModalActionTL] = useState(null);
  const [selectedItemTL, setSelectedItemTL] = useState(null);
  const [data_tl, setTL] = useState([]);
  const [formTL] = Form.useForm();
  const tlURL = `${BASE_URL}/api/carousel/`;
  const all = `${BASE_URL}/api/carousel/all`;

  const getTL = async () => {
    try {
      const beritaRes = await axios.get(all);
      setTL(
        beritaRes.data.data.map((item) => ({
          urut_tl: item.id,
          carousel_tl: item.image,
          active_tl: item.active,
        }))
      );
    } catch (error) {
      message.error("[" + error.response?.status + "] Gagal Menampilkan List", 5);
    }
  };
  
  useEffect(() => {
    getTL();
  }, []);

  const { isOpen: isOpenTL, onOpen: onOpenTL, onOpenChange: onOpenChangeTL } = useDisclosure();

  const openModalTL = (action, item) => {
    setModalActionTL(action);
    formTL.resetFields();
    setSelectedItemTL(item);
    if (action === "add") {
      setSelectedItemTL("");
    }
    if (action === "edit" || action === "view") {
      const fields = {
        ...item,
        carousel_tl: item.carousel_tl
          ? [{
              uid: String(item.urut_tl),
              name: "carousel.jpg", 
              status: "done",
              url: item.carousel_tl.startsWith("http")
                ? item.carousel_tl
                : `${BASE_URL}${item.carousel_tl}`
            }]
          : []
      };
      formTL.setFieldsValue(fields);
    }
    
    onOpenTL();
  };
  
  const verifyToken = async (token) => {
    try {
        const response = await axios.post(`${BASE_URL}/login/verify`, {}, {
            headers: { "token": token },
        });

        if (response.data.error === "Invalid Token") {
            return false;
        }

        return response.data.status === "ok";
    } catch (error) {
        return false;
    }
};

const verifyTokenAndProceed = async (callback) => {
    try {
        const token = sessionStorage.getItem("tokenUser") || localStorage.getItem("tokenUser");
        if (!token) throw new Error("Token tidak ditemukan! Silakan login kembali.");
        
        const isTokenValid = await verifyToken(token);
        if (!isTokenValid) throw new Error("Token tidak valid! Silakan login kembali.");
        
        await callback(token);
    } catch (error) {
        Swal.fire({
            title: "Gagal",
            text: error.message,
            icon: "error",
        });
    }
};

const storeList = async (values) => {
    verifyTokenAndProceed(async (token) => {
        try {
            const formData = new FormData();
            const fileList = values.carousel_tl;
            formData.append("active", values.active_tl);
            
            if (fileList && fileList.length > 0) {
                formData.append("gambar", fileList[0].originFileObj);
            } else {
                throw new Error("Gambar belum dipilih!");
            }
            
            await axios.post(tlURL, formData, {
                headers: { "Content-Type": "multipart/form-data", "token": token },
            });
            
            Swal.fire({ title: "Berhasil!", text: "Data berhasil ditambahkan!", icon: "success" });
            formTL.resetFields();
            getTL();
        } catch (error) {
            Swal.fire({ title: "Gagal", text: "[" + (error.response?.status || "500") + "] Data Gagal Ditambahkan!", icon: "error" });
        }
    });
};

const updateList = async (values) => {
    verifyTokenAndProceed(async (token) => {
        try {
            const formData = new FormData();
            formData.append("active", values.active_tl);
            
            if (Array.isArray(values.carousel_tl) && values.carousel_tl.length > 0 && values.carousel_tl[0]?.originFileObj) {
                formData.append("gambar", values.carousel_tl[0].originFileObj);
            } 
            
            await axios.put(`${tlURL}${values.urut_tl}`, formData, {
                headers: { "Content-Type": "multipart/form-data", "token": token },
            });
            
            Swal.fire({ title: "Berhasil!", text: "Data berhasil diupdate!", icon: "success" });
            getTL();
        } catch (error) {
            Swal.fire({ title: "Gagal", text: "[" + (error.response?.status || "500") + "] Data Gagal Diubah!", icon: "error" });
        }
    });
};

const deleteTL = (item) => {
    Swal.fire({
        title: "Apa Anda Yakin?",
        text: "Data yang terhapus tidak dapat dipulihkan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            verifyTokenAndProceed(async (token) => {
                try {
                    await axios.delete(`${tlURL}${item.urut_tl}`, {
                        headers: { "token": token },
                    });
                    
                    Swal.fire({ title: "Berhasil!", text: "Data berhasil dihapus!", icon: "success" });
                    getTL();
                } catch (error) {
                    Swal.fire({ title: "Gagal", text: "[" + (error.response?.status || "500") + "] Data Gagal Dihapus!", icon: "error" });
                }
            });
        }
    });
};

  const renderCellTL = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "carousel_tl":
        return <p className="text-bold text-sm text-center">{cellValue}</p>;
      case "aksi_tl":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalTL("view", item)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => openModalTL("edit", item)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteTL(item)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return <p className="text-sm text-center">{cellValue}</p>;
    }
  }, []);

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <AdminLayout>
      <div className="bg-grayCustom min-h-screen p-10 mt-0 mx-auto">
        <h6 className="text-sm font-semibold text-pdarkblue">Admin {'>'} Carousel</h6>
        <div className="mt-5 flex flex-col md:flex-row bg-white rounded-2xl p-10 justify-between space-y-5 md:space-y-0">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-lg font-semibold text-pdarkblue mb-4">Form Carousel</h2>

            <NextUIButton size="sm" color="primary" onPress={() => openModalTL("add", null)}>
              Tambah <PlusOutlined />
            </NextUIButton>

            <NextUIModal
              size="5xl"
              backdrop="opaque"
              isOpen={isOpenTL}
              isDismissable={false}
              onOpenChange={onOpenChangeTL}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col items-center font-semibold text-pdarkblue">
                      {modalActionTL === "view" ? "Detail Video Youtube" : "Form Tambah Carousel"}
                    </ModalHeader>
                    <Form
                      form={formTL}
                      name="basic"
                      onFinish={modalActionTL === "add" ? storeList : updateList}
                      {...formItemLayout}
                      layout="horizontal"
                      labelAlign="left"
                      style={{ width: "100%" }}
                    >
                      <ModalBody>
                        <Form.Item label="Id" name="urut_tl" hidden={modalActionTL === "add"}>
                          <Input placeholder="" type="text" disabled />
                        </Form.Item>
                        <Form.Item
                          label="Status"
                          name="active_tl"
                          rules={[{ required: true, message: "Pilih status" }]}
                        >
                          <Select placeholder="Pilih status" disabled={modalActionTL === "view"}>
                            <Select.Option value={true}>Aktif</Select.Option>
                            <Select.Option value={false}>Nonaktif</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Gambar"
                          name="carousel_tl"
                          rules={[{ required: true, message: "Masukkan Gambar" }]}
                          valuePropName="fileList"
                          getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                              return e;
                            }
                            return e && e.fileList;
                          }}
                        >
                          {modalActionTL === "view" ? (() => {
                          const carouselValue = formTL.getFieldValue("carousel_tl");
                          let imageURL = "fallback-image.png";
                          if (Array.isArray(carouselValue) && carouselValue.length > 0) {
                            const firstItem = carouselValue[0];
                            if (firstItem && typeof firstItem.url === "string") {
                              imageURL = firstItem.url.startsWith("http")
                                ? firstItem.url
                                : `${BASE_URL}${firstItem.url}`;
                            }
                          }
                          return (
                            <img
                              src={imageURL}
                              alt="Gambar"
                              style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }}
                            />
                          );
                        })() : (
                          <Upload
                          name="image"
                          listType="picture-card"
                          showUploadList={true}
                          beforeUpload={() => false}
                          disabled={modalActionTL === "view"}
                          maxCount={1}
                          onChange={({ fileList }) => {
                            formTL.setFieldsValue({ carousel_tl: fileList });
                          }}
                        >
                          <PlusOutlined />
                        </Upload>

                        )}
                        </Form.Item>
                      </ModalBody>
                      <ModalFooter>
                        <NextUIButton color="danger" variant="light" onPress={onClose}>
                          Batal
                        </NextUIButton>
                        {modalActionTL !== "view" && (
                          <AntButton type="primary" htmlType="submit">
                            Simpan
                          </AntButton>
                        )}
                      </ModalFooter>
                    </Form>
                  </>
                )}
              </ModalContent>
            </NextUIModal>

            <Table aria-label="Menu table with custom cells" shadow="none">
              <TableHeader columns={columns.slice(1)}>
                {(column) => (
                  <TableColumn key={column.uid} align="center">
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={data_tl}>
                {(item) => (
                  <TableRow key={item.urut_tl} className="text-center">
                    {(columnKey) => (
                      <TableCell className="text-center">{renderCellTL(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Carousel;