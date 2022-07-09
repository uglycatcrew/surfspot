import dbConnect from "../../../utils/dbConnect";
import Spots from "../../../models/spots"

export default async function handler(req, res) {
    
    const { method } = req

    dbConnect()

    if(method === 'GET') {
        try{

            const spots = await Spots.find()
            res.status(200).json(spots)

        } catch(err) {
            res.status(500).json(err)
        }
    }

    if(method === 'POST') {
        try{

            const spots = await Spots.create(req.body)
            res.status(201).json(spots)

        } catch(err) {
            res.status(500).json(err)
        }
    }
}