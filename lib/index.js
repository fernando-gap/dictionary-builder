import nextConnect from 'next-connect'
import database from '../db/db.config.js'

export default function createHandler(...middleware) {
    return nextConnect().use(database, ...middleware)
}