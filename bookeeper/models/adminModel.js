const db = require('../config/db');

class Admin {

    static async getAllAdmins() {
        const [rows] = await db.execute('SELECT * FROM admins');
        return rows;
    }

    static async registerAdmin(email, password, username, country, number) {
        const sql = 'INSERT INTO admins (email, password, username, country, number) VALUES (?, ?, ?, ?, ?)';
        await db.execute(sql, [email, password, username, country, number]);
    }

    static async findAdminByEmail(email) {
        const [admin] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
        return admin[0];
    }

}

module.exports = Admin;
