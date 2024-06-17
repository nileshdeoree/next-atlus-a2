import connectDb from "@/middleware/mongoose"
import User from "@/models/User"


const handler = async(req,res) =>{
    if(req.method == 'POST'){
        try {
            let p = new User({
                name: req.body.name,
                email: req.body.email
            })
            await p.save()
            res.json({message : "success"})
        } catch (error) {
            res.json({messsage: "inside catch"})
        }
    }
    else{
        res.json({message: "This method is not allowed"})
    }
}

export default connectDb(handler)