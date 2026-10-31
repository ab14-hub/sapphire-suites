const db=require('./_db');
module.exports=async(req,res)=>{
const pw=process.env.ADMIN_PASSWORD;if(!pw)return res.status(500).json({error:'ADMIN_PASSWORD not set'});
if(req.headers['x-admin-password']!==pw)return res.status(401).json({error:'unauthorized'});
try{const b=req.body||{};
if(req.method==='GET'){return res.json(await db.list())}
if(req.method==='PATCH'){const o=await db.get(b.id);if(!o)return res.status(404).json({error:'not found'});if(['new','confirmed','cancelled'].includes(b.status))o.status=b.status;await db.put(o);return res.json(o)}
if(req.method==='DELETE'){await db.del(b.id);return res.json({ok:1})}
res.status(405).end()}catch(e){res.status(500).json({error:'storage'})}};
