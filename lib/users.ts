import {firestore} from "./firestore"

const collection  = firestore.collection("users")

export class User 
{
    
    ref:FirebaseFirestore.DocumentReference;
    data: any;
    id: string;

    constructor(id)
    {
        this.id = id;
        this.ref = collection.doc(id) 
    }
    
    async pull ()
    {
        const snap = await this.ref.get();
        this.data = snap.data();
    }

    static async createNewUser (data)
    {
        // Creamos usuario en la nube.
        const newUserSnap = await collection.add(data)
        // Creamos usuario en local.
        const newUser = new User (newUserSnap.id);
        newUser.data = data;
        return newUser;
    }
}