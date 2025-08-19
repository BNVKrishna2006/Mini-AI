import { NextResponse } from "next/server";
export async function GET(){
return NextResponse.json({ok:true,at:new Date().toISOString()});
}

And since these rely on upload too, here’s the same compact upload route for convenience:

app/api/upload/route.ts
import { NextResponse } from "next/server";
export const runtime="edge";
export async function POST(req:Request){
try{
const ct=req.headers.get("content-type")||"";
if(!ct.includes("multipart/form-data")) return NextResponse.json({ok:false,error:"Expected multipart/form-data"},{status:400});
const form=await req.formData();
const file=form.get("file");
if(!(file instanceof File)) return NextResponse.json({ok:false,error:"No file uploaded"},{status:400});
const buf=await file.arrayBuffer();
return NextResponse.json({ok:true,name:file.name,type:file.type,size:buf.byteLength});
}catch(e:any){
return NextResponse.json({ok:false,error:String(e?.message||e)},{status:500});
}
}
