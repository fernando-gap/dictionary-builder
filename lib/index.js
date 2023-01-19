import nextConnect from 'next-connect'
import database from "../../db/db.config.js"
export default nextConnect().use(database)
