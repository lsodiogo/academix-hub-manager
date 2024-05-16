const connection = require("./connection_db");


async function getTotalItems() {
   
   const sql = `
      SELECT COUNT(*)
      AS total_items
      FROM courses
   `;
   
   try {
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while getting total of courses!");
   };
};


async function getAllItems(limit, offset) {
   
   const params = [ limit, offset ];
   
   const sql = `
      SELECT *
      FROM courses
      LIMIT ?
      OFFSET ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching all courses!");
   };
};


async function getItemById(id) {
   
   const params = [ id ];

   const sql = `
      SELECT *
      FROM courses
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while searching course: ${id}!`);
   };
};


async function addItem(itemData) {
   
   const { name, edition, duration, begin, end, description, teacher, status } = itemData;
   const params = [ name, edition, duration, begin, end, description, teacher, status ];
   
   const sql = `
      INSERT INTO courses
      (name, edition_number, hours_duration, begin_date, end_date, description, teacher_id, status_id)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to insert course: ${name}!`);
   };
};


async function updateItem(id, itemData) {
   
   const { name, edition, duration, begin, end, description, teacher, status } = itemData;
   const params = [ name, edition, duration, begin, end, description, teacher, status, id ];

   const sql = `
      UPDATE courses
      SET name = ?,
         edition_number = ?,
         hours_duration = ?,
         begin_date = ?,
         end_date = ?,
         description = ?,
         teacher_id = ?,
         status_id = ?
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to update course: ${name}!`);
   };
};


async function deleteItem(id) {
   
   const params = [ id ];

   const sql = `
      DELETE FROM courses
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to delete course: ${id}!`);
   };
};


module.exports = {
   getTotalItems,
   getAllItems,
   getItemById,
   addItem,
   updateItem,
   deleteItem
};