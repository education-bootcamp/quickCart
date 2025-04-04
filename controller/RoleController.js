const Role = require('../model/RoleSchema');

const createRole = async function (req, resp){
    const {role, description}=req.body;
    try{
        const newRole = new Role({
            role:role,
            description:description
        });
        const saveData = await newRole.save();
        return resp.status(201).json({message:'role created',data:saveData});
    }catch (e) {
        resp.status(500).json({error:e});
    }
}
module.exports ={
    createRole
}