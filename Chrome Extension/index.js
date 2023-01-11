let myLeads=[]
const inputBtn=document.getElementById("input-btn")
const tapBtn=document.getElementById("tap-btn")
const deleteBtn=document.getElementById("delete-btn")
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const leadsFromLocal=JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocal){
    myLeads=leadsFromLocal
    render(myLeads)
}


function render(leads){
    let listItem=""
   for(let i=0;i<leads.length;i++){
        // listItem+="<li><a target='_blanck' href='"+myLeads[i]+"'>"+myLeads[i]+"</a></li>"
        listItem+=`
        <li><a target='_blanck' href='${leads[i]}'> ${leads[i]}</a></li>
        `
   }
   ulEl.innerHTML=listItem
}

tapBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true} ,function(tabs){
        console.log(tabs)
        myLeads.push(tabs[0].url)
    render(myLeads)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    })
    
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)

})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    render(myLeads)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
})
