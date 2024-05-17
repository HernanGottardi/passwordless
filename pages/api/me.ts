import {NextApiRequest, NextApiResponse} from "next"
import {User} from "../../lib/users"
import {authMiddleware} from "../../lib/middleware"

function handler(req: NextApiRequest, res: NextApiResponse, token)
{
    const user = new User(token.userId)
    user.pull()
    res.send(user.data)
} 

 
export default authMiddleware(handler)