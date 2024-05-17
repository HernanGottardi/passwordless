import {NextApiRequest, NextApiResponse} from "next"
import {sendCode} from "../../lib/auth"

export default function (req: NextApiRequest, res: NextApiResponse) {
    // Permitir solicitudes CORS desde cualquier origen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Responder de inmediato a las solicitudes OPTIONS
        res.status(200).end();
        return;
    }

    res.send("HOLA JES SOS EL AMOR DE MI VIDA CASATE CONMIGO Y TENGAMOS 80 HIJOS");
}
