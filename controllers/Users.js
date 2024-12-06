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