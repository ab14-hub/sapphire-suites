const U=process.env.SUPABASE_URL,K=process.env.SUPABASE_SERVICE_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
const q=async(path,opt={})=>{if(!U||!K)throw new Error('db not configured');const r=await fetch(U+'/rest/v1/bookings'+path,{...opt,headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json',...(opt.headers||{})}});if(!r.ok)throw new Error(await r.text());const t=await r.text();return t?JSON.parse(t):null};
const id=v=>'?id=eq.'+encodeURIComponent(v);
module.exports={
add:o=>q('',{method:'POST',body:JSON.stringify({id:o.id,data:o})}),
list:async()=>(await q('?select=data&order=created_at.desc')).map(r=>r.data),
get:async v=>((await q(id(v)+'&select=data'))[0]||{}).data,
put:o=>q(id(o.id),{method:'PATCH',body:JSON.stringify({data:o})}),
del:v=>q(id(v),{method:'DELETE'})};
