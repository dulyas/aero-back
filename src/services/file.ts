
import ApiError from "@/exceptions/api-error"
import { File } from "@/models"
import {rmSync, renameSync} from 'fs'


export const uploadService = async (file: Express.Multer.File): Promise<File> => {



    const fileQuery = {
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        filename: file.filename,
        path: file.path,
        size: file.size
    }

    const checkFileNameIsExist =  await File.query().where({originalname: file.originalname})

    if (checkFileNameIsExist.length) throw ApiError.BadRequest('File name is exist, try change it')

    const newFile = await File.query().insertAndFetch(fileQuery)

    return newFile
    
}

export const getFileListService = async (page: number, list_size: number): Promise<File[]> => {
    
    const files = await File.query().page(page, list_size)

    return files.results
}

export const deleteFileForId = async (id: string): Promise<number> => {

    const file = await getFileInfoForId(id)

    rmSync(file.path)

    const deleteResult = await File.query().deleteById(id)

    return deleteResult
}

export const getFileInfoForId = async (id: string): Promise<File> => {


    const file = await File.query().findById(id)

    if (!file) throw ApiError.BadRequest(`no file for this id, ${id}`)

    return file

}

export const updateFileForId = async (id: string, file: Express.Multer.File): Promise<File> => {



    const fileQuery = {
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        filename: file.filename,
        path: file.path,
        size: file.size
    }


    
    const fileForUpdate = await File.query().findById(id)

    if (!fileForUpdate) throw ApiError.BadRequest('file for update is not exist')

    await fileForUpdate.$query().updateAndFetch( {
        size: file.size,
        encoding: file.encoding,
        mimetype: file.mimetype,
        date_added: new Date()
    })

    if (!fileForUpdate) throw ApiError.BadRequest(`no file for this id, ${id}`)

    rmSync(fileForUpdate.path)


    renameSync(fileQuery.path, fileForUpdate.path)

    return fileForUpdate

}