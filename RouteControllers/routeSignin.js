function handleSignin(req,res,db,bcrypt){
    // console.log('made it to signin route')
    const{id,email,name,password}=req.body
    if(!email||!password){return res.status(400).json('incorrectFormSubmission')}
   
    db.select('email','hash').from('login').where('email','=',email)
    .then(data=>{
        console.log(data[0])
        const isValid=bcrypt.compareSync(password,data[0].hash);
        console.log(isValid)
        console.log(password)
        if (isValid){
             db.select('*').from('users').where('email','=',email)
            .then(user=>{res.json(user[0])})   
            .catch(err=>res.status(400).json('error'))
        } else {res.json('error')}
    })
    .catch(err=> res.status(400).json('error'))
}

module.exports={handleSignin: handleSignin}