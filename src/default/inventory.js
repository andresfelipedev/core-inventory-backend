const mysqlConnection = require('../database');

const deleteItemsAndCategories = () => {
    const query = `DELETE FROM items WHERE user_id = 1;
                   DELETE FROM categories WHERE user_id = 1`;
    mysqlConnection.query(query, (error, rows, fields) => {
        if (error) console.log(error);        
    });
};

const createTestInventory = () => {
    const query = 
    `INSERT INTO categories (id, user_id, name) VALUES
	(1, 1, "Appliances"),
	(2, 1, "Phones"),
	(3, 1, "Notebooks"),
	(4, 1, "Clothing"),
	(5, 1, "Instruments");
	INSERT INTO items (id, category_id, user_id, name, quantity, unit, image_url, created) VALUES
	(1, 1, 1, "Stove", 50, "unit(s)", "https://i.imgur.com/tpbexgu.png", NULL),
	(2, 1, 1, "Washing Machine", 20, "unit(s)", "https://i.imgur.com/2tmhvon.png", NULL),
	(3, 1, 1, "Blender", 30, "unit(s)", "https://i.imgur.com/gftZZJl.png", NULL),
	(4, 2, 1, "iPhone", 17, "unit(s)", "https://i.imgur.com/thyBh08.png", NULL),
	(5, 2, 1, "Samsung", 18, "unit(s)", "https://i.imgur.com/53YMjQx.png", NULL),
	(6, 2, 1, "Xiamoi", 14, "unit(s)", "https://i.imgur.com/DSADUYY.png", NULL),
	(7, 3, 1, "HP", 19, "unit(s)", "https://i.imgur.com/nY49Zn3.png", NULL),
	(8, 3, 1, "Macbook", 9, "unit(s)", "https://i.imgur.com/8DS0LwX.png", NULL),
	(9, 3, 1, "Lenovo", 12, "unit(s)", "https://i.imgur.com/vsMXGti.png", NULL),
	(10, 4, 1, "Hoodie", 25, "unit(s)", "https://i.imgur.com/1CVz7p7.png", NULL),
	(11, 4, 1, "Sneakers", 27, "pair(s)", "https://i.imgur.com/DWAlQV0.png", NULL),
	(12, 4, 1, "Pants", 18, "unit(s)", "https://i.imgur.com/018RTJ4.png", NULL),
	(13, 5, 1, "Electric guitar", 15, "unit(s)", "https://i.imgur.com/90WZOki.png", NULL),
	(14, 5, 1, "Piano", 10, "unit(s)", "https://i.imgur.com/dQ8m7mL.png", NULL),
	(15, 5, 1, "Trumpet", 14, "unit(s)", "https://i.imgur.com/yHdez2X.png", NULL),
	(16, NULL, 1, "Telescope", 17, "unit(s)", "https://i.imgur.com/2lU3YyQ.png", NULL),
	(17, NULL, 1, "Hose", 11, "unit(s)", "https://i.imgur.com/tSGNArT.png", NULL),
    (18, NULL, 1, "Chair", 48, "unit(s)", "https://i.imgur.com/6f1bVbl.png", NULL)`
    mysqlConnection.query(query, (error, rows, fields) => {
        if (error) console.log(error);        
    });
};

const defaultInventory = () => {
    /*
        For user_id = 1 (testuser):
        If there's no categories or items, create test inventory.
        Otherwise, delete all items and categories and create test inventory.
    */
    const query = `SELECT COUNT(*) FROM categories WHERE user_id = 1;
                   SELECT COUNT(*) FROM items WHERE user_id = 1`;
    mysqlConnection.query(query, (error, rows, fields) => {
        if (!error) {
            categoriesRows = rows[0];
            itemsRows = rows[1];
            if (categoriesRows.length > 0 || itemsRows.length > 0) {
                deleteItemsAndCategories();
            }
            createTestInventory();
        } else {
            console.log(error);            
        }
    });
};

module.exports = defaultInventory;