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

 

const load_data=(data)=>{
const mother=document.getElementById("card_sec")
mother.innerHTML=""

const display_Num=document.getElementById("display_number")
display_Num.innerHTML=`
<h1 class="font-semibold text-2xl">${data.length} Issues</h1>
    <p class="text-[#64748B]">Track and manage your project issues</p>
`
data.forEach(element => {
  

    let border_color="border-green-500"
    let icon=""
    if(element.status=="open"){
      border_color="border-green-500"
icon="Open-Status.png"

    }
    else{
       border_color="border-purple-500"
       icon="Closed-Status.png"
    }

let priority="green"

if(element.priority==="high"){
  priority="red"
}
else if(element.priority==="medium"){
  priority="yellow"
}
else{
  priority="gray"
}



    const child_card_sec=document.createElement("div");
    child_card_sec.className=`bg-white rounded-lg shadow p-5 flex flex-col justify-between border-t-4 cursor-pointer ${border_color}`


const modal = document.getElementById("my_modal_5");
    child_card_sec.addEventListener("click",()=>{
info(element.id);
modal.showModal();

    })


    child_card_sec.innerHTML=`
        <div class="flex justify-between items-start">
        <img src="./assets/${icon}" alt="">
    <span class="text-sm md:text-base font-semibold text-${priority}-700 bg-${priority}-100 px-3 py-1.5 rounded-2xl shadow-sm hover:bg-green-200 transition-all duration-300">
  ${element.priority}
</span>
    </div>
    <h2 class="text-md font-semibold mt-2">${element.title}</h2>
    <p class="text-gray-500 text-sm mt-1">${element.description}</p>
    <div class="flex flex-wrap gap-2 my-3">
    ${labels_display(element.labels)}
    </div>
    <hr class=" opacity-20">
    <div class=" text-gray-500 text-sm mt-3 space-y-3">
      <p>#${element.author}</p>
      <p>${element.updatedAt}</p>
    </div>
    
    `
   mother.appendChild(child_card_sec);

    
    
});

 spin(false);
}

window.addEventListener("DOMContentLoaded", all_data);

document.getElementById("all_btn").addEventListener("click",()=>{
all_data(); 

})




document.getElementById("open_btn").addEventListener("click",()=>{
  spin(true)
const open_issue=allissues.filter(open=>open.status==="open")
 load_data(open_issue);
})


document.getElementById("close_btn").addEventListener("click",()=>{
  spin(true)
const close_issue=allissues.filter(close=>close.status==="closed")

 load_data(close_issue);
})



const indicator = (id) => {
  document.querySelectorAll("#all_btn, #open_btn, #close_btn").forEach(btn => {
    btn.classList.remove("bg-primary", "text-white");
    btn.classList.add("bg-white", "text-black");
  });

  const btn = document.getElementById(id);
  btn.classList.remove("bg-white", "text-black");
  btn.classList.add("bg-primary", "text-white");   
};




