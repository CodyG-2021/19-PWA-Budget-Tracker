(()=>{"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/service-worker.js").then((e=>{console.log("service worker registered",e)}))}));let e,t=[];function n(){let e=t.reduce(((e,t)=>e+parseInt(t.value)),0);document.querySelector("#total").textContent=e}function o(){let e=document.querySelector("#tbody");e.innerHTML="",t.forEach((t=>{let n=document.createElement("tr");n.innerHTML=`\n      <td>${t.name}</td>\n      <td>${t.value}</td>\n    `,e.appendChild(n)}))}function r(){let n=t.slice().reverse(),o=0,r=n.map((e=>{let t=new Date(e.date);return`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()}`})),a=n.map((e=>(o+=parseInt(e.value),o)));e&&e.destroy();let l=document.getElementById("myChart").getContext("2d");e=new Chart(l,{type:"line",data:{labels:r,datasets:[{label:"Total Over Time",fill:!0,backgroundColor:"#6666ff",data:a}]}})}function a(e){let a=document.querySelector("#t-name"),l=document.querySelector("#t-amount"),c=document.querySelector(".form .error");if(""===a.value||""===l.value)return void(c.textContent="Missing Information");c.textContent="";let i={name:a.value,value:l.value,date:(new Date).toISOString()};e||(i.value*=-1),t.unshift(i),r(),o(),n(),fetch("/api/transaction",{method:"POST",body:JSON.stringify(i),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{e.errors?c.textContent="Missing Information":(a.value="",l.value="")})).catch((e=>{saveRecord(i),a.value="",l.value=""}))}fetch("/api/transaction").then((e=>e.json())).then((e=>{t=e,n(),o(),r()})),document.querySelector("#add-btn").onclick=function(){a(!0)},document.querySelector("#sub-btn").onclick=function(){a(!1)}})();