import { getDb } from '../db_connect';

export interface Delta {
    _id: number,
    Text: string
}

const getAll = async (): Promise<Delta[]> => {
    const query = 'SELECT * FROM Deltas';
    return await getDb().prepare(query).all();
}

const insertOne = async (text: string): Promise<void> => {
    const query = `INSERT INTO Deltas (Text) VALUES ('${text}')`
    await getDb().exec(query);
}

export default {
    getAll,
    insertOne
}