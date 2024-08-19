// -------------------------------------
//              get input and push into object inside the array
// -------------------------------------

// let emailvalue=document.getElementById('email');
// let passwordvalue=document.getElementById('pass'); 
// let emptyarr=[];

// function login(){
//     let obj={
//         email: emailvalue.value,
//         password: passwordvalue.value
//     }
//     emptyarr.push(obj);
// }


// -------------------------------------
//              show resume details inside the html while typing (onkeyup)
// -------------------------------------
// let resume={
//   personaldetails:{},
//   contact:{},
//   objective:{}

// };

// function save(at,key,p_key){
//   if(p_key){
//     resume[p_key][key]=at.value;
//   }else{
//     resume[key]=at.value;
//   }
  
//   document.getElementById('preview').innerHTML = JSON.stringify(resume);
  
// }




// -------------------------------------
//              add array inside the resume as skills
// -------------------------------------
// let resume={
//   personaldetails:{},
//   contact:{},
//   objective:{},
//   skills:[],

// };

// function save(at,key,p_key,arr_key){
//   if(p_key){
//     resume[p_key][key]=at.value;
//   }else if(arr_key){
//     // resume[arr_key]=at.value;
//     resume[arr_key].push(at.value);
//   }else{
//         resume[key]=at.value;
//       }
//   document.getElementById('preview').innerHTML = JSON.stringify(resume);
  
// }



let resume={
  personaldetails:{
    languages_known:[],
  },
  contact:{},
  objective:{},
  skills:[],
  workexperience:[],
  education:[],
  projects:[]

};


// function display(){
//   document.getElementById('preview').innerHTML = JSON.stringify(resume);
// }
function save(at,key,p_key){
  
  if(p_key){
    resume[p_key][key]=at.value;
  }
  // else if(arr_key){
  //   resume[arr_key].push(at.value);
      
    
    // resume[arr_key]=at.value;
    
  // }
  else{
        resume[key]=at.value;
      }

// display();

}


function add(p_key,sec_key,parent_personal_key){
 
    if(parent_personal_key){
      let addvalue=document.getElementById(sec_key);
      resume[p_key][parent_personal_key].push(addvalue.value);
      addvalue.value="";
       
    }else{
      let addvalue=document.getElementById(sec_key);
      resume[p_key].push(addvalue.value);
      addvalue.value="";
    }
    // display(); 
    addskills(p_key,parent_personal_key);  
   
}

function addskills(p_key,parent_personal_key){
    if(parent_personal_key){
      let listdata="";
      for (let each in resume[p_key][parent_personal_key]){
        listdata+=`<li>${resume[p_key][parent_personal_key][each]}</li>
         <button onclick="deletedata('${each}','${p_key}','${parent_personal_key}')"> Delete </button>
        `;
      }
    document.getElementById("language_listing").innerHTML=listdata;
    }
    else{
      let listdata="";
      for (let each in resume[p_key]){
        listdata+=`<li>${resume[p_key][each]}</li> 
        <button onclick="deletedata(${each},'${p_key}')"> Delete </button>`;
      }
    document.getElementById("Skill_listing").innerHTML=listdata;
    
    }
  
  }
   

  

function deletedata(data1,p_key,parent_personal_key){
  let data=[];
  if(parent_personal_key){
    
    for(let each in resume[p_key][parent_personal_key]){
      if(each !=data1){
        data.push(resume[p_key][parent_personal_key][each])
      }
      resume[p_key][parent_personal_key]=data;
      addskills(p_key,parent_personal_key);
  }}else{
  for(let each in resume[p_key]){
    if(each !=data1){
      data.push(resume[p_key][each])
    }
  }
  resume[p_key]=data;
  addskills(p_key);
  }
 
}

function exp_add(displaytable,key,first_param,second_param,third_param,fourth_param,fivth_param,sixth_param){

 let firstparamvalue=document.getElementById(first_param);
 let secondparamvalue=document.getElementById(second_param);
 let thirdparamvalue=document.getElementById(third_param);
 let fourthparamvalue=document.getElementById(fourth_param);
 let fifthparamvalue=document.getElementById(fivth_param);
 let sixthparamvalue=document.getElementById(sixth_param);

 let details = {};
 
 if(sixth_param){
  details[first_param] = firstparamvalue.value;
  details[second_param] = secondparamvalue.value;
  details[third_param]= thirdparamvalue.value;
  details[fourth_param]= fourthparamvalue.value;
  details[fivth_param]= fifthparamvalue.value;
  details[sixth_param]= sixthparamvalue.value;
 
  firstparamvalue.value="";
  secondparamvalue.value="";
  thirdparamvalue.value="";
  fourthparamvalue.value="";
  fifthparamvalue.value="";
  sixthparamvalue.value="";
  resume[key].push(details);
  // display();

 }else{
 
  details[first_param] = firstparamvalue.value;
  details[second_param] = secondparamvalue.value;
  details[third_param]= thirdparamvalue.value;
  details[fourth_param]= fourthparamvalue.value;
  details[fivth_param]= fifthparamvalue.value;

  firstparamvalue.value="";
  secondparamvalue.value="";
  thirdparamvalue.value="";
  fourthparamvalue.value="";
  fifthparamvalue.value="";

 resume[key].push(details);
//  display();
 }
 addobjectdatas(displaytable,key,first_param,second_param,third_param,fourth_param,fivth_param,sixth_param);
}

function addobjectdatas(displaytable,key,first_param,second_param,third_param,fourth_param,fivth_param,sixth_param){


  if(sixth_param){
    let listdata="";
    for (let each in resume[key]){
      listdata+=` <tr>
    <td>${resume[key][each][first_param]}</td>
    <td>${resume[key][each][second_param]}</td>
    <td>${resume[key][each][third_param]}</td>
     <td>${resume[key][each][fourth_param]}</td>
     <td>${resume[key][each][fivth_param]}</td>
     <td>${resume[key][each][sixth_param]}</td>
     <td> <button onclick="deleteobjdata('${displaytable}','${each}','${key}','${first_param}','${second_param}','${third_param}','${fourth_param}','${fivth_param}',${sixth_param})"> Delete </button></td>
      </tr>`;
    }
  document.getElementById(displaytable).innerHTML=listdata;
  }
  else{
    let listdata="";
    for (let each in resume[key]){
      listdata+=` <tr>
    <td>${resume[key][each][first_param]}</td>
    <td>${resume[key][each][second_param]}</td>
    <td>${resume[key][each][third_param]}</td>
     <td>${resume[key][each][fourth_param]}</td>
     <td>${resume[key][each][fivth_param]}</td>
     <td> <button onclick="deleteobjdata('${displaytable}','${each}','${key}','${first_param}','${second_param}','${third_param}','${fourth_param}','${fivth_param}',${sixth_param})"> Delete </button></td>
      </tr>`;
    }
  document.getElementById(displaytable).innerHTML=listdata;
  } 
}

function deleteobjdata(displaytable,data1,key,first,second,third,fourth,fifth){
let data=[];
for(let each in resume[key]){
  if(each !=data1){
    data.push(resume[key][each]);
  }
 
}

resume[key]=data;

addobjectdatas(displaytable,key,first,second,third,fourth,fifth);
}






// Register Page Storage ///



///Basic Local Storage Example///

// function registerbutton(firstparam,secondparam,thirdparam){
//   let namevalue=document.getElementById(firstparam).value;
//   let passwordvalue=document.getElementById(secondparam).value;
//   let emailidvalue=document.getElementById(thirdparam).value;
//   localStorage.setItem("Name",namevalue);
//  localStorage.setItem("Password",passwordvalue);
//  localStorage.setItem("Email",emailidvalue);
// }

if(!localStorage.getItem("users_List")){
  localStorage.setItem("users_List",JSON.stringify([]));
}
let users_array=JSON.parse(localStorage.getItem("users_List"))
function registerbutton(firstparam,secondparam,thirdparam){
  let namevalue=document.getElementById(firstparam).value;
  let passwordvalue=document.getElementById(secondparam).value;
  let emailidvalue=document.getElementById(thirdparam).value;
 
  let register_object_list={};
  register_object_list.name=namevalue;
  register_object_list.password=passwordvalue;
  register_object_list.emailid=emailidvalue;


users_array.push(register_object_list);
localStorage.setItem("users_List",JSON.stringify(users_array));
}

function loginbutton(firstparam,secondparam){
    let namevalue=document.getElementById(firstparam).value;
    let passwordvalue=document.getElementById(secondparam).value;
  let loginvalue= false;
  for (let each in users_array){
    if(namevalue==users_array[each].emailid && passwordvalue==users_array[each].password){
      loginvalue=true;
    }
  }
  if (loginvalue==true){
    alert("Login success");
    window.location.href = "Index.html";
  }else{
    alert("Login failed");
  }
localStorage.setItem("admin_id",namevalue);



 }

 ///Getting and Adding Admin email ID
 
 let admin_email =localStorage.getItem("admin_id");
resume.admin_id=admin_email;



///Resume Submiting Function ///


 if(!localStorage.getItem("resume_list")){
  localStorage.setItem("resume_list",JSON.stringify([]));
 }

let resume_list_array=JSON.parse(localStorage.getItem("resume_list"));
function resumesubmit(){

  resume_list_array.push(resume);
localStorage.setItem("resume_list",JSON.stringify(resume_list_array));

viewlist();
}


function viewlist(){
  
for(let each in resume_list_array){
  if(resume.admin_id==resume_list_array[each].admin_id){
    document.getElementById("whole_listing").innerHTML+=`<tr>
    <td>${resume_list_array[each].name} </td>
    <td>${resume_list_array[each].email} </td>
    <td>${resume_list_array[each].phoneno} </td>
    <td><a href="view.html?index=${each}"><button>View</button> </a></td>
    <td> <button onclick="">Delete</button></td>
    </tr>`
  }
  
}
}

function deletelisting(){

}





/// View List ///

const ls_data = JSON.parse(localStorage.getItem('resume_list'))

   document.getElementById("res_name").innerHTML= ls_data[indexParam].name;
  document.getElementById("res_role").innerHTML= ls_data[indexParam].role;
  document.getElementById("res_mob_Num").innerHTML= ls_data[indexParam].phoneno;
  document.getElementById("res_email").innerHTML= ls_data[indexParam].email;
  document.getElementById("res_linkedin").innerHTML= ls_data[indexParam].LinkedIn;
  document.getElementById("res_loc").innerHTML= ls_data[indexParam].location;
  document.getElementById("res_obj_para").innerHTML= ls_data[indexParam].objective;


  document.getElementById("father_name").innerHTML= ls_data[indexParam].personaldetails.fathername;
  document.getElementById("mother_name").innerHTML= ls_data[indexParam].personaldetails.mothername;
  


  for(let each in ls_data[indexParam].skills ){
    document.getElementById("tech_id_skills").innerHTML+=`<li>${ls_data[indexParam].skills[each]}</li>`
  }

  for(let each in ls_data[indexParam].personaldetails.languages_known ){
    document.getElementById("lang_id").innerHTML+=`<li>${ls_data[indexParam].personaldetails.languages_known[each]}</li>`
  }

  for(let each in ls_data[indexParam].projects){
   document.getElementById("projects_row").innerHTML+=
   `
   <div class="col-9 projects_name_div">
        <h4>${ls_data[indexParam].projects[each].projectName}</h4>
        <h5>${ls_data[indexParam].projects[each].project_Role}</h5>
        </div>
        <div class="col-3 text-end projects_detail_div">
            <h5>${ls_data[indexParam].projects[each].project_Url}</h5>
            <div class="d-flex justify-content-end"><h6>${ls_data[indexParam].projects[each].projectstartYear}</h6><h6>-<h6><h6>${ls_data[indexParam].projects[each].projectendYear}</h6></div>
        </div>
        <div class="col-11">
            <ul>
                <li>
                    ${ls_data[indexParam].projects[each].projectDescription}                     
                </li>
            </ul>
        </div>`
  }



  for(let each in ls_data[indexParam].workexperience){
    document.getElementById("workexperience_row").innerHTML+=
    `
    <div class="col-9 projects_name_div">
         <h4>${ls_data[indexParam].workexperience[each].work_Role}</h4>
         <h5>${ls_data[indexParam].workexperience[each].company_Name}</h5>
         </div>
         <div class="col-3 text-end projects_detail_div">
             <h5>${ls_data[indexParam].workexperience[each].company_Location}</h5>
             <div class="d-flex justify-content-end"><h6>${ls_data[indexParam].workexperience[each].work_start_period}</h6><h6>-<h6><h6>${ls_data[indexParam].projects[each].work_end_period}</h6></div>
         </div>
         <div class="col-11">
             <ul>
                 <li>
                     ${ls_data[indexParam].workexperience[each].experience_Desc}                     
                 </li>
             </ul>
         </div>`
   }

   for(let each in ls_data[indexParam].education){
    document.getElementById("education_id_row").innerHTML+=
    `
    <div class="col-9 projects_name_div">
         <h4>${ls_data[indexParam].education[each].education_name}</h4>
         <h5>${ls_data[indexParam].education[each].education_type}</h5>
         </div>
         <div class="col-3 text-end projects_detail_div">
             <div class="d-flex justify-content-end"><h6>${ls_data[indexParam].education[each].education_start_Period}</h6><h6>-<h6><h6>${ls_data[indexParam].education[each].education_end_Period}</h6></div>
             <h5> Percentage: ${ls_data[indexParam].education[each].education_Percentage}</h5>
         </div> `
   }
