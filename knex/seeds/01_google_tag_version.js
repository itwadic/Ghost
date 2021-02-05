
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('google_tag_versions').del()
    .then(function () {
      // Inserts seed entries
      return knex('google_tag_versions').insert([
        { 
          id: 1, account_id: '6002892582', 
          container_id: '38100767', workspace_id: '54', 
          version_id: '48'
        }
      ]);
    });
};
