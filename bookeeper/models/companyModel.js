const db = require('../config/db');

class Company {
    static async registerCompany(name, address, email, phone, password, adminId) {
        const sql = 'INSERT INTO companies ( name, address, email, phone, password, admin_id) VALUES (?, ?, ?, ?, ?, ?)';
        await db.execute(sql, [name, address, email, phone, password, adminId]);
    }

    static async findCompanyByEmail(email) {
        const [company] = await db.execute('SELECT * FROM companies WHERE email = ?', [email]);
        console.log('DB Query Result:', company);  // Log the database result
        return company[0]; // Ensure this is returning the correct company object
    }

    static async getAllCompaniesByAdmin(adminId) {
        const [companies] = await db.execute('SELECT * FROM companies WHERE admin_id = ?', [adminId]);
        return companies;
    }
    // Get a single company by ID
    static async findCompanyById(id) {
        const [company] = await db.execute('SELECT * FROM companies WHERE id = ?', [id]);
        return company[0];
    }

    // Update a company
    static async updateCompany(id, name, address, email, phone, password) {
        const sql = 'UPDATE companies SET name = ?, address = ?, email = ?, phone = ?, password = ? WHERE id = ?';
        await db.execute(sql, [name, address, email, phone, password, id]);
    }

    // Delete a company
    static async deleteCompany(id) {
        const sql = 'DELETE FROM companies WHERE id = ?';
        await db.execute(sql, [id]);
    }
}

module.exports = Company;
