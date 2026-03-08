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




function labels_display(arr){
  const new_arr = arr.map(el => {
    let color = "bg-gray-100";

    if(el==="bug"){
      color="bg-red-100 badge-error";
    }
    else if(el==="help wanted"){
      color="bg-yellow-100 badge-warning";
    }
    else if(el==="good first issue" || el==="enhancement"){
      color="bg-green-100 badge-success";
    }
    else if(el==="documentation"){
       color="bg-purple-100 badge-primary";
    }

    return`<span class="badge badge-outline ${color}">
      ${el}
    </span>`;
  });

  return new_arr.join(" ");
}


document.getElementById("input_issue").addEventListener("input", () => {

  let input = document.getElementById("input_issue").value.trim().toLowerCase();
  console.log(input);


  if(input === ""){
    load_data(allissues);
    return;
  }

spin(true);

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input}`)
    .then(res => res.json())
    .then(data => {
      load_data(data.data);
    });

});




const info = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => {
      issues = data.data;
    showModalInfo(issues);
    })
 
};



function showModalInfo(issue) {

document.getElementById('modal_info').innerHTML = `
    <h2 class="text-2xl font-bold text-slate-900 mb-4">${issue.title}</h2>

<div class="flex flex-wrap items-center gap-4 text-gray-500 mb-6">

  <span class="px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${issue.status === 'open' ? 'bg-emerald-500 text-white' : 'bg-purple-500 text-white'}">
  ${issue.status}
  </span>


  <span>Opened by <span class="font-medium text-gray-800">${issue.author}</span></span>


  <span class="text-sm">${issue.updatedAt}</span>
</div>

<div class="flex flex-wrap gap-3 mb-6">
  ${labels_display(issue.labels)}
</div>

<p class="text-gray-700 text-base leading-relaxed mb-8">
  ${issue.description || 'No description provided.'}
</p>


<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 rounded-xl">

  <div>
    <h4 class="text-gray-600 text-sm mb-1">Assignee:</h4>
    <p class="text-gray-900 font-semibold text-lg">${issue.assignee || issue.author}</p>
  </div>


  <div>
    <h4 class="text-gray-600 text-sm mb-1">Priority:</h4>
    <span class="inline-block px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider ${
      issue.priority === 'high' ? 'bg-red-100 text-red-600' :
      issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-400' :
      'bg-gray-300 text-gray-800'
    }">
      ${issue.priority}
    </span>
  </div>
</div>`
}
