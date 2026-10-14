const titles = [
 {name:"Demo: Oka Chinna Cinema",type:"Movie",genre:"Drama",desc:"A placeholder listing for an independent Telugu feature."},
 {name:"Demo: Nela Meeda Nakshatram",type:"Web Series",genre:"Romance",desc:"A placeholder listing for a Telugu web series."},
 {name:"Demo: Veedhi Kathalu",type:"Short Film",genre:"Anthology",desc:"A placeholder listing for a short film collection."},
 {name:"Demo: Mana Ooru",type:"Movie",genre:"Family",desc:"A placeholder listing. Replace only with licensed content."},
 {name:"Demo: First Episode",type:"Web Series",genre:"Mystery",desc:"A placeholder episode listing."}
];
let active = "All";
const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
function render(){
 const q=search.value.trim().toLowerCase();
 const filtered=titles.filter(t=>(active==="All"||t.type===active)&&t.name.toLowerCase().includes(q));
 grid.innerHTML="";
 filtered.forEach((t)=>{
  const b=document.createElement("button");b.className="card";
  const poster=document.createElement("div");poster.className="poster";poster.textContent="🎬";
  const info=document.createElement("div");info.className="card-info";
  const h=document.createElement("h3");h.textContent=t.name;
  const p=document.createElement("p");p.textContent=`${t.type} · ${t.genre}`;
  info.append(h,p);b.append(poster,info);b.addEventListener("click",()=>openDetails(t));grid.append(b);
 });
 if(!filtered.length) grid.textContent="No matching titles.";
}
function openDetails(t){
 document.querySelector("#detailType").textContent=t.type.toUpperCase();
 document.querySelector("#detailTitle").textContent=t.name;
 document.querySelector("#detailDescription").textContent=t.desc;
 document.querySelector("#details").showModal();
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
 active=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));render();
}));
search.addEventListener("input",render);
document.querySelector("#closeDetails").addEventListener("click",()=>document.querySelector("#details").close());
document.querySelector("#watchButton").addEventListener("click",()=>alert("Demo only. Add a video URL only for a film you own or are licensed to stream."));
document.querySelector("#year").textContent=new Date().getFullYear();
render();

let installPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;const btn=document.querySelector("#installBtn");btn.classList.remove("hidden");btn.addEventListener("click",async()=>{installPrompt.prompt();installPrompt=null;btn.classList.add("hidden");},{once:true});});
if("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
