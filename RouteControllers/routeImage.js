const Clarifai = require('clarifai');
const app=new Clarifai.App({	apiKey: 'fef59428c01840ce9b7044acaea76707'});

const handleImage=(req,res,db)=>{
    console.log('made it to image route')
    const {id}=req.body;

    db('users')
    .where('id','=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{res.json(entries)})
    .catch(err=>{res.status(400).json('error')})
}

const handleClarifaiAPI=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>{res.json(data)}
    )
    .catch(err=>res.status(400).json('API not working'))
}


// module.exports={handleImage: handleImage,handleClarifaiAPI:handleClarifaiAPI}
module.exports={handleImage,handleClarifaiAPI}