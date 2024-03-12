import mysql2 from 'mysql2'
import {config} from 'dotenv'
import {pool} from '../config/config.js'
config()

const getUsers = async()=>{
    const[result] = await pool.query(`
    SELECT * FROM
    users
    `)
    return result
}
const getUser = async(id) =>{
    const [result] = await pool.query(`
    SELECT *
    FROM users
    WHERE userID = ?
    `,[id])
    return result
}

const addUser = async(firstname, lastname,email, password)=>{
    await pool.query(`
    INSERT INTO users (firstname, lastname,email, password) VALUES (?,?,?,?)
    `,[firstname, lastname,email, password])
}
const editUser = async(firstname, lastname,email,password,id)=>{
    const [user] = await pool.query(`
        UPDATE users
        SET firstname=?,lastname=?,email=?,password=?
        WHERE userID = ?
    `,[firstname, lastname,email, password, userID])
    return user
}

const deleteUser = async(id) => { // pool helps connect to the database
    const [result] = await pool.query(` 
        DELETE FROM users WHERE (userID) = (?)
    `,[id])
    return result
}



// const checkAdmin = async (email) => {
//     const [[{userPass}]] = await pool.query(`
//     SELECT userPass FROM admin WHERE email = ?
//     `,[email])
//     return userPass
// }


export {getUsers,getUser,addUser,editUser,deleteUser}