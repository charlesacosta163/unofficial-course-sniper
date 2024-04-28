import bcrypt from 'bcryptjs'

const saltRounds = 10

// Hashing the Password
export const hashPassword = password => {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
}

// Compare Plain Text Password to the Hashed Password (returns true/false)
export const comparePassword = (plain, hashed) => bcrypt.compareSync(plain, hashed) 