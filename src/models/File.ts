

import { Model } from "objection";


export default class File extends Model {
    id!: number
    originalname!: string
    encoding!: string
	mimetype!: string
	size!: number
    path!: string
    filename!: string
	date_added!: Date

    static get tableName() {
        return 'files'
    }

    async $beforeInsert() {
		this.date_added = new Date();
	}

}