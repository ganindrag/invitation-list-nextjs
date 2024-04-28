"use client";
import Input from "@/components/input";
import Table from "@/components/table";
import { IData, IKategori } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import { getData, save } from "./actions";
import { useState } from "react";

let counter = 0;

export default function Client({
  kategori,
  list,
}: {
  kategori: IKategori[];
  list: IData[];
}) {
  const [listData, setListData] = useState(list);
  const onSubmit = (data: IData) => {
    if (data.name === "") {
      if (counter < 5) {
        counter++;
      } else {
        const answer = window.prompt("Masukkan Nama Anda");
        if (answer) {
          localStorage.setItem("creator", answer);
        } else {
          alert("harus isi nama!");
        }
        counter = 0;
      }
      toast.error("isi nama dulu!");
      return false;
    } else {
      save(data).then(() => {
        toast.success("nice!");
        getData().then((data) => setListData(data));
      });
      return true;
    }
  };
  return (
    <div className="p-3 pt-10">
      <h1 className="text-center fixed top-2 left-1/2 transform -translate-x-1/2 text-l font-bold">
        List Undangan
      </h1>
      <Input kategori={kategori} onSubmit={onSubmit} />
      <hr className="my-5" />
      Data yang sudah dimasukkan: (Total: {listData.length})
      <Table kategori={kategori} data={listData} />
      <Toaster position="bottom-center" />
    </div>
  );
}
