// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  where
} from "https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBinviNRR7ySUiwo8NBjvPttpajLZeVITA",
  authDomain: "resume-builder-76e0c.firebaseapp.com",
  projectId: "resume-builder-76e0c",
  storageBucket: "resume-builder-76e0c.appspot.com",
  messagingSenderId: "94097688785",
  appId: "1:94097688785:web:33bdca71ccec84470cddf0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const bd = getFirestore(app);

async function registerbtn() {
  let regist_email = document.getElementById("reg_email").value;
  let regist_name = document.getElementById("reg_name").value;
  let regist_pass = document.getElementById("reg_password").value;
  let registerval = false;
  await getDocs(collection(bd, "register-data")).then((docufunc) => {
    docufunc.forEach((each) => {
      let data_extract = each.data();
      if (regist_email == data_extract.email) {
        registerval = true;
      }
    });
  });
  if(regist_email=="" || regist_name=="" || regist_pass==""){
    alert("Please fill all the fields");
  }else if (registerval == true) {
    alert("already Registered");
  } else if (registerval == false) {
    await addDoc(collection(bd, "register-data"), {
      email: regist_email,
      name: regist_name,
      password: regist_pass,
    });
    alert("Registered Sucessfully");
  }
}
window.registerbtn = registerbtn;



// for Login Button//
async function loginbutton() {
  let namevalue = document.getElementById("Login_Name").value;
  let passwordvalue = document.getElementById("Login_Password").value;
  let loginvalue = false;
  await getDocs(collection(bd, "register-data")).then((login) => {
    login.forEach((each) => {
      let resume = each.data();
      if (namevalue == resume.email && passwordvalue == resume.password) {
        loginvalue = true;
      }
    }); 
  });
  if (loginvalue == true) {
    alert(namevalue);
    // await addDoc(collection(bd,"admin-id"), {
    //   admin_id: namevalue});
  localStorage.setItem("admin_id",namevalue);
  localStorage.setItem("isLogged",'true');
    alert("Login success");
    window.location.href = "resumebuilder.html";
    
  
  } else {
    alert("Login failed");
  }
}
window.loginbutton = loginbutton;



let resume = {
  personaldetails: {
    languages_known: [],
  },
  contact: {},
  objective: {},
  skills: [],
  workexperience: [],
  education: [],
  projects: [],
};
let getuserdId= localStorage.getItem("admin_id");
resume.admin_id=getuserdId;

function viewlist() {
 getDocs(query(collection(bd,"resume-listing"),where('admin_id','==',getuserdId))).then((docResume) => {
  let displaylist = "";
    docResume.forEach((each) => {
      let resumeview = each.data();
      displaylist += `<tr>
    <td>${resumeview.name} </td>
     <td>${resumeview.email} </td>
    <td>${resumeview.phoneno} </td>
    <td><a href="view.html?index=${each.id}"><button>View</button> </a></td>
   <td> <button onclick="deletelisting('${each.id}')">Delete</button></td> </tr>`;
    });
    document.getElementById("whole_listing").innerHTML = displaylist;
  });
}

window.viewlist = viewlist;

function deletelisting(id) {
  deleteDoc(doc(bd, "resume-listing", id));
  viewlist();
}
window.deletelisting = deletelisting;

let adminIdget = localStorage.getItem("admin_id");


async function resumeadding() {
  await addDoc(collection(bd, "resume-listing"), resume);
  resume.admin_id =adminIdget;
  alert("Submitted Successfully");
  viewlist();
}
window.resumeadding = resumeadding;

// getDocs(query(collection(bd,"resume-listing"))).then (doc =>
//   {
//     let render=''
//   doc.forEach((each,i)=>{
//     let eachResume= each.data();
//    render.push(eachResume);

// })
// console.log(render);
// })

// function display(){
//   document.getElementById('preview').innerHTML = JSON.stringify(resume);
// }
function save(at, key, p_key) {
  if (p_key) {
    resume[p_key][key] = at.value;
  }
  // else if(arr_key){
  //   resume[arr_key].push(at.value);

  // resume[arr_key]=at.value;

  // }
  else {
    resume[key] = at.value;
  }

  // display();
}
window.save = save;

function add(p_key, sec_key, parent_personal_key) {
  if (parent_personal_key) {
    let addvalue = document.getElementById(sec_key);
    resume[p_key][parent_personal_key].push(addvalue.value);
    addvalue.value = "";
  } else {
    let addvalue = document.getElementById(sec_key);
    resume[p_key].push(addvalue.value);
    addvalue.value = "";
  }
  // display();
  addskills(p_key, parent_personal_key);
}

window.add = add;

function addskills(p_key, parent_personal_key) {
  if (parent_personal_key) {
    let listdata = "";
    for (let each in resume[p_key][parent_personal_key]) {
      listdata += `<li>${resume[p_key][parent_personal_key][each]}</li>
         <button onclick="deletedata('${each}','${p_key}','${parent_personal_key}')"> Delete </button>
        `;
    }
    document.getElementById("language_listing").innerHTML = listdata;
  } else {
    let listdata = "";
    for (let each in resume[p_key]) {
      listdata += `<li>${resume[p_key][each]}</li> 
        <button onclick="deletedata(${each},'${p_key}')"> Delete </button>`;
    }
    document.getElementById("Skill_listing").innerHTML = listdata;
  }
}

window.addskills = addskills;

function deletedata(data1, p_key, parent_personal_key) {
  let data = [];
  if (parent_personal_key) {
    for (let each in resume[p_key][parent_personal_key]) {
      if (each != data1) {
        data.push(resume[p_key][parent_personal_key][each]);
      }
      resume[p_key][parent_personal_key] = data;
      addskills(p_key, parent_personal_key);
    }
  } else {
    for (let each in resume[p_key]) {
      if (each != data1) {
        data.push(resume[p_key][each]);
      }
    }
    resume[p_key] = data;
    addskills(p_key);
  }
}
window.deletedata = deletedata;

function exp_add(
  displaytable,
  key,
  first_param,
  second_param,
  third_param,
  fourth_param,
  fivth_param,
  sixth_param
) {
  let firstparamvalue = document.getElementById(first_param);
  let secondparamvalue = document.getElementById(second_param);
  let thirdparamvalue = document.getElementById(third_param);
  let fourthparamvalue = document.getElementById(fourth_param);
  let fifthparamvalue = document.getElementById(fivth_param);
  let sixthparamvalue = document.getElementById(sixth_param);

  let details = {};

  if (sixth_param) {
    details[first_param] = firstparamvalue.value;
    details[second_param] = secondparamvalue.value;
    details[third_param] = thirdparamvalue.value;
    details[fourth_param] = fourthparamvalue.value;
    details[fivth_param] = fifthparamvalue.value;
    details[sixth_param] = sixthparamvalue.value;

    firstparamvalue.value = "";
    secondparamvalue.value = "";
    thirdparamvalue.value = "";
    fourthparamvalue.value = "";
    fifthparamvalue.value = "";
    sixthparamvalue.value = "";
    resume[key].push(details);
    // display();
  } else {
    details[first_param] = firstparamvalue.value;
    details[second_param] = secondparamvalue.value;
    details[third_param] = thirdparamvalue.value;
    details[fourth_param] = fourthparamvalue.value;
    details[fivth_param] = fifthparamvalue.value;

    firstparamvalue.value = "";
    secondparamvalue.value = "";
    thirdparamvalue.value = "";
    fourthparamvalue.value = "";
    fifthparamvalue.value = "";

    resume[key].push(details);
    //  display();
  }
  addobjectdatas(
    displaytable,
    key,
    first_param,
    second_param,
    third_param,
    fourth_param,
    fivth_param,
    sixth_param
  );
}
window.exp_add = exp_add;

function addobjectdatas(
  displaytable,
  key,
  first_param,
  second_param,
  third_param,
  fourth_param,
  fivth_param,
  sixth_param
) {
  if (sixth_param) {
    let listdata = "";
    for (let each in resume[key]) {
      listdata += ` <tr>
    <td>${resume[key][each][first_param]}</td>
    <td>${resume[key][each][second_param]}</td>
    <td>${resume[key][each][third_param]}</td>
     <td>${resume[key][each][fourth_param]}</td>
     <td>${resume[key][each][fivth_param]}</td>
     <td>${resume[key][each][sixth_param]}</td>
     <td> <button onclick="deleteobjdata('${displaytable}','${each}','${key}','${first_param}','${second_param}','${third_param}','${fourth_param}','${fivth_param}',${sixth_param})"> Delete </button></td>
      </tr>`;
    }
    document.getElementById(displaytable).innerHTML = listdata;
  } else {
    let listdata = "";
    for (let each in resume[key]) {
      listdata += ` <tr>
    <td>${resume[key][each][first_param]}</td>
    <td>${resume[key][each][second_param]}</td>
    <td>${resume[key][each][third_param]}</td>
     <td>${resume[key][each][fourth_param]}</td>
     <td>${resume[key][each][fivth_param]}</td>
     <td> <button onclick="deleteobjdata('${displaytable}','${each}','${key}','${first_param}','${second_param}','${third_param}','${fourth_param}','${fivth_param}',${sixth_param})"> Delete </button></td>
      </tr>`;
    }
    document.getElementById(displaytable).innerHTML = listdata;
  }
}
window.addobjectdatas = addobjectdatas;

function deleteobjdata(
  displaytable,
  data1,
  key,
  first,
  second,
  third,
  fourth,
  fifth
) {
  let data = [];
  for (let each in resume[key]) {
    if (each != data1) {
      data.push(resume[key][each]);
    }
  }

  resume[key] = data;

  addobjectdatas(displaytable, key, first, second, third, fourth, fifth);
}

window.deleteobjdata = deleteobjdata;

function logoutbutton() {
  localStorage.removeItem("isLogged");
}
window.logoutbutton=logoutbutton;



async function viewresume() {
  await getDocs(collection(bd, "resume-listing")).then((ls_dat) => {
    ls_dat.forEach((each) => {
      let ls_data = each.data();
      console.log(ls_data);
    });

    // ls_dat.forEach((each,id)=>{
    //   let ls_data=each.data();
    //   console.log(ls_data,[indexParam])
    //   document.getElementById("res_name").innerHTML= ls_data.name;
    // })
  });
}
window.viewresume = viewresume;

// document.getElementById("res_role").innerHTML= ls_data[indexParam].role;
// document.getElementById("res_mob_Num").innerHTML= ls_data[indexParam].phoneno;
// document.getElementById("res_email").innerHTML= ls_data[indexParam].email;
// document.getElementById("res_linkedin").innerHTML= ls_data[indexParam].LinkedIn;
// document.getElementById("res_loc").innerHTML= ls_data[indexParam].location;
// document.getElementById("res_obj_para").innerHTML= ls_data[indexParam].objective;

// document.getElementById("father_name").innerHTML= ls_data[indexParam].personaldetails.fathername;
// document.getElementById("mother_name").innerHTML= ls_data[indexParam].personaldetails.mothername;

// for(let each in ls_data[indexParam].skills ){
//   document.getElementById("tech_id_skills").innerHTML+=`<li>${ls_data[indexParam].skills[each]}</li>`
// }

// for(let each in ls_data[indexParam].personaldetails.languages_known ){
//   document.getElementById("lang_id").innerHTML+=`<li>${ls_data[indexParam].personaldetails.languages_known[each]}</li>`
// }

// for(let each in ls_data[indexParam].projects){
//  document.getElementById("projects_row").innerHTML+=
//  `
//  <div class="col-9 projects_name_div">
//       <h4>${ls_data[indexParam].projects[each].projectName}</h4>
//       <h5>${ls_data[indexParam].projects[each].project_Role}</h5>
//       </div>
//       <div class="col-3 text-end projects_detail_div">
//           <h5>${ls_data[indexParam].projects[each].project_Url}</h5>
//           <div class="d-flex justify-content-end"><h6>${ls_data[indexParam].projects[each].projectstartYear}</h6><h6>-<h6><h6>${ls_data[indexParam].projects[each].projectendYear}</h6></div>
//       </div>
//       <div class="col-11">
//           <ul>
//               <li>
//                   ${ls_data[indexParam].projects[each].projectDescription}
//               </li>
//           </ul>
//       </div>`
// }

// for(let each in ls_data[indexParam].workexperience){
//   document.getElementById("workexperience_row").innerHTML+=
//   `
//   <div class="col-9 projects_name_div">
//        <h4>${ls_data[indexParam].workexperience[each].work_Role}</h4>
//        <h5>${ls_data[indexParam].workexperience[each].company_Name}</h5>
//        </div>
//        <div class="col-3 text-end projects_detail_div">
//            <h5>${ls_data[indexParam].workexperience[each].company_Location}</h5>
//            <div class="d-flex justify-content-end"><h6>${ls_data[indexParam].workexperience[each].work_start_period}</h6><h6>-<h6><h6>${ls_data[indexParam].projects[each].work_end_period}</h6></div>
//        </div>
//        <div class="col-11">
//            <ul>
//                <li>
//                    ${ls_data[indexParam].workexperience[each].experience_Desc}
//                </li>
//            </ul>
//        </div>`
//  }

//  for(let each in ls_data[indexParam].education){
//   document.getElementById("education_id_row").innerHTML+=
//   `
//   <div class="col-9 projects_name_div">
//        <h4>${ls_data[indexParam].education[each].education_name}</h4>
//        <h5>${ls_data[indexParam].education[each].education_type}</h5>
//        </div>
//        <div class="col-3 text-end projects_detail_div">
//            <div class="d-flex justify-content-end"><h6>${ls_data[indexParam].education[each].education_start_Period}</h6><h6>-<h6><h6>${ls_data[indexParam].education[each].education_end_Period}</h6></div>
//            <h5> Percentage: ${ls_data[indexParam].education[each].education_Percentage}</h5>
//        </div> `
//  }
