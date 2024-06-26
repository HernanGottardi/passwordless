import {firestore} from "./firestore"
import gen from "random-seed"
import {addMinutes} from "date-fns/addMinutes"
import { findOrCreateAuth } from "./controller/auth";

const collection  = firestore.collection("auth")

export class Auth 
{
    
    ref:any;
    data: any;

    constructor(id)
    {
        this.ref = collection.doc(id) 
    }
    
    async pull ()
    {
        const snap = await this.ref.get();
        this.data = snap.data();
    }

    async push ()
    {
        await this.ref.update(this.data);
    }

    static async findByEmail(email:string)
    {
        const results = await collection.where("email", "==", email).get()
        if( results.docs.length)
        {
            // Lo obtenemos de la nube.
            const first = results.docs[0];
            // Creamos en local.
            const newAuth = new Auth(first.id);
            newAuth.data = first.data();
        }
        else
        {
            return null;
        }
    }

    static async createNewAuth (data)
    {
        // Agregamos a la DB
        const newAuthSnap = await collection.add(data)
        // Creamos en local.
        const newAuth = new Auth(newAuthSnap.id);
        newAuth.data = data;
        return newAuth;
    }
}

export async function sendCode (email:string)
{
    // controller - nos devuelve una instancia de auth.
    const auth = await findOrCreateAuth(email);
    
    // calculamos datos.
    const code = gen.intBetween(10000, 99999);
    const twentyMinutesFromNow = addMinutes(new Date(), 20);

    // Completamos datos.
    auth.data.code = code;
    auth.data.expires = twentyMinutesFromNow;

    // Enviamos a la DB.
    await auth.push();

    return auth;
}