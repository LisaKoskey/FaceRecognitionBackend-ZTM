function handleProfile (req,res){
    const {id}=req.params;
    let found = false;
    database.users.forEach(user=>{
        if (user.id===id){  found = true; res.json(user)  }
       // above has to return a value only if found (also added found variable), if don't, get console message cannot set headers after sent to client. 
        // else {res.status(404).json('no such user')}
    })
if (!found){res.status(404).json('no such user')}//if this was above, w/o a retur on the true, it would find a hit for every user (both found and no such user)  js won't let find multiple.  i gues since should be only one match, don't hve to have the return (which exits the process once hits??), but if 2 users with same id (which shouldn't be), it will try to populate twice
}

module.exports={handleProfile: handleProfile}