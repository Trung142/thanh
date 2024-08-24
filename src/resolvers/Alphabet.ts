import sequelize from "../config/DBSequelize";
import poolmysql from "../db/connects"
import db from "../models"
interface Args{
    id: number,
    alphabet: String,
    value: number,
    createdAt: String,
    updatedAt: String
}
export const AlphabetsResolver = {
    Query: {
        getAlphabets: async()=> {
            try {
             const rows = await db.Alphabet.findAll();
             console.log(rows)
             return rows
                // const [rows] = await poolmysql.query('SELECT * FROM Alphabets');
                // return {
                //     success: true,
                //     total: rows.length,
                //     items: rows
                // }
                
            } catch (error) {
                throw error
            }
           
        },
        getAlphabet: async(_: any,args:{id: String})=>{
            try {
                const [rows] = await poolmysql.query('SELECT * FROM Alphabets where id =?',[args?.id])
                if(rows.length==0){
                    return null
                }
                return rows[0]
              
            } catch (error) {
                console.error("Error fetching alphabet:", error);
                throw new Error("Failed to fetch alphabet");
            }
        },
        getAlphabetsByAlphabet: async(_: any,args:{where: Args})=>{
            try {
                if(!args?.where){
                    const [rows] = await poolmysql.query('SELECT * FROM Alphabets')
                    return {
                        success: true,
                        total: rows.length,
                        items: rows
                    }
                }
                const value = args?.where
                const [rows] = await poolmysql.query('SELECT * FROM Alphabets where alphabet =? or value =?  or createdAt =? or updatedAt =? or id =?',[value?.alphabet,value?.value,value?.createdAt,value?.updatedAt,value?.id])
                return {
                    success: true,
                    total: rows.length,
                    items: rows
                }
            } catch (error) {
                console.error("Error fetching alphabet:", error);
                throw new Error("Failed to fetch alphabet");
            }
        }
    },
    Mutation: {
        AddAlphabet: async(_: any,args: {data: Args })=>{
            try {
                const {alphabet,value,} = args?.data;
                const createdAt = new Date();
                const updatedAt = createdAt;
                const sql = 'INSERT INTO Alphabets (alphabet,value,createdAt,updatedAt) VALUES (?,?,?,?)';
                const [rows] = await poolmysql.query(sql,[alphabet,value,createdAt,updatedAt]);
                return {
                    success: true,
                    message:"Success",
                    id: rows.insertId
                }
            } catch (error) {
                throw error
            }
                
        },
        UpdateAlphabet: async(_: any,args: {data: Args})=>{
            try {
                const {id,value,alphabet} = args?.data
                console.log(id,value,alphabet)
                const [rows] = await poolmysql.query('SELECT * FROM Alphabets where id =?',[id])
                if(rows.length==0){
                    return {
                        success: false,
                        message:"Not found"
                    }
                }
               const values ={
                   id: rows[0].id,
                   alphabet: alphabet ? alphabet : rows[0].alphabet,
                   value: value ? value : rows[0].value
               }
                await poolmysql.query('UPDATE Alphabets SET alphabet = ?, value = ? WHERE id = ?', [values?.alphabet, values?.value,values?.id]);
                return {
                    success: true,
                    message:" update Success",
                }
            } catch (error) {
                throw error
            }
        },
        DeleteAlphabet: async(_: any,args: {id: String})=>{
            try {
                 const id = args?.id;
                const [rows] = await poolmysql.query('SELECT * FROM Alphabets where id =?',[id])
                if(rows.length==0){
                    return {
                        success: false,
                        message:"Not found"
                    }
                }
                await poolmysql.query('DELETE FROM Alphabets WHERE id = ?', [id]);
                return {
                    success: true,
                    message:" delete Success",
                }
            } catch (error) {
                throw error
            }
        }
        
    }
}