import parseBearerToken from "parse-bearer-token"
import {NextApiRequest, NextApiResponse} from "next"
import {decode} from "../lib/jwt"


export function authMiddleware(callback: Function)
{
    return function (req: NextApiRequest, res: NextApiResponse)
    {
        const token = parseBearerToken(req)

        // Si el token no existe cortamos aca.
        if (!token)
        {
            return res.status(401).send({message: "No hay decodedToken"})
        }

        // Si existe lo decodifico.
        const decodedToken = decode(token)

        if (decodedToken)
        {
            callback(req, res, decodedToken)
        }
        else
        {
            return res.status(401).send({message: "Token incorrecto"})
        }
    }
}