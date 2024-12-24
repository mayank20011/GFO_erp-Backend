import Users from "../models/Users.js";
export function matchClient(req,res)
{
  const {name, password}=req.body;
  console.log(`{"name":${name}, "password":${password}}`)
  Users.findOne({"name":name, "password":password})
  .then((user)=>
    {
      console.log(user);
      if(user)
        {
          //  status code 201 for success
          res.status(201).send(
            {
              "authorization":true,
              "roles":user.roles
            }
           )
        }
        else{
          // status code 401 for authentication failed
          res.status(401).send(
            {
              "authorization":false,
            }
           )
        }
    })
  .catch((err)=>
    {
      console.log(`Error while finding user is ${err}`);
    })
}

export function sendAllClient(req,res)
{
   Users.find()
   .then((users)=>{
    res.status(200).send({
      success:true,
      data:users,
      count:users.count
    })
   })
   .catch((err)=>
    {
      console.log(err);
    })
}

export function addClient(req, res){
  console.log(req.body);
  Users.create(req.body)
  .then((data)=>{
    if(data){
      res.status(201).json({
        success:true,
      })
    }
    else{
      res.status(404).json({
        success:false
      })
    }
  })
  .catch((err)=>{
    res.status(500).json({
      success:false
    })
    console.log(err);
  })

}

export function deleteUser(req, res){
  console.log(req.params.id);
  Users.findByIdAndDelete(req.params.id)
  .then((data)=>{
      res.status(201).json({
        success:true,
      })
  })
  .catch((err)=>{
      res.status(500).json({
        success:false
      })
  });
}

export function updateClient(req, res){
   Users.findByIdAndUpdate(req.body.id, {
     name:req.body.name,
     password:req.body.password,
     roles:req.body.roles
   })
   .then((data)=>{
    res.status(201).json({
      success:true,
    })
   })
   .catch((err)=>{
    console.log(err);
    res.status(501).json({
      success:false,
    })
   })
}