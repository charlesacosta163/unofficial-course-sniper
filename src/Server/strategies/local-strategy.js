import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

async function authUser(username, password, done) {
    console.log(username);
    console.log(password);

    try {
        const response = await fetch("http://localhost:5000/api/students/")
        const data = await response.json()

        const findUser = data.find(user => user.email === username)

        if (!findUser) throw new Error ("User not found")
        if (findUser.password !=  password) throw new Error ("Invalid password")

        done(null, findUser)

    } catch (err) {
        done(err, null)
    }
}

passport.serializeUser(function(user, done){
    done(null, user.studentId)
})

passport.deserializeUser(async function(id, done) {
    console.log("Inside deserialize user");
    console.log(`ID: ${id}`);
    try {
        const response = await fetch("http://localhost:5000/api/students/")
        const data = await response.json()

        const findUser = data.find(user => user.studentId === id)        
        
        if (!findUser)
            throw new Error("User not found!")

        done(null, findUser)

    } catch (err) {
        done(err, null)
    }

})

export default passport.use(new LocalStrategy({usernameField: 'email'} , authUser))