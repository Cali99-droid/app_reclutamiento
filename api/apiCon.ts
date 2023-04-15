const apiCon = async(url:string)=>{
   const res =  await fetch(`http://localhost:3000/api${url}`)
   return res.json();
}


export default apiCon;