let sol=document.getElementById('sol');
let current=0;
const incr=document.getElementById('inc');
const res=document.getElementById('reset');
const decr=document.getElementById('dec');

incr.addEventListener('click',()=>{
    current++;
    sol.textContent=current;
})

decr.addEventListener('click',()=>{
    current--;
    sol.textContent=current;
})

res.addEventListener('click',()=>{
    current=0;
    sol.textContent=current;
})