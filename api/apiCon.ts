const apiCon = async(url:string)=>{
   const res =  await fetch(`${process.env.NEXTAUTH_URL}/api${url}`)
   return res.json();
}


export default apiCon;