import ApiError from "@/exceptions/api-error";
import { File } from "@/models";
import { deleteFileForId, getFileListService, uploadService, getFileInfoForId, updateFileForId } from "@/services/file";
import { NextFunction, Request, Response, Router } from "express";
import { join } from "path";

export const uploadController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { file } = req

        if (!file) throw ApiError.BadRequest('no File')

        const uploadedFile = await uploadService(file)

        res.json({
            file: uploadedFile
        })

    } catch (e) {
        next(e)
    }
}

export const getFileListController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { page = 0, list_size = 10} = req.query

        const files = await getFileListService(+page, +list_size)

        res.json({
            files
        })

    } catch (e) {
        next(e)
    }
}

export const deleteFileController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { id } = req.params

        const deleteResult = await deleteFileForId(id)

        res.json({
            success: !!deleteResult
        })


    } catch (e) {
        next(e)
    }
}

export const getFileInfoController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { id } = req.params

        const file = await getFileInfoForId(id)

        res.json({file})


    } catch (e) {
        next(e)
    }
}

export const updateFileController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const { id } = req.params
        const { file } = req

        if (!file) throw ApiError.BadRequest('no file for update')

        const updatedFile = await updateFileForId(id, file)

        res.json({file: updatedFile})


    } catch (e) {
        next(e)
    }
}

export const downloadFileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { id } = req.params

        const file = await getFileInfoForId(id)


        res.sendFile(join(__dirname, '../../', file.path),  (err) => {
            if (err) console.log(err)
        })
        


    } catch (e) {
        next(e)
    }
}