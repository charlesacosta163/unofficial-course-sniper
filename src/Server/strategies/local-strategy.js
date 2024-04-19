import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const API_URL = process.env.API_URL;
const localURL = 'http://localhost:5000/'

async function authUser(username, password, done) {
    console.log(username);
    console.log(password);

    try {
        const response = await fetch(`${API_URL}api/students`);
        if (!response.ok) {
            throw new Error("Failed to fetch student data");
        }
        
        const data = await response.json();
        console.log(data);

        const findUser = data.find(user => user.email === username);

        if (!findUser) {
            throw new Error("User not found");
        }

        if (findUser.password !== password) {
            throw new Error("Invalid password");
        }

        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
}

passport.serializeUser(function(user, done){
    done(null, user.studentId);
});

passport.deserializeUser(async function(id, done) {
    console.log("Inside deserialize user");
    console.log(`ID: ${id}`);
    try {
        const response = await fetch(`${API_URL}api/students`);
        if (!response.ok) {
            throw new Error("Failed to fetch student data");
        }

        const data = await response.json();

        const findUser = data.find(user => user.studentId === id);        

        if (!findUser) {
            throw new Error("User not found!");
        }

        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

export default passport.use(new LocalStrategy({ usernameField: 'email' }, authUser));