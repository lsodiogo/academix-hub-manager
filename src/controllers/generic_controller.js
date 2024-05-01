function getAllItems(db) {
   
   return async function(req, res) {
      
      try {
         const items = await db.getAllItems();

         if (items) {
            res.json(items);
         } else {
            res.status(404).send("WARNING: Data not found!");
         };

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function getItemById(db) {
   
   return async function(req, res) {
      
      const { id } = req.params;

      try {
         const item = await db.getItemById(id);

         if (item) {
            res.json(item);
         } else {
            res.status(404).send("WARNING: Item not found!");
         };

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function addItem(db) {
   
   return async function(req, res) {

      const itemData = req.body;
      
      // TO DO: add validation for password and category

      try {
         const result = await db.addItem(itemData);

         // To show item data inserted
         const lastItemId = result[0].insertId;
         const item = await db.getItemById(lastItemId);
         res.json(item);

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function updateItem(db) {
   
   return async function(req, res) {

      const { id } = req.params;
      const itemData = req.body;

      try {
         const result = await db.updateItem(id, itemData);
         res.json(result);

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function deleteItem(db) {
   
   return async function(req, res) {

      const { id } = req.params;

      try {
         const result = await db.deleteItem(id);
         res.json(result);

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



module.exports = {
   getAllItems,
   getItemById,
   addItem,
   updateItem,
   deleteItem
};