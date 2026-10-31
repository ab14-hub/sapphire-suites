const db=require('./_db');
module.exports=async(req,res)=>{
if(req.method!=='POST')return res.status(405).end();
const b=req.body||{};if(b.website)return res.json({ok:1});
const t=(v,n=200)=>String(v??'').slice(0,n).trim(),d=/^\d{4}-\d{2}-\d{2}$/;
const o={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),listingId:t(b.listingId,40),listing:t(b.listing),name:t(b.name,100),phone:t(b.phone,40),checkIn:t(b.checkIn,10),checkOut:t(b.checkOut,10),nights:+b.nights||0,guests:t(b.guests,10),total:+b.total||0,notes:t(b.notes,500),status:'new',createdAt:new Date().toISOString()};
if(!o.name||!o.phone||!d.test(o.checkIn)||!d.test(o.checkOut))return res.status(400).json({error:'invalid'});
try{await db.add(o);res.json({ok:1})}catch(e){res.status(500).json({error:'storage'})}};
