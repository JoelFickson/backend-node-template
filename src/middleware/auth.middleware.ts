import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken: RequestHandler = (req, res, next) => {
    const appSecret = process.env.JWT_SECRET as string

    try {

        const token = req.headers['X-Auth-Token'] as string
        if (!token) {
            return res.status(401).send('No token provided')
        }

        const isValid = jwt.verify(token, appSecret)

        if (isValid) {
            return res.status(401).json({
                error: true,
                message: 'Invalid token'
            })
        }

        next()

    } catch (err) {

        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }

        return res.status(401).json({
            message: 'Invalid token'
        })

    }

}

export default verifyToken