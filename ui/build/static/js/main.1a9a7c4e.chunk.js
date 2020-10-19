(this["webpackJsonpchat-app"]=this["webpackJsonpchat-app"]||[]).push([[0],{134:function(e,t,a){e.exports=a(195)},139:function(e,t,a){},192:function(e,t){},195:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),o=a.n(c);a(139),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=a(10),i=a(62),u=a(21),s=a(252),m=a(240),p=a(236),d=a(248),h=a(238),E=a(250),f=a(113),b=a.n(f),g=a(46),v=a(231),j=a(234),O=a(108),y=a.n(O),C=a(27),w=a(109),S=a.n(w);function x(){var e=Object(l.i)(),t=Object(l.h)(),a=Object(l.g)(),r=Object(l.j)();return Object(n.useMemo)((function(){return{push:a.push,replace:a.replace,pathname:t.pathname,query:Object(C.a)(Object(C.a)({},S.a.parse(t.search,{ignoreQueryPrefix:!0})),e),match:r,location:t,history:a}}),[e,r,t,a])}var k=function(e,t){switch(t.type){case"AUTHENTICATE_SUCCESS":return Object(C.a)(Object(C.a)({},e),{},{authenticated:!0});case"AUTHENTICATE_FAIL":return Object(C.a)(Object(C.a)({},e),{},{authenticated:!1});case"USER":return Object(C.a)(Object(C.a)({},e),{},{user:t.payload});default:return e}},T=r.a.createContext(),A={authenticated:!1,user:{}};function I(e){var t=e.children,a=Object(n.useReducer)(k,A),c=Object(u.a)(a,2),o=c[0],l=c[1];return r.a.createElement(T.Provider,{value:{state:o,dispatch:l}},t)}var N,B=function(){var e=x(),t=Object(n.useContext)(T).dispatch;return{login:function(a,n){y.a.post("/users/authenticate",{username:a,password:n}).then((function(n){var r=n.data;r.authenticated&&(localStorage.setItem("user",a),t({type:"USER",payload:r.user}),e.push("/callback"))})).catch((function(e){return console.log(e)}))},handleAuth:function(){if(null!==localStorage.getItem("user")){var t=JSON.stringify(36e5+(new Date).getTime());localStorage.setItem("expiresAt",t),e.push("/authcheck")}else console.log("error")},isAuthenticated:function(){var e=JSON.parse(localStorage.getItem("expiresAt"));return null!=e&&(new Date).getTime()<e},logout:function(){localStorage.removeItem("user"),localStorage.removeItem("expiresAt"),e.push("/authcheck")}}},W=Object(v.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),P=function(){var e=W(),t=B(),a=Object(n.useState)(""),c=Object(u.a)(a,2),o=c[0],l=c[1],i=Object(n.useState)(""),f=Object(u.a)(i,2),v=f[0],O=f[1];return r.a.createElement(j.a,{component:"main",maxWidth:"xs"},r.a.createElement(p.a,null),r.a.createElement("div",{className:e.paper},r.a.createElement(s.a,{className:e.avatar},r.a.createElement(b.a,null)),r.a.createElement(g.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement("form",{className:e.form,noValidate:!0},r.a.createElement(d.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",autoComplete:"username",autoFocus:!0,value:o,onChange:function(e){return l(e.target.value)}}),r.a.createElement(d.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:v,onChange:function(e){return O(e.target.value)}}),r.a.createElement(h.a,{control:r.a.createElement(E.a,{value:"remember",color:"primary"}),label:"Remember me"}),r.a.createElement(m.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,onClick:function(e){t.login(o,v),e.preventDefault()}},"Sign In"))))},U=a(118),H=a(245),L=a(246),D=a(117),R=a.n(D),J=a(237),q=a(243),F=a(244),_=a(251),z=a(247),M=a(239),K=a(196),Q=a(241),V=a(242),$=a(114),G=a.n($),X=a(115),Y=a.n(X),Z=function(e){var t=e.listHeaderText,a=e.data,n=e.selectedChannel,c=e.onClick;return r.a.createElement(J.a,{component:"nav","aria-labelledby":"channel-List",subheader:r.a.createElement(Q.a,{component:"div",id:"nested-list-channels"},r.a.createElement(V.a,{container:!0,alignItems:"center",justify:"space-between"},r.a.createElement(V.a,{item:!0},r.a.createElement(g.a,null,t)),r.a.createElement(V.a,{item:!0},r.a.createElement(M.a,null,r.a.createElement(Y.a,{fontSize:"small"})))))},a.map((function(e,t){return r.a.createElement(q.a,{button:!0,key:t,selected:n===e,onClick:function(){return c(e)}},r.a.createElement(F.a,{primary:e}))})))},ee=a(116),te=a.n(ee),ae=Object(v.a)((function(){return{appBar:{width:"calc(100% - ".concat(300,"px)"),marginLeft:300}}})),ne=function(e){var t=e.room,a=ae(),n=B();return r.a.createElement(H.a,{position:"fixed",className:a.appBar},r.a.createElement(L.a,null,r.a.createElement(g.a,{align:"center",variant:"h6",noWrap:!0},t),r.a.createElement(M.a,{onClick:function(){return n.logout()}},r.a.createElement(te.a,null))))},re=Object(v.a)((function(e){return{root:{display:"flex"},appBarBottom:{top:"auto",bottom:0,width:"calc(100% - ".concat(300,"px)"),marginLeft:300},paper:{paddingBottom:50,width:"100%"},subheader:{backgroundColor:e.palette.background.paper},drawer:{width:300,flexShrink:0},drawerPaper:{width:300},toolbar:e.mixins.toolbar,input:{backgroundColor:e.palette.common.white},sendButton:{marginLeft:"auto",marginRight:"auto"}}})),ce=function(){var e=re(),t=Object(n.useState)(["Public"]),a=Object(u.a)(t,2),c=a[0],o=(a[1],Object(n.useState)(["Jone Doe"])),l=Object(u.a)(o,2),i=l[0],s=(l[1],Object(n.useState)("Public")),p=Object(u.a)(s,2),h=p[0],E=p[1],f=Object(n.useState)(""),b=Object(u.a)(f,2),g=b[0],v=b[1],j=Object(n.useState)([]),O=Object(u.a)(j,2),y=O[0],C=O[1],w=Object(n.useState)("Richard Chaidez"),S=Object(u.a)(w,2),x=S[0];S[1];N=G()("http://127.0.0.1:3001"),Object(n.useEffect)((function(){N.emit("join room",h),N.on("new message",(function(e){var t={primary:"Testing",secondary:e};C((function(e){return[].concat(Object(U.a)(e),[t])}))})),N.on("disconnect",(function(e){"io server disconnect"===e&&N.connect()}))}),[]);var k=function(){var e={room:h,message:g};N.emit("new message",e),v("")},T=function(e){N.emit("leave room",h),console.log(e),N.emit("join room",e),E(e)};return r.a.createElement("div",{className:e.root},r.a.createElement(ne,{room:h}),r.a.createElement(_.a,{className:e.drawer,variant:"permanent",classes:{paper:e.drawerPaper},anchor:"left"},r.a.createElement(m.a,null,"\xa0",x),r.a.createElement(z.a,null),r.a.createElement(Z,{listHeaderText:"Channels",data:c,selectedChannel:h,onClick:function(e){T(e)}}),r.a.createElement(z.a,null),r.a.createElement(Z,{listHeaderText:"Direct Messages",data:i,selectedChannel:h,onClick:function(e){T(e)}})),r.a.createElement(V.a,{container:!0},r.a.createElement(V.a,{item:!0,xs:12},r.a.createElement(K.a,{square:!0,elevation:0,className:e.paper},r.a.createElement(J.a,null,y.map((function(t,a){var n=t.primary,c=t.secondary;return r.a.createElement(r.a.Fragment,{key:a},0===a&&r.a.createElement(Q.a,{className:e.subheader},"Today"),r.a.createElement(q.a,{button:!0},r.a.createElement(F.a,{primary:n,secondary:c})))})))))),r.a.createElement(H.a,{position:"fixed",className:e.appBarBottom},r.a.createElement(L.a,null,r.a.createElement("div",{style:{width:"90%"}},r.a.createElement(d.a,{fullWidth:!0,id:"message",label:"Start typing",variant:"filled",classes:{root:e.input},value:g,onChange:function(e){v(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&k()}})),r.a.createElement(M.a,{"aria-label":"send-message",className:e.sendButton,onClick:k},r.a.createElement(R.a,{fontSize:"large"})))))};function oe(){return r.a.createElement(V.a,{container:!0,justify:"center",alignItems:"center"},r.a.createElement(g.a,{variant:"h4"},"Welcome to WebChat!"))}var le=function(){var e=Object(n.useContext)(T).dispatch,t=B(),a=x();return Object(n.useEffect)((function(){t.isAuthenticated()?(e({type:"AUTHENTICATE_SUCCESS"}),a.push("/chatroom")):(e({type:"AUTHENTICATE_FAIL"}),a.push("/login"))}),[t,e,a]),null},ie=function(){var e=B();return Object(n.useEffect)((function(){e.handleAuth()}),[e]),null},ue=Object(n.createContext)(),se=function(e){var t=e.children,a=e.user;return console.log(a),r.a.createElement(ue.Provider,{value:{testing:1}},t)},me=function(e){var t=e.component,a=e.auth,n=e.user;return r.a.createElement(l.b,{render:function(e){return!0===a?r.a.createElement(se,{user:n},r.a.createElement(t,Object.assign({auth:a},e))):r.a.createElement(l.a,{to:{pathname:"/authcheck"}})}})},pe=function(){var e=Object(n.useContext)(T);return console.log(e),r.a.createElement(i.a,null,r.a.createElement(i.b,{to:"/login"},r.a.createElement(m.a,null,"Login")),r.a.createElement(l.d,null,r.a.createElement(l.b,{exact:!0,path:"/",component:oe}),r.a.createElement(l.b,{path:"/login",component:P}),r.a.createElement(l.b,{path:"/authcheck",component:le}),r.a.createElement(me,{path:"/chatroom",auth:e.state.authenticated,user:e.state.user,component:ce}),r.a.createElement(l.b,{path:"/callback",component:ie})))};o.a.render(r.a.createElement(I,null,r.a.createElement(pe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[134,1,2]]]);
//# sourceMappingURL=main.1a9a7c4e.chunk.js.map