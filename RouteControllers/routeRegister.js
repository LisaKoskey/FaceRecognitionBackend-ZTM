function handleRegister(req,res,bcrypt,db){
    const{id,email,name,password}=req.body
    if(!email||!name||!password){return res.status(400).json('incorrectFormSubmission')}
    const hash = bcrypt.hashSync(password)
    
//below transaction(al) does commands only if prev fin.
    db.transaction(dbTrans=>{    
        dbTrans('login')
        .insert({id:id,hash:hash,email:email})
        .returning(['email','id'])
        .then(login =>{
            db('users')
            .returning('*')
            .insert({id:login[0].id,email:login[0].email,name: name,joined: new Date()})
            .then(user=>{res.json(user)})
        })
        .then(dbTrans.commit)
        .catch(dbTrans.rollback)
    })
}

module.exports ={
handleRegister: handleRegister
}