(this.webpackJsonpgochart=this.webpackJsonpgochart||[]).push([[0],{104:function(e,t,n){},234:function(e,t,n){},235:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(93),s=n.n(r),i=(n(104),n(6)),o=n(4),l=n(23),u=n.n(l),d=n(56),b=n(7),j=n(99);function h(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return(e+Math.random()*(t-e)).toFixed(n)}function f(){var e=h(1,360),t=h(35,100),n=h(50,85);return"hsla(".concat(e,", ").concat(t,"%, ").concat(n,"%, 0.35)")}function p(e,t){if(!e)return"";var n=e.split(", ");return n[3]="".concat(t,")"),n.join(", ")}var v=n(15),O=n(16),x=n(98),m=n(238),g=n(58),N=n.n(g),k=n(3),C=function(){var e=Object(a.useState)([]),t=Object(b.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(0),s=Object(b.a)(r,2),l=s[0],h=s[1],g=Object(a.useState)(),C=Object(b.a)(g,2),y=C[0],w=C[1],S=Object(a.useState)(""),T=Object(b.a)(S,2),E=T[0],D=T[1],M=Object(a.useState)(""),F=Object(b.a)(M,2),z=F[0],R=F[1],B=Object(a.useState)(""),J=Object(b.a)(B,2),V=J[0],G=J[1],X=Object(a.useState)([]),Y=Object(b.a)(X,2),A=Y[0],I=Y[1],K=Object(a.useState)(1),L=Object(b.a)(K,2),P=L[0],W=L[1],H=Object(a.useState)(!1),q=Object(b.a)(H,2),Q=q[0],U=q[1],Z=Object(a.useState)(!1),$=Object(b.a)(Z,2),_=$[0],ee=$[1],te=Object(a.useState)(""),ne=Object(b.a)(te,2),ae=ne[0],ce=ne[1],re=Object(a.useState)(null),se=Object(b.a)(re,2),ie=se[0],oe=se[1];Object(a.useEffect)((function(){var e=window.location.pathname;e.startsWith("/share/")&&le(e.replace("/share/",""))}),[]),Object(a.useEffect)((function(){var e=n.slice(),t=null;e.forEach((function(e){var n,a,c,r;1===P?(null===t||Number(null===(n=e.data[0])||void 0===n?void 0:n.x)<t)&&(t=Number(null===(a=e.data[0])||void 0===a?void 0:a.x)):(null===!t||Number(null===(c=e.data[e.data.length-1])||void 0===c?void 0:c.x)>t)&&(t=Number(null===(r=e.data[e.data.length-1])||void 0===r?void 0:r.x))}));var a=[];e.forEach((function(e){a.push(e);var n=be(e,t);a.push(n)})),I(a)}),[n,P]),Object(a.useEffect)((function(){oe(null)}),[n,P,E,z,V]);var le=function(){var e=Object(d.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return U(!0),n="https://mimee.ovh/api/share/".concat(t),e.prev=4,e.next=7,N.a.get(n);case 7:a=e.sent,setTimeout((function(){W(a.data.lineMode),c(a.data.datasets),D(a.data.suffixX),R(a.data.suffixY),G(a.data.chartName),setTimeout((function(){return oe(t)}),0),U(!1)}),500),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),U(!1);case 14:case"end":return e.stop()}}),e,null,[[4,11]])})));return function(t){return e.apply(this,arguments)}}(),ue=function(){var e=Object(d.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return ee(!0),"https://mimee.ovh/api/share/",e.prev=2,t={lineMode:P,datasets:n,suffixX:E,suffixY:z,chartName:V},e.next=6,N.a.post("https://mimee.ovh/api/share/",t);case 6:a=e.sent,window.history.pushState("","Charts for Genshin Optimizer","/share/".concat(a.data.id)),oe(a.data.id),setTimeout((function(){ee(!1),ce("Success!"),de()}),500),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0),setTimeout((function(){ee(!1),ce("Error!"),de()}),500);case 16:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(){return e.apply(this,arguments)}}(),de=function(){return setTimeout((function(){return ce("")}),4e3)},be=function(e,t){var n,a=JSON.parse(JSON.stringify(e));a.label=he("Max(".concat(e.label,")")),a.backgroundColor=p(a.backgroundColor,1),a.borderColor=p(a.backgroundColor,.5);var c,r=1===P?function(e,t){return Number(e.x)-Number(t.x)}:function(e,t){return Number(t.x)-Number(e.x)},s=a.data.sort(r),i=[],l=Object(o.a)(s);try{for(l.s();!(c=l.n()).done;){for(var u=c.value,d=void 0;d=i.pop();)if(Number(d.y)>Number(u.y)){i.push(d);break}i.push(u)}}catch(b){l.e(b)}finally{l.f()}return i.forEach((function(e){e.min=e.y})),a.data=[{x:t,y:null===(n=i[0])||void 0===n?void 0:n.y}].concat(i),a},je={responsive:!0,plugins:{legend:{display:!1}},scales:{x:{type:"linear",grid:{color:"#acaeb399",borderDash:[2,2]},ticks:{color:"#ebecee",callback:function(e,t,n){return e+E}}},y:{grid:{color:"#acaeb399",borderDash:[2,2]},ticks:{color:"#ebecee",callback:function(e,t,n){return"".concat(e," ").concat(z)}}}},interaction:{intersect:!1},animation:{duration:0}},he=function(e){for(var t=n.map((function(e){return e.label}));t.includes(e);)e="".concat("\u200b").concat(e);return e},fe=function(e,t){var a=n.slice();a[t].label=he(e.currentTarget.value),c(a)},pe=function(e,t){var a=n.slice();a.splice(e+t,0,a.splice(e,1)[0]),c(a)};return Object(k.jsxs)("div",{className:"page-wrapper",children:[ie&&Object(k.jsxs)("div",{className:"chart-link",children:["Share link:",Object(k.jsx)("input",{onClick:function(e){return e.currentTarget.setSelectionRange(0,e.currentTarget.value.length)},value:window.location.href})]}),Object(k.jsx)("div",{className:"card-wrapper",children:Object(k.jsx)("div",{className:"card-content",children:Q?Object(k.jsx)("div",{className:"loading-chart-wrapper",children:Object(k.jsx)(m.a,{className:"loading-chart",size:64})}):Object(k.jsxs)(k.Fragment,{children:[n.length>0&&Object(k.jsx)("div",{className:"paste-list",children:Object(k.jsxs)("div",{children:[Object(k.jsx)("div",{className:"charts-manager",children:_?Object(k.jsx)(m.a,{className:"share-btn",size:32}):Object(k.jsxs)("div",{onClick:function(){return ue()},className:"share-btn pointer spacing",children:[ae||"Save / Share",Object(k.jsx)(v.a,{icon:O.e})]})}),Object(k.jsxs)("div",{className:"smol-header",children:["Manage datasets",Object(k.jsx)("div",{className:"half-transparent",children:"(double click input to randomize new color)"})]}),Object(k.jsxs)("div",{className:"paste-container",children:[Object(k.jsx)("div",{className:"toolbox",tabIndex:0,children:Object(k.jsx)(x.a,{color:y,onChange:function(e){return w(e)},onChangeComplete:function(e){var t=n.slice(),a=e.hsl,r=a.h,s=a.s,i=a.l,o="hsla(".concat(r,", ").concat(100*s,"%, ").concat(100*i,"%, 0.35)");t[l].backgroundColor=o,c(t)}})}),n.map((function(e,t){return Object(k.jsxs)("span",{className:"single-paste",children:[Object(k.jsx)("input",{defaultValue:e.label,onFocus:function(){h(t),w(p(n[t].backgroundColor,1))},onBlur:function(e){return fe(e,t)},onKeyDown:function(e){"Enter"===e.key&&(fe(e,t),e.currentTarget.blur())},onDoubleClick:function(){return function(e){var t=n.slice(),a=f();t[e].backgroundColor=a,c(t),w(p(a,1))}(t)},style:{background:"linear-gradient(to right, ".concat(p(e.backgroundColor,1)," 0%, ").concat(p(e.backgroundColor,1)," 20%, #1b263b 20%)")}}),Object(k.jsx)("button",{title:"Remove dataset",className:"btn",onClick:function(){return function(e){var t=n.slice();t.splice(e,1),c(t)}(t)},children:Object(k.jsx)(v.a,{icon:O.f})}),Object(k.jsxs)("div",{className:"position-changer",children:[0!==t&&Object(k.jsx)("span",{title:"Move left",className:"arrow-btn",onClick:function(){return pe(t,-1)},children:Object(k.jsx)(v.a,{size:"xs",icon:O.c})}),t!==n.length-1&&Object(k.jsx)("span",{title:"Move right",className:"arrow-btn",onClick:function(){return pe(t,1)},children:Object(k.jsx)(v.a,{size:"xs",icon:O.d})})]})]},"label-".concat(e.label))}))]})]})}),Object(k.jsxs)("div",{className:"inputs-wrapper",children:[n.length>0&&Object(k.jsxs)("div",{className:"paste-wrapper",children:[Object(k.jsx)("input",{className:"chart-name-input",placeholder:"Chart name (e.g. Beidou Burst DMG vs ER%)",defaultValue:V||"",onBlur:function(e){return G(e.currentTarget.value)},onKeyDown:function(e){"Enter"===e.key&&(G(e.currentTarget.value),e.currentTarget.blur())}}),Object(k.jsx)("div",{className:"set-line-btn",onClick:function(){return W(Number(!P))},children:P?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(v.a,{icon:O.a})," Descending Line"]}):Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(v.a,{icon:O.b})," Ascending Line"]})})]}),Object(k.jsxs)("div",{className:"paste-wrapper",children:[Object(k.jsx)("textarea",{placeholder:"Paste Genshin Optimizer Chart's Min or Full Data here...",onChange:function(e){e&&e.preventDefault&&e.preventDefault();try{var t=e.currentTarget||e,a=t.value,r=JSON.parse(a).map((function(e){return{x:e[0].toFixed(2),y:e[1].toFixed(2)}})),s=f(),o={label:"Paste #".concat(n.length+1),data:r,stepped:"after",fill:!1,backgroundColor:p(s,.35),borderColor:"#00000000",borderWidth:3,pointHoverRadius:4,pointRadius:2,hidden:!1};w(p(s,1)),c([].concat(Object(i.a)(n),[o])),t.value=""}catch(l){console.log(l)}}}),n.length>0&&Object(k.jsxs)("div",{className:"flex-col",children:[Object(k.jsx)("input",{onChange:function(e){return R(e.currentTarget.value)},placeholder:"Y-axis (e.g. dmg)",defaultValue:z||""}),Object(k.jsx)("input",{onChange:function(e){return D(e.currentTarget.value)},placeholder:"X-axis (e.g. % ER)",defaultValue:E||""})]})]}),n.length>0&&Object(k.jsx)("div",{className:"chart-legend",children:n.map((function(e,t){return Object(k.jsx)("span",{onClick:function(){return function(e){var t=n.slice();t[e].hidden=!t[e].hidden,c(t)}(t)},style:{textDecoration:e.hidden?"line-through":"none",opacity:e.hidden?.4:1,cursor:"pointer",background:"linear-gradient(to right, ".concat(p(e.backgroundColor,1)," 0, ").concat(p(e.backgroundColor,1)," 2.5rem, transparent 2.5rem)")},children:e.label},"chart-legend-".concat(t))}))}),n.length>0&&Object(k.jsxs)("div",{className:"relative",children:[Object(k.jsx)(j.a,{data:{datasets:A},options:je}),Object(k.jsx)("div",{className:"chart-overlay",children:V})]})]})]})})})]})};n(234);var y=function(){return Object(k.jsx)("div",{className:"App",children:Object(k.jsx)(C,{})})};s.a.render(Object(k.jsx)(c.a.StrictMode,{children:Object(k.jsx)(y,{})}),document.getElementById("root"))}},[[235,1,2]]]);
//# sourceMappingURL=main.3bf87fec.chunk.js.map