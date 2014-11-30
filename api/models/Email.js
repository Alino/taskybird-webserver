/**
* Email.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    schema: true,

  attributes: {
      _id: {type: 'string', required: true, primaryKey: true},
      responsible_user_id: {type: 'integer'},
      status: {type: 'integer', defaultsTo: 0},
      assigned_by: {type: 'integer'}
  }
};