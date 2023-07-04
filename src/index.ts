
import "module-alias/register";


import * as app from "@/express";
import connectDatabase from "@/db";




connectDatabase()
app.startApp()


export default app
