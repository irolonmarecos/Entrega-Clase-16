/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('productos').del()
  await knex('productos').insert([
    {id: 1, nombre: 'ps5',precio:'1316',uru:'https://cdn2.iconfinder.com/data/icons/unoline-christmas/24/Cookie-256.png'}

  ]);
};
