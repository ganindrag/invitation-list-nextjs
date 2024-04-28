"use server";
import { getDB } from "@/db";
import Input from "@/components/input";
import Table from "@/components/table";
import { getData } from "./actions";
import Client from "./client";

export default async function Home() {
  const { db } = getDB();
  const kategori = await db.query("select * from kategori order by name");
  const list = await getData();
  return (
    <div>
      <Client kategori={kategori} list={list} />
    </div>
  );
}
