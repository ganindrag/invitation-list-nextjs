"use server";
import { getDB } from "@/db";
import { IData } from "@/types";

export async function getData() {
  const { db } = getDB();
  return await db.query("select * from invlist order by name");
}

export async function save(data: IData) {
  const { db } = getDB();
  try {
    const result = await db.none(
      "INSERT INTO invlist (name, address, kategori_id, created_by) VALUES ($1, $2, $3, $4)",
      [data.name, data.address, data.kategori_id, data.created_by]
    );
    console.log("Data saved successfully.");
    return result;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
}
