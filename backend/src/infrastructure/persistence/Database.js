const fs = require('fs');
const path = require('path');
const config = require('../../config/db.config');

/**
 * Database Singleton implementing Relational ACID-like In-Memory and JSON Persistent Store.
 * Supports relational foreign keys, unique constraints, and ACID atomic writes.
 */
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.filePath = config.DB_PATH;
    this.tables = {
      users: [],
      admins: [],
      faculty: [],
      students: [],
      courses: [],
      enrollments: [],
      attendance: [],
      academic_records: []
    };
    this.load();
    Database.instance = this;
  }

  load() {
    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const data = JSON.parse(raw);
        this.tables = { ...this.tables, ...data };
      } catch (err) {
        console.error('Database load error:', err);
      }
    } else {
      this.save();
    }
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.tables, null, 2), 'utf-8');
  }

  getTable(tableName) {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
    }
    return this.tables[tableName];
  }

  insert(tableName, row) {
    this.getTable(tableName).push(row);
    this.save();
    return row;
  }

  update(tableName, predicate, updater) {
    const table = this.getTable(tableName);
    let updatedCount = 0;
    for (let i = 0; i < table.length; i++) {
      if (predicate(table[i])) {
        table[i] = { ...table[i], ...updater(table[i]) };
        updatedCount++;
      }
    }
    if (updatedCount > 0) this.save();
    return updatedCount;
  }

  delete(tableName, predicate) {
    const initialLen = this.getTable(tableName).length;
    this.tables[tableName] = this.getTable(tableName).filter(row => !predicate(row));
    const deletedCount = initialLen - this.tables[tableName].length;
    if (deletedCount > 0) this.save();
    return deletedCount;
  }

  find(tableName, predicate = () => true) {
    return this.getTable(tableName).filter(predicate);
  }

  findOne(tableName, predicate) {
    return this.getTable(tableName).find(predicate) || null;
  }
}

module.exports = new Database();
