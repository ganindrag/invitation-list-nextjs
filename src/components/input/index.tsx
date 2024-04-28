"use client";
import { save } from "@/app/actions";
import { IData, IKategori } from "@/types";
import React, { useEffect, useRef, useState } from "react";

export default function Input({
  kategori,
  onSubmit,
}: {
  kategori: IKategori[];
  onSubmit: (data: IData) => boolean;
}) {
  const [data, setData] = useState<IData>({
    name: "",
    address: "",
    kategori_id: kategori[0].id,
    created_by: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("creator")) {
        const answer = window.prompt("Masukkan Nama Anda");
        if (answer) {
          localStorage.setItem("creator", answer);
        } else {
          alert("harus isi nama!");
        }
      }
    }
    setData((s) => ({
      ...s,
      created_by: localStorage.getItem("creator") || "",
      kategori_id: Number(localStorage.getItem("kategori")) || s.kategori_id,
    }));
  }, []);

  const changer =
    <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      name: string
    ) =>
    ({ target: { value } }: React.ChangeEvent<T>) =>
      setData((d) => ({ ...d, [name]: value }));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label htmlFor="nama">Nama : </label>
        <input
          id="nama"
          className="border-2 flex-grow p-3"
          placeholder="Masukkan Nama Undangan"
          onChange={changer("name")}
          value={data.name}
          ref={inputRef}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="alamat">Alamat : </label>
        <div className="flex gap-2">
          <textarea
            id="alamat"
            className="flex-grow border-2 p-3"
            placeholder="Masukkan Alamat"
            rows={2}
            onChange={changer("address")}
            value={data.address}
          ></textarea>
          <button
            className="border-2 border-green-400 p-3 active:bg-green-400"
            onClick={() => {
              if (onSubmit(data))
                setData((d) => ({ ...d, name: "", address: "" }));

              if (inputRef.current !== null) {
                inputRef.current.focus();
              }
            }}
          >
            Masukkan
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="kat">Kategori : </label>
        <select
          id="kat"
          className="flex-grow p-3"
          onChange={(e) => {
            changer("kategori_id")(e);
            localStorage.setItem("kategori", e.target.value);
          }}
          value={data.kategori_id}
        >
          {kategori.map((kat) => (
            <option key={kat.id} value={kat.id}>
              {kat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
