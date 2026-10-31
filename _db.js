const U=process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL,T=process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN;
module.exports=async a=>{if(!U||!T)throw new Error('db not configured');const r=await fetch(U,{method:'POST',headers:{Authorization:'Bearer '+T},body:JSON.stringify(a)});const j=await r.json();if(j.error)throw new Error(j.error);return j.result};
