const db=require('./_db');
module.exports=async(req,res)=>{
const pw=process.env.ADMIN_PASSWORD;if(!pw)return res.status(500).json({error:'ADMIN_PASSWORD not set'});
if(req.headers['x-admin-password']!==pw)return res.status(401).json({error:'unauthorized'});
try{const b=req.body||{};
if(req.method==='GET'){const a=await db(['HGETALL','bookings'])||[],l=[];for(let i=1;i<a.length;i+=2)try{l.push(JSON.parse(a[i]))}catch(e){}l.sort((x,y)=>y.createdAt.localeCompare(x.createdAt));return res.json(l)}
if(req.method==='PATCH'){const v=await db(['HGET','bookings',b.id]);if(!v)return res.status(404).json({error:'not found'});const o=JSON.parse(v);if(['new','confirmed','cancelled'].includes(b.status))o.status=b.status;await db(['HSET','bookings',b.id,JSON.stringify(o)]);return res.json(o)}
if(req.method==='DELETE'){await db(['HDEL','bookings',b.id]);return res.json({ok:1})}
res.status(405).end()}catch(e){res.status(500).json({error:'storage'})}};
