const express=require('express');
const router = express.Router();
const MenuItem=require('./../models/MenuItem');

//Post the menu
router.post('/',async(req,res)=>{
    try{
    const MenuItemdata=req.body;
    const newMenu=new MenuItem(MenuItemdata);
    const menu_data=await newMenu.save();
    console.log('menu saved');
       res.status(200).json(menu_data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  });

  //Get menu
  router.get('/',async(req,res)=>{
    try{
    const MenuItemdata=await MenuItem.find();
    console.log('MenuItemdata fetched');
       res.status(200).json(MenuItemdata);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  });
  //Parametrize menu
  router.get('/:taste',async(req,res)=>{
    try{
      const taste=req.params.taste;
      if(taste=='Sweet'|| taste=='Sour'||taste=='Spicy'){
        const response=await MenuItem.find({taste:taste});
        console.log('Response fetched');
        res.status(200).json(response);
      }else{
        res.status(401).json({error:'Invalid taste'});
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
    });
    //Update
   router.put('/:id',async(req,res)=>{
   try{
    const menuId=req.params.id;
    const updatedmenu=req.body;
    const response=await MenuItem.findByIdAndUpdate(menuId,updatedmenu,{
        new:true,
        runValidators:true,
    })
    if(!response){
        return res.status(404).json({error:'menu not found'}); 
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
        const menuId=req.params.id;
        const response=await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:'person not found'}); 
        }
        console.log('data deleted');
        res.status(200).json({message:'menu deleted successfully'});
    
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    
    }
    //Commit added for testing purpose
});
  module.exports = router;