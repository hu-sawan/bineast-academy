"use strict";(self.webpackChunkacademydev=self.webpackChunkacademydev||[]).push([[32],{9032:(e,t,s)=>{s.r(t),s.d(t,{default:()=>S});var i=s(1560),n=s(9500),l=s(6584),o=s(2496);const r=e=>{let{title:t,subtitle:s}=e;return(0,o.jsxs)("div",{style:{marginBottom:"15px"},children:[(0,o.jsx)("h2",{style:{color:"var(--primary-text-color)",fontSize:"32px",fontWeight:"bold",marginBottom:"5px"},children:t}),(0,o.jsx)("h5",{style:{color:"var(--light-green-text-color)",fontWeight:"400",fontSize:"16px"},children:s})]})};var c=s(12);const a=function(e){let{to:t,value:s,subtitle:i,icon:n}=e;return(0,o.jsx)(c.cH,{style:{width:"100%",margin:"0px 30px",height:"100%",display:"flex",justifyContent:"center",flexDirection:"column"},to:"/".concat(t),children:(0,o.jsxs)("div",{className:"stat-box",children:[(0,o.jsxs)("div",{className:"stat-box__header",children:[n,(0,o.jsx)("h4",{style:{color:"var(--primary-text-color)"},children:s})]}),(0,o.jsx)("div",{className:"stat-box__details",children:(0,o.jsx)("h5",{children:i})})]})})};const d=function(){return(0,o.jsxs)("div",{className:"dashboard-overview",children:[(0,o.jsx)(r,{title:"Overview",subtitle:"Welcome to my dashboard"}),(0,o.jsxs)("div",{className:"dashboard-overview__content",children:[(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 3"},children:(0,o.jsx)(a,{to:"users",value:"100",subtitle:"Active Users",icon:(0,o.jsx)(n.u,{className:"icon",icon:l.OOk})})}),(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 3"},children:(0,o.jsx)(a,{to:"",value:"20$",subtitle:"Monthly income",icon:(0,o.jsx)(n.u,{className:"icon",icon:l.qEJ})})}),(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 3"},children:(0,o.jsx)(a,{to:"",value:"5",subtitle:"New Subscription",icon:(0,o.jsx)(n.u,{className:"icon",icon:l.y0l})})}),(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 3"},children:(0,o.jsx)(a,{to:"",value:"23",subtitle:"New Users",icon:(0,o.jsx)(n.u,{className:"icon",icon:l.Ybe})})}),(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 8",gridRow:"span 2"},children:(0,o.jsx)("h3",{children:"Card 5"})}),(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 4",gridRow:"span 2"},children:(0,o.jsx)("h3",{children:"Card 6"})}),(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 3"},children:(0,o.jsx)("h3",{children:"Card 7"})}),(0,o.jsx)("div",{className:"content__card",style:{gridColumn:"span 3"},children:(0,o.jsx)("h3",{children:"Card 8"})})]})]})};var x=s(9060),h=s(1772),u=s(3596),m=s(1324);const j=function(e){let{text:t}=e;const s=t.split(" "),i=s.length<2?"".concat(s[0][0]):"".concat(s[0][0]+s[1][0]),n="#"+Math.floor(16777215*Math.random()).toString(16);return(0,o.jsx)("div",{className:"generated-image__wrapper",style:{backgroundColor:n||"#00ff55"},children:i})},p=(0,x.memo)((e=>{let{user:t}=e;return(0,o.jsx)("div",{style:{width:"35px",height:"35px",cursor:"pointer",borderRadius:"50%",overflow:"hidden",color:"white"},children:t&&t.photoURL?(0,o.jsx)("img",{src:t.photoURL,style:{display:"block",width:"100%",height:"100%",objectFit:"contain"},alt:"profile-user"}):(0,o.jsx)(j,{text:t&&t.displayName?t.displayName:"Uknown User"})})})),y=e=>{let{title:t,to:s,icon:i,selected:n,setSelected:l}=e;return(0,o.jsx)(h.IP,{component:(0,o.jsx)(c.cH,{to:"/".concat(s)}),active:n===s,style:{color:"var(--primary-text-color)",borderRadius:"10px",fontSize:"14px",fontWeight:"500"},onClick:()=>l(s),icon:i,children:(0,o.jsx)("p",{children:t})})},v=()=>{const{theme:e}=(0,u.q)(),[t,s]=(0,x.useState)(!0),i=window.location.pathname.split("/").pop(),[r,c]=(0,x.useState)("dashboard"===i?"":null!==i&&void 0!==i?i:""),{user:a}=(0,m.S)(),d=[{subtitle:"",items:[{title:"Dashboard",to:"",icon:(0,o.jsx)(n.u,{icon:l.e2O}),selected:r,setSelected:c}]},{subtitle:"Data",items:[{title:"Manage Users",to:"users",icon:(0,o.jsx)(n.u,{icon:l.eK7}),selected:r,setSelected:c},{title:"Contacts",to:"contacts",icon:(0,o.jsx)(n.u,{icon:l.ukP}),selected:r,setSelected:c},{title:"Invoices",to:"invoices",icon:(0,o.jsx)(n.u,{icon:l.CSy}),selected:r,setSelected:c}]},{subtitle:"Pages",items:[{title:"Add User",to:"addUser",icon:(0,o.jsx)(n.u,{icon:l.Ybe}),selected:r,setSelected:c},{title:"Add Products",to:"addProducts",icon:(0,o.jsx)(n.u,{icon:l.qsE}),selected:r,setSelected:c},{title:"FAQ Page",to:"faq",icon:(0,o.jsx)(n.u,{icon:l.o7x}),selected:r,setSelected:c}]}];return(0,o.jsx)("div",{className:"sidebar",children:(0,o.jsx)(h.M3,{collapsed:!t,style:{backgroundColor:"var(--primary-background-color) !important"},children:(0,o.jsxs)(h.iS,{children:[(0,o.jsx)(h.IP,{className:"sidebar__menu-header",icon:t?void 0:(0,o.jsx)("button",{className:"sidebar__menu-button",onClick:()=>s(!t),children:(0,o.jsx)(n.u,{icon:l.mIU})}),style:{margin:"10px 0 20px 0"},children:t&&(0,o.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginLeft:"15px"},children:[(0,o.jsx)("h3",{style:{fontSize:"24px",fontWeight:"400"},children:"BINEAST"}),(0,o.jsx)("button",{className:"sidebar__menu-button",onClick:()=>s(!t),children:(0,o.jsx)(n.u,{icon:l.mIU})})]})}),(0,o.jsxs)("div",{style:{display:"".concat(t?"flex":"none"),textAlign:"center",padding:"10% 0 10% 10%",borderTop:"1px solid var(--secondary-text-color)",borderBottom:"1px solid var(--secondary-text-color)",alignItems:"center"},children:[(0,o.jsx)(p,{user:a}),(0,o.jsxs)("div",{style:{textAlign:"center",flex:"1"},children:[(0,o.jsx)("h5",{style:{color:"var(--primary-text-color)",fontWeight:"700",fontSize:"16px",marginTop:"4px"},children:a?a.displayName:"Unknown User"}),(0,o.jsx)("h6",{style:{color:"var(--light-green-text-color)",fontWeight:"500",fontSize:"14px",textTransform:"capitalize"},children:a?a.role:"user"})]})]}),(0,o.jsx)("div",{className:"sidebar-items ".concat(e),style:{padding:t?"10%":void 0},children:d.map(((e,t)=>(0,o.jsxs)("span",{children:[e.subtitle&&(0,o.jsx)("h6",{className:"sidebar-items__subtitle",children:e.subtitle}),e.items.map(((e,t)=>(0,o.jsx)(y,{title:e.title,to:e.to,icon:e.icon,selected:r,setSelected:c},t)))]},t)))})]})})})};var g=s(9712);const b=()=>{const{theme:e,toggleTheme:t}=(0,u.q)();return(0,o.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"15px"},className:"topbar",children:[(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",borderRadius:"6px",backgroundColor:"var(--secondary-background-color)"},children:[(0,o.jsx)("div",{style:{marginLeft:"16px",flex:1},children:(0,o.jsx)("input",{className:"topbar__search-input",type:"text",placeholder:"Search"})}),(0,o.jsx)("button",{style:{padding:1},children:(0,o.jsx)(n.u,{icon:l.w1r})})]}),(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,o.jsx)("button",{onClick:()=>t(),children:"light"===e?(0,o.jsx)(n.u,{icon:g.OLY}):(0,o.jsx)(n.u,{icon:g.c1X})}),(0,o.jsx)("button",{children:(0,o.jsx)(n.u,{icon:g.Yrq})}),(0,o.jsx)("button",{children:(0,o.jsx)(n.u,{icon:l.EZ})}),(0,o.jsx)("button",{children:(0,o.jsx)(n.u,{icon:g.OOk})})]})]})};var f=s(4810),N=s(1384);const _=e=>{let{userId:t,role:s}=e;const[i,r]=(0,x.useState)(s),[c,a]=(0,x.useState)(s),[d,h]=(0,x.useState)(!1),u=(0,N.A)(),m={ADMIN:(0,o.jsx)(n.u,{style:{fontSize:"11px"},icon:l._2h}),INSTRUCTOR:(0,o.jsx)(n.u,{style:{fontSize:"11px"},icon:l.OYs}),USER:(0,o.jsx)(n.u,{style:{fontSize:"11px"},icon:l.OOk})},j=()=>{(async()=>{try{(await fetch("http://localhost:5050/api/users/"+t,{method:"PATCH",headers:{"content-type":"application/json","x-access-token":u},body:JSON.stringify({role:c})})).ok?(r(c),h(!1)):a(i)}catch(e){}})()},p=()=>{a(i),h(!1)};return d?(0,o.jsxs)("div",{className:"users-table__confirm__role",children:[(0,o.jsx)("span",{className:"is-easy hover",onClick:j,children:"Update"}),(0,o.jsx)("span",{className:"is-hard hover",onClick:p,children:"Cancel"})]}):(0,o.jsxs)("div",{style:{width:"60%",margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center"},children:[(0,o.jsx)("span",{className:"icon",children:m[s]}),(0,o.jsx)("select",{className:"users-table__role",value:c,onChange:e=>(e=>{a(e),h(!0)})(e.target.value),children:Object.keys(m).map((e=>(0,o.jsx)("option",{value:e,children:e},e)))})]})},C=()=>{const[e,t]=(0,x.useState)([]),s=(0,N.A)();(0,x.useEffect)((()=>{(async()=>{try{const e=await fetch("http://localhost:5050/api/users",{method:"GET",headers:{"content-type":"application/json","x-access-token":s}}),i=await e.json();t(i)}catch(e){}})()}),[s]);const i=[{field:"id",headerName:"ID"},{field:"email",headerName:"Email",flex:1},{field:"role",headerName:"Role",flex:1,headerAlign:"center",align:"center",renderCell:e=>{let{row:{role:t,id:s}}=e;return(0,o.jsx)(_,{userId:s,role:t})}},{field:"isPremium",headerName:"Premium",flex:1,renderCell:e=>{let{row:{isPremium:t}}=e;return(0,o.jsx)("div",{children:(0,o.jsx)(n.u,{style:{color:t?"#3fb24b":"grey"},icon:l.MN5})})}}];return(0,o.jsxs)("div",{className:"dashboard-users",children:[(0,o.jsx)(r,{title:"Users",subtitle:"In this page you can manage users"}),(0,o.jsx)("div",{className:"users-table",children:(0,o.jsx)(f.o,{sx:{"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within":{outline:"none !important"},"& .MuiDataGrid-filler":{height:"1px !important"},"& .MuiDataGrid-overlayWrapper":{height:"55px !important"}},rows:e,columns:i,slots:{noRowsOverlay:()=>(0,o.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"var(--primary-text-color)"},children:"No users found"})}})})]})};const S=function(){const{user:e}=(0,m.S)();return(0,o.jsxs)("div",{className:"dashboard",children:[(0,o.jsx)(v,{}),(0,o.jsxs)("main",{className:"content",children:[(0,o.jsx)(b,{}),(0,o.jsx)("div",{className:"dashboard-section",children:(0,o.jsxs)(i.c5,{children:[(0,o.jsx)(i.kX,{path:"/",element:(0,o.jsx)(d,{})}),(0,o.jsx)(i.kX,{path:"/users",element:(0,o.jsx)(C,{})})]})})]})]})}}}]);
//# sourceMappingURL=32.f2c5b44a.chunk.js.map