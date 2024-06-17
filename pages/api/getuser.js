import connectDb from "@/middleware/mongoose"
import User from "@/models/User"


const handler = async(req,res) =>{
    if(req.method == 'GET'){
        try {
            let p = await User.find()
            res.json(p)
            
        } catch (error) {
            res.json({messsage: "inside catch"})
        }
    }
    else{
        res.json({message: "This method is not allowed"})
    }
}

export default connectDb(handler)