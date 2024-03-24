"use strict";(self.webpackChunkacademydev=self.webpackChunkacademydev||[]).push([[276],{528:(e,s,o)=>{o.d(s,{c:()=>c});var n=o(500),t=o(584),i=o(496);const c=function(e){let{message:s,position:o="absolute",fill:c=!1,onTop:a=!1}=e;return(0,i.jsx)("div",{className:"error-card ".concat(c&&"fill"," ").concat(a&&"on-top"),children:(0,i.jsxs)("div",{className:"error-card__wrapper",children:[(0,i.jsx)("div",{className:"icon",children:(0,i.jsx)(n.u,{icon:t.gxQ})}),s]})})}},276:(e,s,o)=>{o.r(s),o.d(s,{default:()=>h});var n=o(60),t=o(560),i=o(500),c=o(584),a=o(332),d=o(528),l=o(844),r=o(324),u=o(384),v=o(496);const h=function(){var e;const{courseId:s,orderNb:o}=(0,t.W4)(),{course:h,videos:p,instructors:m,setVideos:f,setCourse:j}=(0,l.a)(),[x,N]=(0,n.useState)(null),[b,g]=(0,n.useState)(o==="".concat(p.length)),[_,y]=(0,n.useState)("1"===o),[w,E]=(0,n.useState)(null!==(e=null===x||void 0===x?void 0:x.isDone)&&void 0!==e&&e),[I,S]=(0,n.useState)(!1),[k,C]=(0,n.useState)(""),D=(0,t.i6)(),{user:T}=(0,r.S)(),O=(0,u.A)();return(0,n.useEffect)((()=>{(async()=>{try{C(""),N(null);const e=await fetch("http://localhost:5050"+"/api/videos/details/".concat(s,"/").concat(o,"/").concat(null===T||void 0===T?void 0:T.uid),{method:"GET",headers:{"content-type":"application/json","x-access-token":O}}),n=await e.json();if(200!==e.status)throw Error(n.message);N(n[0])}catch(k){k instanceof Error?C(k.message):C("Error fetching data from server")}})()}),[s,o,T]),(0,n.useEffect)((()=>{y("1"===o),o==="".concat(p.length)?g(!0):g(!1)}),[o,p.length]),(0,n.useEffect)((()=>{var e;E(null!==(e=null===x||void 0===x?void 0:x.isDone)&&void 0!==e&&e)}),[x]),k?(0,v.jsx)("div",{className:"video",children:(0,v.jsx)(d.c,{message:k})}):(0,v.jsx)("div",{className:"video ".concat(null!==x&&void 0!==x&&x.isDone?"done":null),children:x?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{className:"video__heading",children:[(0,v.jsx)("h2",{children:x.title}),!!w&&(0,v.jsx)(i.u,{className:"video__heading__check",icon:c.MN5})]}),(0,v.jsx)("video",{controls:!0}),(0,v.jsxs)("div",{className:"video__instructor",children:["Instructor(s):"," ",m.map(((e,s)=>{let{instructorFullName:o}=e;return o+(s===m.length-1?"":", ")}))]}),(0,v.jsx)("div",{className:"video__description",children:x.description}),(0,v.jsxs)("div",{className:"video__nav",children:[T&&(0,v.jsx)("button",{className:"done-btn ".concat(w?"done":null),onClick:async()=>{if(!h)return;let e;if(S(!0),w){var n,t;const i=await fetch("http://localhost:5050/api/videos/finished",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({courseId:s,orderNb:o,userId:null!==(n=null===T||void 0===T?void 0:T.uid)&&void 0!==n?n:null})}),c=await i.json();if(200!==i.status)return C(c.message),void S(!1);e={...h,completed:(null!==(t=null===h||void 0===h?void 0:h.completed)&&void 0!==t?t:1)-1},E(!1)}else{var i,c;const n=await fetch("http://localhost:5050/api/videos/finished",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({courseId:s,orderNb:o,userId:null!==(i=null===T||void 0===T?void 0:T.uid)&&void 0!==i?i:null})}),t=await n.json();if(200!==n.status)return C(t.message),void S(!1);e={...h,completed:(null!==(c=null===h||void 0===h?void 0:h.completed)&&void 0!==c?c:-1)+1},E(!0)}const a=p.map((e=>e.courseId===s&&e.orderNb===parseInt(null!==o&&void 0!==o?o:"0")?{...e,isDone:!e.isDone}:e));j(e),f(a),S(!1)},disabled:I,children:"Done"}),(0,v.jsx)("button",{className:"prev-btn",onClick:()=>{y(!0);const e=parseInt(null!==o&&void 0!==o?o:"0")-1;D("/course/".concat(s,"/").concat(e))},disabled:_,children:"Prev"}),(0,v.jsx)("button",{className:"next-btn",onClick:()=>{g(!0);const e=parseInt(null!==o&&void 0!==o?o:"0")+1;D("/course/".concat(s,"/").concat(e))},disabled:b,children:"Next"})]})]}):(0,v.jsx)(a.c,{})})}}}]);
//# sourceMappingURL=276.98d7eff1.chunk.js.map