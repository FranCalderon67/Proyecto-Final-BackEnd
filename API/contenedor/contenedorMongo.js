const { MongoClient, ObjectId } = require('mongodb')
const logs = require('../config/logs.js')

class ContenedorMongoDB {
    constructor(connection, db, collection) {
        this.mongo = new MongoClient(connection);
        this.db = db;
        this.collection = collection;
    }
    async conectarMongo() {
        try {
            await this.mongo.connect();
            console.log("Conectado a Mongo Atlas");
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)

            throw error;
        }
    }
    async obtenerTodos() {
        try {
            const data = await this.mongo.db(this.db).collection(this.collection).find({}).toArray();
            return data;
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)
            throw error;
        }
    }
    async obtenerPorId(id) {
        try {
            const data = await this.mongo.db(this.db).collection(this.collection).findOne({ _id: ObjectId(id) });
            return data;
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)
            throw error;
        }
    }

    async obtenerPorCategoria(categoria) {
        try {
            const data = await this.mongo.db(this.db).collection(this.collection).find({ "category": categoria }).toArray();
            return data;
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)
            throw error;
        }
    }
    async agregarItem(data) {
        try {
            await this.mongo.db(this.db).collection(this.collection).insertOne(data);
            return data.id;
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)
            throw error;
        }
    }

    async actualizarItem(id, data) {
        try {
            return await this.mongo.db(this.db).collection(this.collection).updateOne({ _id: ObjectId(id) }, { $set: data });
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)
            throw error;
        }
    }
    async eliminarItem(id) {
        try {
            return await this.mongo.db(this.db).collection(this.collection).deleteOne({ _id: ObjectId(id) });
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)
            throw error;
        }
    }

    async obtenerUsuario(email) {
        try {
            const data = await this.mongo.db(this.db).collection(this.collection).findOne({ email: email });
            return data;
        } catch (error) {
            logs.logger.error(`Error DB :${error}`)
            throw error;
        }
    }
}

module.exports = ContenedorMongoDB;