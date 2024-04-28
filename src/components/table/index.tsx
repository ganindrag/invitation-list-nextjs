"use client";
import { IData, IKategori } from "@/types";
import React, { useEffect, useRef, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<IData>();

export default function Table({
  data,
  kategori,
}: {
  data: IData[];
  kategori: IKategori[];
}) {
  //   const [data, _setData] = React.useState(() => list);

  const columns = React.useMemo(() => {
    const kategoriObj: Record<number, string> = {};
    kategori.forEach((k) => {
      kategoriObj[k.id] = k.name;
    });
    return [
      columnHelper.accessor("name", {
        header: "Nama",
      }),
      columnHelper.accessor("address", {
        header: "Alamat",
      }),
      columnHelper.accessor("kategori_id", {
        header: "Kategori",
        cell: (info) => kategoriObj[info.getValue()],
      }),
      columnHelper.accessor("created_by", {
        header: "Oleh",
      }),
    ];
  }, [kategori]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex">
      <table className="table-auto w-full border-collapse border border-slate-500">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="p-2 border border-slate-600 text-left">#</th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border border-slate-600 text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id}>
              <td className="p-2 border border-slate-700">{i + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border border-slate-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
