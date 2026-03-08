let allissues = [];

    // fecthing all data api
    const all_data=()=>{

      spin(true);
        const url=fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res)=>res.json())
        .then(data=>{
          allissues=data.data
          load_data(allissues)
        });
       
    }

    // spinner
const spin=(status)=>{
  if(status===true){
    document.getElementById("spin").classList.remove("hidden");
    document.getElementById("card_sec").classList.add("hidden")
  }
  else{
     document.getElementById("spin").classList.add("hidden");
    document.getElementById("card_sec").classList.remove("hidden")
  }
}

 
