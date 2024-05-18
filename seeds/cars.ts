import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { id: 1, name: "Angkot", price: "RP200.000", start_date:"2024/05/20", end_date:"2024/05/26", avaibility: true},
        { id: 2, name: "Trans", price: "RP400.000", start_date:"2024/05/20", end_date:"2024/05/26", avaibility: true},
        { id: 3, name: "Sumex", price: "RP500.000", start_date:"2024/05/20", end_date:"2024/05/26", avaibility: true }
    ]);
};
