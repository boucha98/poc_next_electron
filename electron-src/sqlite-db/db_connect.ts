import path from 'path';

import Sqlite3, { Database } from 'better-sqlite3';

let _database: Database;

export const openDb = (): void => {
    _database = new Sqlite3(
        path.resolve(__dirname, 'sqlite_database.db'),
        { fileMustExist: true, verbose: console.log }
    );

    const createTable = 'CREATE TABLE IF NOT EXISTS Deltas (_id INT PRIMARY KEY NOT NULL, Text TEXT NOT NULL)'
    _database.exec(createTable)
}

export const closeDb = (): void => {
    _database.close()
}

export const getDb = (): Database => {
    if (!_database) openDb()

    return _database
}


