import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || req.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded?.id) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        req.userId = Number(decoded.id)
        next()
    })
}

export default authMiddleware