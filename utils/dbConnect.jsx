import mongoose from "mongoose";

const URL = process.env.MONGODB_TEST

function dbConnect() {
  try {
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.log(err);
  }
}

// if(!MONGODB_URL) {
//     throw new Error()
// }

// let cached = global.mongoose

// console.log(cached);
// if(!cached) {
//     cached = global.mongoose = {
//         conn: null, 
//         propmise: null
//     }
// }

// async function dbConnect() {
//     if(cached.conn) {
//         return cached.conn
//     }
//     if(!cached.propmise) {
//         const opts = {
//            bufferCommands: false 
//         }
//         cached.propmise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
//             return mongoose
//         })
//     }
//     cached.conn = await cached.promise
//     return cached.conn
// }


export default dbConnect