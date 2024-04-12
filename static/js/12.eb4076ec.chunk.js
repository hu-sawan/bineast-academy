"use strict";(self.webpackChunkacademydev=self.webpackChunkacademydev||[]).push([[12,528],{6992:(e,s,t)=>{t.d(s,{c:()=>a});var i=t(2496);const a=e=>{let{title:s,subtitle:t}=e;return(0,i.jsxs)("div",{style:{marginBottom:"15px"},children:[(0,i.jsx)("h2",{style:{color:"var(--primary-text-color)",fontSize:"32px",fontWeight:"bold",marginBottom:"5px"},children:s}),(0,i.jsx)("h5",{style:{color:"var(--light-green-text-color)",fontWeight:"400",fontSize:"16px"},children:t})]})}},3528:(e,s,t)=>{t.r(s),t.d(s,{default:()=>n});var i=t(9500),a=t(6584),r=t(2496);const n=function(e){let{message:s,position:t="absolute",fill:n=!1,onTop:l=!1}=e;return(0,r.jsx)("div",{className:"error-card ".concat(n&&"fill"," ").concat(l&&"on-top"),children:(0,r.jsxs)("div",{className:"error-card__wrapper",children:[(0,r.jsx)("div",{className:"icon",children:(0,r.jsx)(i.u,{icon:a.gxQ})}),s]})})}},7392:(e,s,t)=>{t.r(s),t.d(s,{default:()=>_});var i=t(9060),a=t(6992),r=t(1384),n=t(5332),l=t(9500),c=t(6584),o=t(3596),d=t(2622),u=t(4568),h=t(2496);const p=function(e){let{displayText:s,setFile:t}=e;const a=(0,i.useRef)(null);return(0,h.jsxs)("div",{className:"input-wrapper contain-file",children:[(0,h.jsxs)("label",{htmlFor:"file-input",children:[(0,h.jsx)(l.u,{icon:c.iMq}),(0,h.jsx)("span",{children:s})]}),(0,h.jsx)("input",{className:"file-input",id:"file-input",type:"file",accept:".png, .jpeg, .jpg",onChange:e=>{a.current.innerText=e.target.files[0].name,t(e.target.files[0])}}),(0,h.jsx)("div",{ref:a,className:"message"})]})};const m=u.kt().shape({title:u.Qb().max(65,"Title length must not exceed 65 characters").required("Course Title cannot be empty"),description:u.Qb().required("Required")}),x=function(e){let{course:s,setIsEditing:t,setRefresh:a,isAdding:n=!1}=e;const[u,x]=(0,i.useState)(null),{theme:j}=(0,o.q)(),v=(0,r.A)(),g={...s,level:s.level.toLowerCase(),price:s.isPremium?"premium":"free"};return(0,h.jsx)("div",{className:"edit-course ".concat(j),children:(0,h.jsxs)("div",{className:"edit-course__wrapper",children:[(0,h.jsx)("span",{"data-tooltip":"Cancel",className:"tooltip bottom cancel",onClick:()=>t(!1),children:(0,h.jsx)(l.u,{style:{display:"block"},icon:c.gxQ})}),(0,h.jsx)(d.QJ,{initialValues:g,onSubmit:e=>{var i;const r=new FormData;return r.append("title",e.title),r.append("description",e.description),r.append("level",e.level),r.append("isPremium","premium"===e.price?"true":"false"),r.append("thumbnail",null!==u&&void 0!==u?u:""),r.append("tags",null!==(i=e.tags)&&void 0!==i?i:""),new Promise(n?(e,s)=>{fetch("http://localhost:5050/api/courses/add",{method:"POST",headers:{"x-access-token":v},body:r}).then((i=>{i.ok?(t(!1),e(),setTimeout((()=>{a((e=>!e))}),1e3)):s(new Error(i.statusText))})).catch((e=>{e instanceof Error&&(console.log(e.message),s(e.message)),s("Something wrong happened while editing course")}))}:(e,i)=>{fetch("http://localhost:5050/api/courses/"+s.id,{method:"PATCH",headers:{"x-access-token":v},body:r}).then((s=>{s.ok?(t(!1),e(),setTimeout((()=>{a((e=>!e))}),1e3)):i(new Error(s.statusText))})).catch((e=>{e instanceof Error&&i(e.message),i("Something wrong happened while editing course")}))})},validationSchema:m,children:e=>{let{isSubmitting:t,values:i,errors:a,isValid:r,handleBlur:l,handleChange:c,handleSubmit:o}=e;return(0,h.jsxs)(d.QF,{className:"dashboard-form",onSubmit:o,children:[(0,h.jsxs)("div",{"data-error":a.title?a.title:"",className:"input-wrapper ".concat(a.title?"error":""),children:[(0,h.jsx)("label",{htmlFor:"title",children:"Course Title:"}),(0,h.jsx)(d.IN,{onChange:c,onBlur:l,className:a.title?"error":"",name:"title",type:"text",placeholder:"Course Title"})]}),(0,h.jsxs)("div",{className:"input-wrapper ".concat(a.description?"error":""),"data-error":a.description?a.description:"",children:[(0,h.jsx)("label",{htmlFor:"description",children:"Course Description:"}),(0,h.jsx)(d.IN,{onChange:c,onBlur:l,className:a.description?"error":"",name:"description",type:"text",placeholder:"Course Description"})]}),(0,h.jsxs)("div",{className:"input-wrapper",children:[(0,h.jsxs)("label",{htmlFor:"tags",children:["Tags:"," ",(0,h.jsx)("span",{className:"addition",children:"(separated by ' , ')"})]}),(0,h.jsx)(d.IN,{onChange:c,onBlur:l,name:"tags",type:"text"})]}),(0,h.jsxs)("div",{className:"three-inputs",children:[(0,h.jsxs)("div",{className:"input-wrapper",children:[(0,h.jsx)("label",{htmlFor:"level",children:"Level:"}),(0,h.jsxs)(d.IN,{name:"level",as:"select",children:[(0,h.jsx)("option",{value:"beginner",children:"Beginner"}),(0,h.jsx)("option",{value:"advanced",children:"Advanced"}),(0,h.jsx)("option",{value:"intermediate",children:"Intermediate"})]})]}),(0,h.jsxs)("div",{className:"input-wrapper",children:[(0,h.jsx)("label",{htmlFor:"price",children:"Price"}),(0,h.jsxs)(d.IN,{name:"price",as:"select",children:[(0,h.jsx)("option",{value:"free",children:"Free"}),(0,h.jsx)("option",{value:"premium",children:"Premium"})]})]}),(0,h.jsxs)("div",{className:"input-wrapper",children:[(0,h.jsx)("label",{htmlFor:"visibility",children:"Visibility:"}),(0,h.jsxs)(d.IN,{name:"visibility",as:"select",children:[(0,h.jsx)("option",{value:"public",children:"Public"}),(0,h.jsx)("option",{value:"private",children:"Private"})]})]}),(0,h.jsxs)("div",{className:"input-wrapper",children:[(0,h.jsx)("label",{htmlFor:"durationInMinutes",children:"Duration In Minutes:"}),(0,h.jsx)(d.IN,{onChange:c,onBlur:l,name:"durationInMinutes",type:"text",disabled:!0})]})]}),(0,h.jsx)(p,{displayText:"choose new thumbnail",setFile:x}),(0,h.jsx)("div",{className:"dashboard-form__save",children:(0,h.jsx)("button",{type:"submit",disabled:!r||t||JSON.stringify({...s,price:s.isPremium?"premium":"free"})===JSON.stringify(i),children:n?"Add":"Update"})})]})}})]})})};var j=t(1560),v=t(12);const g=(0,i.lazy)((()=>t.e(600).then(t.bind(t,4600))));const f=function(e){let{course:s,setRefresh:t}=e;const[a,n]=(0,i.useState)(!1),[o,d]=(0,i.useState)(!1),[u,p]=(0,i.useState)(!1),m=(0,j.IT)().pathname,{id:f,imgUrl:N,title:b,description:_,durationInMinutes:y,level:w,isPremium:C}=s,S=(0,r.A)();return(0,i.useEffect)((()=>{o&&(async()=>{try{(await fetch("http://localhost:5050"+"/api/courses/".concat(f),{method:"DELETE",headers:{"content-type":"application/json","x-access-token":S}})).ok&&(t((e=>!e)),d(!1))}catch(e){console.log(e)}})()}),[o,S,f,t]),(0,h.jsxs)("div",{className:"course-display",children:[a&&(0,h.jsx)(g,{setIsConfirm:n,setIsDelete:d,setRefresh:t}),u&&(0,h.jsx)(x,{course:s,setIsEditing:p,setRefresh:t}),(0,h.jsxs)(v.cH,{to:"".concat(m,"/").concat(s.id),className:"course-display__link",children:[(0,h.jsx)("div",{className:"course-display__img",children:(0,h.jsx)("img",{src:N,alt:b})}),(0,h.jsxs)("div",{className:"course-display__content",children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("h1",{children:b}),(0,h.jsx)("p",{children:_})]}),(0,h.jsxs)("div",{className:"course-display__content__details",children:[(0,h.jsxs)("div",{className:"course-display__content__details__duration",children:["Duration: ",y," minutes"]}),(0,h.jsxs)("div",{className:"course-display__content__details__level",children:["Level: ",w]}),(0,h.jsx)("div",{className:"course-display__content__details__is-premium",children:C?"Premium":"Free"})]})]})]}),(0,h.jsxs)("div",{className:"course-display__control",children:[(0,h.jsx)("span",{className:"edit",onClick:()=>p(!0),children:(0,h.jsx)(l.u,{icon:c.cpv})}),(0,h.jsx)("span",{className:"delete",onClick:()=>n(!0),children:(0,h.jsx)(l.u,{icon:c._8k})})]})]})};var N=t(3528),b=t(1324);const _=function(){const[e,s]=(0,i.useState)([]),[t,o]=(0,i.useState)(!1),[d,u]=(0,i.useState)(""),[p,m]=(0,i.useState)(!1),[j,v]=(0,i.useState)(!1),{user:g}=(0,b.S)(),_=(0,r.A)();return(0,i.useEffect)((()=>{(async()=>{try{u(""),o(!0);const e=await fetch("http://localhost:5050/api/courses",{method:"GET",headers:{"content-type":"application/json","x-access-token":_}}),t=await e.json();if(200!==e.status)throw new Error(t.message);s(t),o(!1),0===t.length&&u("No courses available")}catch(e){o(!1),e instanceof Error?u(e.message):u("Error fetching data from server")}})()}),[p,_]),(0,h.jsxs)("div",{className:"dashboard-courses",children:[(0,h.jsxs)("div",{className:"dashboard-courses__header",children:[(0,h.jsx)(a.c,{title:"Courses",subtitle:"In this page you can manage courses"}),(0,h.jsxs)("div",{className:"dashboard-courses__add",onClick:()=>v(!0),children:[(0,h.jsx)(l.u,{icon:c.qsE}),"Add Course"]})]}),(0,h.jsxs)("div",{className:"courses",children:[j&&(0,h.jsx)(x,{setIsEditing:v,course:{title:"",description:"",id:"",durationInMinutes:0,isPremium:!1,imgUrl:"",level:"beginner",tags:""},setRefresh:m,isAdding:!0}),t||d?(0,h.jsx)("div",{className:"dashboard-courses__status",children:t?(0,h.jsx)(n.default,{}):(0,h.jsx)(N.default,{message:d})}):e.map((e=>(0,h.jsx)(f,{setRefresh:m,course:e},e.id)))]})]})}}}]);
//# sourceMappingURL=12.eb4076ec.chunk.js.map