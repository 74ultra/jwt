
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'A', password: 'ancle', department: 'biology' },
        {id: 2, username: 'B', password: 'bncle', department: 'biology' },
        {id: 3, username: 'C', password: 'cncle', department: 'economics' }
      ]);
    });
};
