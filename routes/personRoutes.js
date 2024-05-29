const express=require('express');
const router = express.Router();
const Person=require('./../models/Person');

//Post the person
router.post('/',async(req,res)=>{
    try{
      const data=req.body;
      const newperson=new Person(data);
       const response=await newperson.save();
       console.log('data saved');
       res.status(200).json(response);
    }catch(err){
     console.log(err);
     res.send(500).json({error:'internal server error'});
    }
  
  });
  //Get person
  router.get('/',async(req,res)=>{
    try{
  const data=await Person.find();
  console.log('data fetched');
       res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.send(500).json({error:'internal server error'});
    }
  });
  //To fetch according workType Parametrize
  router.get('/:workType',async(req,res)=>{
    try{
      const workType=req.params.workType;
      if(workType=='chef'|| workType=='manager'||workType=='waiter'){
        const response=await Person.find({work:workType});
        console.log('Response fetched');
        res.status(200).json(response);
      }else{
        res.status(401).json({error:'Invalid workType'});
      }
    }catch(err){
      console.log(err);
      res.send(500).json({error:'internal server error'});
    }
    });
    //Update
   router.put('/:id',async(req,res)=>{
   try{
    const personId=req.params.id;
    const updatedPerson=req.body;
    const response=await Person.findByIdAndUpdate(personId,updatedPerson,{
        new:true,
        runValidators:true,
    })
    if(!response){
        return res.status(404).json({error:'person not found'}); 
    }
    console.log('data updated');
    res.status(200).json(response);

   }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
}
});
//Delete
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'person not found'}); 
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});
    
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    
    }
});
    
    module.exports = router;
