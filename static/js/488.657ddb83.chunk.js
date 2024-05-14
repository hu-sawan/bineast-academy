"use strict";(self.webpackChunkacademydev=self.webpackChunkacademydev||[]).push([[488],{6992:(e,a,r)=>{r.d(a,{c:()=>t});var s=r(2496);const t=e=>{let{title:a,subtitle:r}=e;return(0,s.jsxs)("div",{style:{marginBottom:"15px"},children:[(0,s.jsx)("h2",{style:{color:"var(--primary-text-color)",fontSize:"32px",fontWeight:"bold",marginBottom:"5px"},children:a}),(0,s.jsx)("h5",{style:{color:"var(--light-green-text-color)",fontWeight:"400",fontSize:"16px"},children:r})]})}},1488:(e,a,r)=>{r.r(a),r.d(a,{default:()=>d});var s=r(6992),t=r(2622),l=r(4568),i=r(1384),n=r(9060),m=r(2496);const o=l.kt().shape({firstName:l.Qb().required("First Name is required"),lastName:l.Qb().required("Last Name is required"),email:l.Qb().email("Invalid email").required("Email is required"),phoneNumber:l.Qb().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,"Phone number is not valid")}),d=function(){const[e,a]=(0,n.useState)(""),r=(0,i.A)();return(0,m.jsxs)("div",{className:"dashboard-addUser",children:[(0,m.jsx)(s.c,{title:"Add User",subtitle:"Add a new user to the system"}),(0,m.jsx)(t.QJ,{initialValues:{firstName:"",lastName:"",email:"",phoneNumber:""},onSubmit:(e,s)=>{let{resetForm:t}=s;return new Promise(((s,l)=>{a("");const{firstName:i,lastName:n,email:m,phoneNumber:o}=e,d=i+" "+n;fetch("http://localhost:5050/api/users/add",{method:"POST",headers:{"Content-Type":"application/json","x-access-token":r},body:JSON.stringify({fullName:d,email:m,phoneNumber:o})}).then((async e=>{if(!e.ok){const a=await e.json();throw new Error(a.message)}s(),t()})).catch((e=>{e instanceof Error?a(e.message):a("Something wrong happened, please try again"),l()}))}))},validationSchema:o,validateOnMount:!0,children:a=>{let{isSubmitting:r,errors:s,isValid:l,touched:i,handleBlur:n,handleChange:o,handleSubmit:d}=a;return(0,m.jsxs)(t.QF,{className:"dashboard-form",onSubmit:d,children:[e&&(0,m.jsx)("div",{className:"dashboard-form__error",children:e}),(0,m.jsxs)("div",{className:"dashboard-form__user-form",children:[(0,m.jsxs)("div",{className:"two-inputs",children:[(0,m.jsxs)("div",{"data-error":i.firstName&&s.firstName?s.firstName:"",className:"input-wrapper ".concat(i.firstName&&s.firstName?"error":""),children:[(0,m.jsx)("label",{htmlFor:"firstName",children:"First Name:"}),(0,m.jsx)(t.IN,{onChange:o,onBlur:n,className:i.firstName&&s.firstName?"error":"",name:"firstName",type:"text",placeholder:"First Name"})]}),(0,m.jsxs)("div",{"data-error":i.lastName&&s.lastName?s.lastName:"",className:"input-wrapper ".concat(i.lastName&&s.lastName?"error":""),children:[(0,m.jsx)("label",{htmlFor:"lastName",children:"Last Name:"}),(0,m.jsx)(t.IN,{onChange:o,onBlur:n,className:i.lastName&&s.lastName?"error":"",name:"lastName",type:"text",placeholder:"Last Name"})]})]}),(0,m.jsxs)("div",{"data-error":i.email&&s.email?s.email:"",className:"input-wrapper ".concat(i.email&&s.email?"error":""),children:[(0,m.jsx)("label",{htmlFor:"email",children:"Email:"}),(0,m.jsx)(t.IN,{onChange:o,onBlur:n,className:i.email&&s.email?"error":"",name:"email",type:"text",placeholder:"Email"})]}),(0,m.jsxs)("div",{"data-error":i.phoneNumber&&s.phoneNumber?s.phoneNumber:"",className:"input-wrapper ".concat(i.phoneNumber&&s.phoneNumber?"error":""),children:[(0,m.jsx)("label",{htmlFor:"phoneNumber",children:"Phone Number:"}),(0,m.jsx)(t.IN,{onChange:o,onBlur:n,className:i.phoneNumber&&s.phoneNumber?"error":"",name:"phoneNumber",type:"text",placeholder:"Phone Number"})]}),(0,m.jsx)("div",{className:"dashboard-form__save",children:(0,m.jsx)("button",{type:"submit",disabled:0!==Object.keys(s).length||!l||r,children:"Add User"})})]})]})}})]})}}}]);
//# sourceMappingURL=488.657ddb83.chunk.js.map