const db=require('./_db');
module.exports=async(req,res)=>{const e=process.env,r={adminPassword:!!e.ADMIN_PASSWORD,supabaseUrl:!!e.SUPABASE_URL,urlLooksRight:/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(e.SUPABASE_URL||''),serviceKey:!!(e.SUPABASE_SERVICE_KEY||e.SUPABASE_SERVICE_ROLE_KEY),db:'untested'};
try{await db.list();r.db='ok'}catch(x){r.db=String(x.message).slice(0,160)}
res.json(r)};
