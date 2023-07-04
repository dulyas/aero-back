import { join } from 'path'
import swaggerAutogen from 'swagger-autogen'




const doc = {

    info: {
      title: 'fullstacktodo',
      description: 'My fullstacktodo'
    },
    definitions: {
        User: {
            id: '1',
            email: 'tester@test.com'
        },
        Users: [{
            $ref: '#/definitions/User'             
        }],
        UserWithTokens: {
            user: {
            $ref: '#/definitions/User'
            },
            refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlckB0ZXN0LmNvbSIsImlkIjoxLCJpYXQiOjE2ODc2MjcyMDIsImV4cCI6MTY5MDIxOTIwMn0.kFZHqXCfnlOjhipw7UuVnTlgkXE21jk1U5oQ4bGgloE',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlckB0ZXN0LmNvbSIsImlkIjoxLCJpYXQiOjE2ODc2MjcyMDIsImV4cCI6MTY5MDIxOTIwMn0.kFZHqXCfnlOjhipw7UuVnTlgkXE21jk1U5oQ4bGgloE'
        },
        File: {
            fieldname: 'filedata',
            originalname: 'VR_0001.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'uploads',
            filename: 'b88b970a926a250c17a5b962a4ace5c3',
            path: 'uploads\\b88b970a926a250c17a5b962a4ace5c3',
            size: 3209055
        },
        Files: [{
            $ref:  '#/definitions/File'
        }]
    },
    // host: 'localhost:1338',s
    // schemes: ['http'],

   }

// путь и название генерируемого файла
const outputFile = join(__dirname, 'output.json')
// массив путей к роутерам
const endpointsFiles = [join(__dirname, '../routes/auth'), join(__dirname, '../routes/file')]

swaggerAutogen()(outputFile, endpointsFiles, doc).then(res => {
  console.log(res)
})