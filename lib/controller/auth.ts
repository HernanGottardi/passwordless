import {User} from "../users"
import {Auth} from "../auth"

export async function findOrCreateAuth (email:string)
{
    const cleanEmail = email.trim().toLowerCase();
    const auth = Auth.findByEmail(cleanEmail)
    if (auth)
    {
        return auth;
    }
    else
    {
        const newUser = await User.createNewUser({
            email: cleanEmail
        });

        const newAuth = await Auth.createNewAuth(
        {
            email: cleanEmail,
            userId: newUser.id,
            code: "",
            expires: new Date()
        })
    }
}