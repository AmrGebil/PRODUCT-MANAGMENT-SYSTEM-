let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let search=document.getElementById('search');
let searchtitle=document.getElementById('searchtitle');
let searchcategory=document.getElementById('searchcategory');
let tbody=document.getElementById('tbody');
let deleteAllBth=document.getElementById('deleteAllBth');

let mood="create";
let flage =0;

function getTotal(){
    if(price.value!=''){
   let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
   total.innerHTML=result;
   total.style.background='green';
    }
    else{
        total.style.background='#d91313';
        total.innerHTML='';
        
    }

}
let proarry=[];

if(localStorage.product !=null){
     proarry= JSON.parse(localStorage.product);
}
else{
     proarry=[];
}

submit.onclick=function(){
    let proObject={
         title:title.value.toLowerCase(),
         price:price.value,
         taxes:taxes.value,
         ads:ads.value,
         discount:discount.value,
         total:total.innerHTML,
         count:count.value,
         category:category.value.toLowerCase()

    }
    let cleandata=document.getElementById('cleandata');
    if(title.value!=''&& price.value!=''&&category.value!=''&& count.value<=100){
        if (mood==="create"){
            if(proObject.count>1){
                for(let i=0;i<proObject.count;i++){
                    proarry.push(proObject);  }
         }else{
            proarry.push(proObject);
            }      
        }else{
            proarry[flage]=proObject;
            count.style.display="block";
            submit.innerText="Create";
            mood="create";
    
    }
    cleandata.style.display='none';
    clearvalues();

    }
    else{
        
        cleandata.style.display='block';

    }
    
    
localStorage.setItem('product',JSON.stringify(proarry));
 
    showData();

}




function clearvalues(){

title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value=''; 
category.value='';
 
}


showData()

function showData(){
    getTotal()
    let table=``
    for(let i=0;i<proarry.length;i++){

        table+=`<tr>
        <td>${i+1}</td>
        <td>${proarry[i].title}</td>
        <td>${proarry[i].price}</td>
        <td>${proarry[i].taxes}</td>
        <td>${proarry[i].ads}</td>
        <td>${proarry[i].discount}</td>
        <td>${proarry[i].total}</td>
        <td>${proarry[i].category}</td>
        <th><button id="update"onclick="updateData(${i} )">update</button></th>
        <th><button id="delete" onclick="deleteItem(${i} )">delete</button></th>

    </tr>`
}
tbody.innerHTML=table;

if(proarry.length>0){
    deleteAllBth.innerText=`Delete All (${proarry.length})`
    deleteAllBth.style.display='block';

}
else{
    deleteAllBth.style.display='none';

}



}



function deleteItem(id){

    proarry.splice(id,1);

    localStorage.product=JSON.stringify(proarry);
    showData();

}

function deleteAll(){
    localStorage.clear();
    proarry.splice(0)
    showData();
}

function updateData(id){
    flage=id;
title.value=proarry[id].title;
price.value=proarry[id].price;
taxes.value=proarry[id].taxes;
ads.value=proarry[id].ads;
discount.value=proarry[id].discount;
getTotal();
count.style.display="none";
category.value=proarry[id].category;
submit.innerText="Update";
mood="update";

scroll({
    top:0,
    behavior:"smooth",

}
  
)
    
}

let searchmood="title";

function getSearchMood(value){

    if(value==="searchtitle"){
        searchmood="title";
    }
    else{
        searchmood="category"; 
    }
    search.placeholder="search by "+ searchmood;
    search.focus();
    search.value='';
    showData();
}

function searchdata(value){
    let table=``
    for(let i=0;i<proarry.length;i++){
        if(searchmood==="title" ){
            if(proarry[i].title.includes(value.toLowerCase())){
                table+=`<tr>
        <td>${i}</td>
        <td>${proarry[i].title}</td>
        <td>${proarry[i].price}</td>
        <td>${proarry[i].taxes}</td>
        <td>${proarry[i].ads}</td>
        <td>${proarry[i].discount}</td>
        <td>${proarry[i].total}</td>
        <td>${proarry[i].category}</td>
        <th><button id="update"onclick="updateData(${i} )">update</button></th>
        <th><button id="delete" onclick="deleteItem(${i} )">delete</button></th>

    </tr>`

            }

        }
        else{
            if(proarry[i].category.includes(value.toLowerCase())){
                table+=`<tr>
        <td>${i}</td>
        <td>${proarry[i].title}</td>
        <td>${proarry[i].price}</td>
        <td>${proarry[i].taxes}</td>
        <td>${proarry[i].ads}</td>
        <td>${proarry[i].discount}</td>
        <td>${proarry[i].total}</td>
        <td>${proarry[i].category}</td>
        <th><button id="update"onclick="updateData(${i} )">update</button></th>
        <th><button id="delete" onclick="deleteItem(${i} )">delete</button></th>

    </tr>`

            }

        }
    }
    tbody.innerHTML=table;

}