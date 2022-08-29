/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('chat').del()
  await knex('chat').insert([
    {id: 1, email: 'info@gmail.com', mensaje:"hola como estas?"},
    {id: 2,  email: 'info3@gmail.com', mensaje:"Todo bien vos?"},
    {id: 3,  email: 'info4@gmail.com', mensaje:"Todo bien"},
  ]);
};