(this.webpackJsonpcanptnhook=this.webpackJsonpcanptnhook||[]).push([[0],{77:function(e,t,a){e.exports=a(92)},83:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(33),c=a.n(l),o=(a(83),a(17)),u=a(18),s=a(31),i=a(30),m=a(7),E=a(99),d=a(3),p=Object(n.createContext)(),h=function(){return Object(n.useContext)(p)},f=function(e){var t=e.children,a=Object(n.useState)(null),l=Object(m.a)(a,2),c=l[0],o=l[1],u=Object(d.m)();return Object(n.useEffect)((function(){var e=new URLSearchParams(window.location.search).get("bucket_id"),t=e;e||(t=Object(E.a)(),u({pathname:"/",search:"?bucket_id="+t})),o({id:t})}),[]),r.a.createElement(p.Provider,{value:c},t)},b=a(5),v=a.n(b),y=a(14),g=a(96),k=a(65),w=a(97),O=a(98),j=a(36),C=a(62),x=a(21),N=a(35),_=a(64),I=a.n(_),S=function(e){var t=e.selectedWebhook;if(!t)return r.a.createElement("div",null,"Please select a webhook to see details");var a=t.body;try{var n=JSON.parse(t.body);a=r.a.createElement(I.a,{src:n,name:null,displayDataTypes:!1})}catch(l){}return r.a.createElement("div",null,r.a.createElement("h1",null,"Webhook Details"),r.a.createElement("ul",null,r.a.createElement("li",{key:t.id},r.a.createElement("strong",null,"ID:")," ",t.id,r.a.createElement("br",null),r.a.createElement("strong",null,"Timestamp:")," ",t.timestamp,r.a.createElement("br",null),r.a.createElement("strong",null,"URL:")," ",t.url,r.a.createElement("br",null),r.a.createElement("strong",null,"Method:")," ",t.method,r.a.createElement("br",null),r.a.createElement("strong",null,"Headers:"),r.a.createElement("ul",null,t.headers.map((function(e,t){return r.a.createElement("li",{key:t},e)}))),r.a.createElement("hr",null),r.a.createElement("strong",null,"Body:"),a,r.a.createElement("br",null),r.a.createElement("hr",null))))},W=function(){var e=Object(n.useState)([]),t=Object(m.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(null),o=Object(m.a)(c,2),u=o[0],s=o[1],i=Object(n.useState)(""),E=Object(m.a)(i,2),d=E[0],p=E[1],f=function(){var e=Object(y.a)(v.a.mark((function e(t){var a,n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("/api/"+t+"/check");case 2:a=e.sent,n=a.data,console.log(n),n&&(n=n.sort((function(e,t){return e.id<t.id?1:-1}))),l(n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(y.a)(v.a.mark((function e(t,a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O.a.post("/api/"+t+"/delete/"+a.id).then((function(e){f(t)}));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),_=function(){var e=Object(y.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O.a.post("/api/"+t+"/delete").then((function(e){f(t),s(null)}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=h(),W="";I&&(W=I.id);var D="";if(a&&a.length){var L={};a.map((function(e){L[e.id]=[];var t=null;try{t=JSON.parse(e.body)}catch(a){}d.split(",").map((function(a){t&&t[a]&&L[e.id].push({k:a,v:t[a]})}))})),console.log(L),D=r.a.createElement("ul",null,a.map((function(e){return r.a.createElement("li",{key:e.id,onClick:function(){return s(e)},style:{cursor:"pointer"}},r.a.createElement(g.a,null,r.a.createElement(k.a,{className:"col-10"},r.a.createElement("strong",null,"ID:")," ",e.id,r.a.createElement("br",null),r.a.createElement("strong",null,"Timestamp:"),r.a.createElement(C.a,{dateFormat:"DMY",dateSeparator:"/",timeSeparator:":"},e.timestamp),r.a.createElement("br",null),r.a.createElement("strong",null,"Method:")," ",e.method,r.a.createElement("br",null),L[e.id].map((function(e){return r.a.createElement("div",{key:e.k},r.a.createElement("strong",null,e.k,":")," ",e.v,r.a.createElement("br",null))}))),r.a.createElement(k.a,{className:"col-2"},r.a.createElement(j.a,{onClick:function(){return b(W,e)},variant:"warning"},r.a.createElement(N.c,null)))),r.a.createElement("hr",null))})))}else f(W),D="No webhooks found";return r.a.createElement(w.a,{style:{maxWidth:"unset"}},r.a.createElement(g.a,null,r.a.createElement(k.a,{className:"col-3"},r.a.createElement(g.a,{className:"align-items-center"},r.a.createElement(k.a,null,r.a.createElement("h1",null,"Calls")),r.a.createElement(k.a,{style:{textAlign:"right",bottom:0}},r.a.createElement(j.a,{onClick:function(){return _(W)},variant:"danger"},r.a.createElement(N.c,null)),r.a.createElement(j.a,{onClick:function(){return f(W)},variant:"info"},r.a.createElement(N.a,null)))),r.a.createElement(x.a,null,r.a.createElement(x.a.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1"},r.a.createElement(x.a.Control,{type:"text",placeholder:"Payload fields in summary (comma separated)",value:d,onChange:function(e){p(e.target.value)}}))),D),r.a.createElement(k.a,{className:"col-9"},r.a.createElement(S,{selectedWebhook:u}))))},D=function(){var e=Object(n.useState)({status_code:0,response_body:""}),t=Object(m.a)(e,2),a=t[0],l=t[1],c=function(){var e=Object(y.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("/api/"+t+"/config").then((function(e){l(e.data)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=Object(y.a)(v.a.mark((function e(t){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(a),e.next=3,O.a.post("/api/"+t+"/config",a);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=h(),s="";return u&&(s=u.id),Object(n.useEffect)((function(){s&&c(s)}),[u]),r.a.createElement("div",null,r.a.createElement(x.a,null,r.a.createElement(g.a,{className:"align-items-center justify-content-center"},r.a.createElement(k.a,{className:"col-2"},r.a.createElement(x.a.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1"},r.a.createElement(x.a.Label,null,"Response status code"),r.a.createElement(x.a.Control,{type:"number",placeholder:"200",value:a.status_code,onChange:function(e){l({status_code:parseInt(e.target.value),response_body:a.response_body})}}))),r.a.createElement(k.a,{className:"col-5"},r.a.createElement(x.a.Group,{className:"mb-3",controlId:"exampleForm.ControlTextarea1"},r.a.createElement(x.a.Label,null,"Response payload"),r.a.createElement(x.a.Control,{as:"textarea",rows:1,value:a.response_body,onChange:function(e){l({status_code:a.status_code,response_body:e.target.value})}}))),r.a.createElement(k.a,{className:"col-1"},r.a.createElement(j.a,{onClick:function(){return o(s)},variant:"success"},r.a.createElement(N.b,null))))),r.a.createElement("hr",null))},L=function(){var e=h(),t="Loading...";e&&(t=e.id);var a=window.location.origin+"/api/"+t;return r.a.createElement("div",{className:"header"},r.a.createElement("h1",null,"Capt'n Hook \ud83c\udff4\u200d\u2620\ufe0f "),r.a.createElement("hr",null),r.a.createElement(g.a,null,r.a.createElement(k.a,{className:"col-8"},r.a.createElement("div",null,r.a.createElement("h4",null,"Set webhook URL: ",a,"/catch"),r.a.createElement("h4",null,"API to check calls: ",a,"/check"))),r.a.createElement(k.a,{className:"col-4"},r.a.createElement("h4",null,"Bucket ID: ",t))),r.a.createElement("hr",null),r.a.createElement(D,null))},P=function(e){Object(i.a)(a,e);var t=Object(s.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(f,{basename:"/"},r.a.createElement("div",{className:"container",style:{maxWidth:"unset"}},r.a.createElement(L,null),r.a.createElement(W,null)))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var R=a(50),B=a(51),F=new B.QueryClient;c.a.render(r.a.createElement(R.a,null,r.a.createElement(B.QueryClientProvider,{client:F},r.a.createElement(P,null)),","),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[77,1,2]]]);
//# sourceMappingURL=main.90fe202d.chunk.js.map