
import { NextFunction, Request, Response, Router } from "express";
import authMiddleware from "@/middleware/auth-middleware";
import { uploadController, getFileListController, deleteFileController, getFileInfoController, updateFileController, downloadFileController } from "@/controllers/file";
import multer from "multer";




const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storageConfig
});

const router = Router()


router.post('/file/upload/',
    authMiddleware,
    upload.single("filedata"),
    (req: Request, res: Response, next: NextFunction) => {
    // #swagger.description = 'uploadFile with multer'
    /* #swagger.parameters['file'] = {
    description: 'file for upload',
    type: {
        fieldname: 'string',
        originalname: 'string',
        encoding: 'string',
        mimetype: 'string',
        destination: 'string',
        filename: 'string',
        path: 'string',
        size: 'number'
    },
    required: true
    } */
    /* #swagger.responses[200] = {
    description: 'File data',
    schema: { $ref: '#/definitions/File' }
    } */
    uploadController(req, res, next)
})

router.get('/file/list/', 
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'uploadFile with multer'
        /* #swagger.parameters['page'] = {
        description: 'page of list',
        type: 'string',
        required: false
        } */
        /* #swagger.parameters['list_size'] = {
        description: 'size of list',
        type: 'string',
        required: false
        } */
        /* #swagger.responses[200] = {
        description: 'Files data',
        schema: { $ref: '#/definitions/Files' }
        } */
        getFileListController(req, res, next)
    }
)

router.delete('/file/delete/:id', 
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'uploadFile with multer'
        /* #swagger.parameters['id'] = {
        description: 'id for delete candidate',
        type: 'string',
        required: true
        } */
        /* #swagger.responses[200] = {
        description: 'delete status',
        schema: { success: boolean }
        } */
        deleteFileController(req, res, next)
    }
)

router.get('/file/:id', 
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'get file info for id'
        /* #swagger.parameters['id'] = {
        description: 'file id',
        type: 'string',
        required: true
        } */
        /* #swagger.responses[200] = {
        description: 'File',
        schema: { $ref: '#/definitions/File' }
        } */
        getFileInfoController(req, res, next)
    }
)

router.put('/file/update/:id', 
    authMiddleware,
    upload.single("filedata"),
    (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'uploadFile with multer'
        /* #swagger.parameters['id'] = {
        description: 'file id',
        type: 'string',
        required: true
        } */
        /* #swagger.parameters['file'] = {
        description: 'file for update',
        type: {
            fieldname: 'string',
            originalname: 'string',
            encoding: 'string',
            mimetype: 'string',
            destination: 'string',
            filename: 'string',
            path: 'string',
            size: 'number'
        },
        required: true
        } */
        /* #swagger.responses[200] = {
        description: 'File data',
        schema: { $ref: '#/definitions/File' }
        } */
        updateFileController(req, res, next)
    }
)


router.get('/file/download/:id', 
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        // #swagger.description = 'get file info for id'
        /* #swagger.parameters['id'] = {
        description: 'file id for download',
        type: 'string',
        required: true
        } */
        /* #swagger.responses[200] = {
        description: 'File',
        schema: { $ref: '#/definitions/File' }
        } */
        downloadFileController(req, res, next)
    }
)



export default router;