(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{161:function(e,t,r){e.exports=r(215)},214:function(e,t,r){},215:function(e,t,r){"use strict";r.r(t);r(162),r(187);var a=r(0),n=r.n(a),o=r(31),c=r.n(o),i=r(13),l=r(40),u=Object(l.b)({name:"main",initialState:{platform:"",isDesktop:!1,theme:"light",hasHeader:!1,infoUser:{name:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."}},reducers:{set:function(e,t){e[t.payload.key]=t.payload.value}}}),s=u.actions.set,m=u.reducer,h=Object(l.a)({reducer:{main:m}}),f=r(9),p=r.n(f),d=[{id:"home",hash:"home",panels:[{id:"base",hash:"/base"},{id:"infoProduct",hash:"/placeholder"}]},{id:"cart",hash:"profile",panels:[{id:"base",hash:"/base"},{id:"infoProductCart",hash:"/"},{id:"newOrder",hash:"/"}]},{id:"orders",hash:"orders",panels:[{id:"base",hash:"/"}]}],g=r(51),v=r(17),E=r(1),y=r(11),b=r.n(y);function w(e,t){return t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?Math.abs(e)%10:5]]}var O=r(219),k=r(220),S=r(221);var j=Object(f.withRouter)(function(e){var t=e.router,r=Object(i.useSelector)(function(e){return e.main.hasHeader});return n.a.createElement(E.E,{fixed:!0,width:"280px",maxWidth:"280px"},n.a.createElement(E.x,{id:"menuDesktop"},r&&n.a.createElement(E.y,null),n.a.createElement(E.n,null,n.a.createElement(E.e,{onClick:function(){return t.toView("home")},disabled:"home"===t.activeView,before:n.a.createElement(O.a,null),className:"home"===t.activeView?"activeViewCell":""},"\u0422\u043e\u0432\u0430\u0440\u044b"),n.a.createElement(E.e,{onClick:function(){return t.toView("cart")},disabled:"cart"===t.activeView,before:n.a.createElement(k.a,null),className:"cart"===t.activeView?"activeViewCell":""},"\u041a\u043e\u0440\u0437\u0438\u043d\u0430"),n.a.createElement(E.e,{onClick:function(){return t.toView("orders")},disabled:"orders"===t.activeView,before:n.a.createElement(S.a,null),className:"orders"===t.activeView?"activeViewCell":""},"\u0417\u0430\u043a\u0430\u0437\u044b"))))});var x=Object(f.withRouter)(function(e){var t=e.router,r=e.count;function a(e){var r=t.activeView;t.toView(e),e===r&&t.toHash("".concat(e,"/base"))}return n.a.createElement(E.G,null,n.a.createElement(E.H,{selected:"home"===t.activeView,onClick:function(){return a("home")},text:"\u0422\u043e\u0432\u0430\u0440\u044b"},n.a.createElement(O.a,null)),n.a.createElement(E.H,{"data-id":"cart",selected:"cart"===t.activeView,onClick:function(){return a("cart")},text:"\u041a\u043e\u0440\u0437\u0438\u043d\u0430",indicator:0!==r&&n.a.createElement(E.g,{size:"s",mode:"primary"},r)},n.a.createElement(k.a,null)),n.a.createElement(E.H,{"data-id":"orders",selected:"orders"===t.activeView,onClick:function(){return a("orders")},text:"\u0417\u0430\u043a\u0430\u0437\u044b"},n.a.createElement(S.a,null)))}),C=r(218),P=r(222),N=r(217),V=[{name:"VK Mini Apps",avatar:"https://sun9-1.userapi.com/impf/c846420/v846420985/1526c3/ISX7VF8NjZk.jpg?size=800x800&quality=96&sign=fefc1a684879e75bd9d36b4ba2907310&type=album",desc:"\u041a\u0430\u043a\u043e\u0439-\u0442\u043e \u0442\u0435\u043a\u0441\u0442"},{name:"VK API",avatar:"https://sun2.is74.userapi.com/impf/c638629/v638629852/2afba/o-dvykjSIB4.jpg?size=600x600&quality=96&sign=553d78e3d9a15f06cacc3f421d9a4919&type=album",desc:"\u041a\u0430\u043a\u043e\u0439-\u0442\u043e \u0442\u0435\u043a\u0441\u0442"},{name:"VK Testers",avatar:"https://sun1.is74.userapi.com/impg/A1ovThuM8zEqmrM9JSCmQreQMma77TzS4GKnQg/KXYKrjN-gvs.jpg?size=1280x1280&quality=95&sign=65c063e8da218030ea2643df3414ece4&type=album",desc:"\u041a\u0430\u043a\u043e\u0439-\u0442\u043e \u0442\u0435\u043a\u0441\u0442"}];var L=Object(f.withRouter)(function(e){var t=e.nav,r=e.router,a=Object(i.useSelector)(function(e){return e.main.platform});return n.a.createElement(E.u,{nav:t,header:n.a.createElement(E.v,{left:a!==E.q&&n.a.createElement(E.A,{onClick:function(){return r.toBack()}},n.a.createElement(C.a,null)),right:a===E.q&&n.a.createElement(E.A,{onClick:function(){return r.toBack()}},n.a.createElement(P.a,null))},"\u0421\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0430"),onClose:function(){return r.toBack()},settlingHeight:100},n.a.createElement(E.t,null,V.map(function(e,t){return n.a.createElement(E.e,{key:t,description:e.desc,before:n.a.createElement(E.c,{size:40,src:e.avatar}),onClick:function(){return r.toModal("botInfo")},asideContent:n.a.createElement(N.a,{fill:"#528bcc"})},e.name)})))});var _=Object(f.withRouter)(function(e){var t=e.nav,r=e.router,a=Object(i.useSelector)(function(e){return e.main.platform});return n.a.createElement(E.u,{nav:t,header:n.a.createElement(E.v,{left:a!==E.q&&n.a.createElement(E.A,{onClick:function(){return r.toBack()}},n.a.createElement(C.a,null)),right:a===E.q&&n.a.createElement(E.A,{onClick:function(){return r.toBack()}},n.a.createElement(P.a,null))},"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0435"),onClose:function(){return r.toBack()},settlingHeight:100},n.a.createElement(E.e,{description:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",before:n.a.createElement(E.c,{size:40,src:"https://vk.com/images/community_100.png?ava=1"})},"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"),n.a.createElement(E.t,null,n.a.createElement(E.e,null,n.a.createElement(E.r,{header:"\u041f\u043e\u0434\u043f\u0438\u0441\u0447\u0438\u043a\u043e\u0432"},"8800")),n.a.createElement(E.e,null,n.a.createElement(E.r,{header:"\u0417\u0430\u043f\u0438\u0441\u0435\u0439"},"555")),n.a.createElement(E.e,null,n.a.createElement(E.r,{header:"\u0420\u0435\u0439\u0442\u0438\u043d\u0433"},"3535"))))}),I=r(223);var z=Object(f.withRouter)(function(e){var t=e.router,r=e.products,a=e.declOfNum,o=(Object(i.useSelector)(function(e){return e.main}),Object(i.useDispatch)());return n.a.createElement(n.a.Fragment,null,n.a.createElement(E.y,{left:n.a.createElement(E.A,null,n.a.createElement(I.a,null))},"\u0422\u043e\u0432\u0430\u0440\u044b"),n.a.createElement(E.n,null,n.a.createElement("div",{className:"products"},r.map(function(e){return n.a.createElement(E.h,{onClick:function(){return o(s({key:"infoProduct",value:e})),void t.toPanel("infoProduct")},style:{marginLeft:0,marginRight:0}},n.a.createElement("div",null,n.a.createElement(E.c,{size:150,src:e.photo,mode:"image"})),n.a.createElement(E.p,{weight:"medium",style:{marginBottom:0,marginTop:5}},e.price,"\u20bd"),n.a.createElement("span",{className:"test"},e.name.length>25?e.name.slice(0,25)+"...":e.name))})),n.a.createElement(E.k,null,"\u0412\u0441\u0435\u0433\u043e ",r.length," ",a(r.length,["\u0442\u043e\u0432\u0430\u0440","\u0442\u043e\u0432\u0430\u0440\u0430","\u0442\u043e\u0432\u0430\u0440\u043e\u0432"]))))});var D=Object(f.withRouter)(function(e){var t=e.router,r=e.storage,a=(e.declOfNum,e.dispatch,e.count),o=e.setCount;return n.a.createElement(n.a.Fragment,null,n.a.createElement(E.y,{separator:!1,left:n.a.createElement(E.z,{onClick:function(){return t.toBack()}})},"\u0422\u043e\u0432\u0430\u0440"),n.a.createElement(E.n,null,n.a.createElement(E.m,{showArrows:r.infoProduct.photo.length>1},r.infoProduct.photo.map(function(e){return n.a.createElement("img",{src:e,alt:""})})),n.a.createElement(E.h,{style:{marginTop:15}},n.a.createElement(E.p,{weight:"regular",style:{fontSize:20}},r.infoProduct.name),n.a.createElement(E.p,{weight:"medium",style:{fontSize:20,marginTop:10}},r.infoProduct.price,"\u20bd")),n.a.createElement(E.C,null),n.a.createElement(E.h,{style:{whiteSpace:"pre-line"}},r.infoProduct.description),n.a.createElement(E.j,{vertical:"bottom",filled:!0},n.a.createElement(E.h,null,n.a.createElement(E.d,{size:"l",stretched:!0,onClick:function(){return function(e){var t=JSON.parse(localStorage.getItem("cart"));if(o(a+1),0!==t.length){var r=t;r.unshift(e),r=JSON.stringify(r),localStorage.setItem("cart",r)}else{var n=[];n.unshift(e),n=JSON.stringify(n),localStorage.setItem("cart",n)}}(r.infoProduct)}},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0443")))))});var J=Object(f.withRouter)(function(e){var t=e.router,r=e.isDesktop,o=(e.storage,e.dispatch),c=(e.checkCart,e.setCount),i=Object(a.useState)(0),l=Object(v.a)(i,2),u=l[0],m=l[1],h=Object(a.useState)(JSON.parse(localStorage.getItem("cart"))),f=Object(v.a)(h,2),p=f[0],d=f[1];return Object(a.useEffect)(function(){!function(){if(0!==JSON.parse(localStorage.getItem("cart")).length){var e=JSON.parse(localStorage.getItem("cart")).length-1;console.log(e);for(var t=0,r=0;r<=e;r++)console.log(JSON.parse(localStorage.getItem("cart"))[r]),t+=Number(JSON.parse(localStorage.getItem("cart"))[r].price);m(t)}}()},[]),n.a.createElement(n.a.Fragment,null,n.a.createElement(E.y,null,"\u041a\u043e\u0440\u0437\u0438\u043d\u0430"),n.a.createElement(E.n,null,0===p.length?n.a.createElement(E.B,{header:"\u041a\u0430\u0436\u0435\u0442\u0441\u044f, \u0437\u0434\u0435\u0441\u044c \u0435\u0449\u0451 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435\u0442!",icon:n.a.createElement(k.a,{width:56,height:56}),action:n.a.createElement(E.d,{size:"l",onClick:function(){return t.toView("home")},mode:"secondary"},"\u0417\u0430 \u043f\u043e\u043a\u0443\u043f\u043a\u0430\u043c\u0438"),className:!r&&"placeholder"},"\u0414\u043e\u0431\u0430\u0432\u044c \u043d\u0443\u0436\u043d\u044b\u0435 \u0442\u043e\u0432\u0430\u0440\u044b \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0443 \u0438 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0441\u044f \u0441\u043d\u043e\u0432\u0430!"):n.a.createElement(n.a.Fragment,null,n.a.createElement(E.o,null,"\u0412\u0430\u0448\u0430 \u043a\u043e\u0440\u0437\u0438\u043d\u0430"),JSON.parse(localStorage.getItem("cart")).map(function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement(E.D,{before:n.a.createElement(E.c,{size:75,mode:"image",src:e.photo}),after:n.a.createElement("span",{className:"count_cart"},e.price,"\u20bd"),style:{marginBottom:5},onClick:function(){o(s({key:"infoProductCart",value:e})),t.toPanel("infoProductCart")}},e.name))}),n.a.createElement(E.h,null,n.a.createElement(E.d,{mode:"secondary",onClick:function(){d([]),localStorage.setItem("cart","[]"),c(0)},size:"m"},"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043a\u043e\u0440\u0437\u0438\u043d\u0443")),n.a.createElement(E.j,{vertical:"bottom",filled:!0},n.a.createElement(E.C,{wide:!0}),n.a.createElement(E.o,{mode:"secondary"},"\u0418\u0442\u043e\u0433\u043e"),n.a.createElement(E.D,{disabled:!0,after:n.a.createElement("span",{className:"count_cart"},JSON.parse(localStorage.getItem("cart")).length," ",w(JSON.parse(localStorage.getItem("cart")).length,["\u0442\u043e\u0432\u0430\u0440","\u0442\u043e\u0432\u0430\u0440\u0430","\u0442\u043e\u0432\u0430\u0440\u043e\u0432"]))},u,"\u20bd"),n.a.createElement(E.h,null,n.a.createElement(E.d,{size:"l",stretched:!0,onClick:function(){o(s({key:"price",value:u})),t.toPanel("newOrder")}},"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u0438\u044e"))))))}),B=r(224);var q=Object(f.withRouter)(function(e){e.router;var t=e.isDesktop;return n.a.createElement(n.a.Fragment,null,n.a.createElement(E.y,null,"\u0417\u0430\u043a\u0430\u0437\u044b"),n.a.createElement(E.n,null,n.a.createElement(E.B,{header:"\u0422\u0443\u0442 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435\u0442",icon:n.a.createElement(B.a,{width:56,height:56}),className:!t&&"placeholder"},"\u0414\u043e\u0431\u0430\u0432\u044c \u043b\u044e\u0431\u0438\u043c\u044b\u0435 \u0442\u043e\u0432\u0430\u0440\u044b \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0443, \u043e\u0444\u043e\u0440\u043c\u043b\u044f\u0439 \u0437\u0430\u043a\u0430\u0437 \u0438 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0441\u044f!")))});var F=Object(f.withRouter)(function(e){var t=e.router,r=e.storage;return e.declOfNum,e.dispatch,n.a.createElement(n.a.Fragment,null,n.a.createElement(E.y,{separator:!1,left:n.a.createElement(E.z,{onClick:function(){return t.toBack()}})},"\u0422\u043e\u0432\u0430\u0440"),n.a.createElement(E.n,null,n.a.createElement(E.m,null,r.infoProductCart.photo.map(function(e){return n.a.createElement("img",{src:e,alt:""})})),n.a.createElement(E.h,{style:{marginTop:15}},n.a.createElement(E.p,{weight:"regular",style:{fontSize:20}},r.infoProductCart.name),n.a.createElement(E.p,{weight:"medium",style:{fontSize:20,marginTop:10}},r.infoProductCart.price,"\u20bd")),n.a.createElement(E.C,null),n.a.createElement(E.h,{style:{whiteSpace:"pre-line"}},r.infoProductCart.description),n.a.createElement(E.j,{vertical:"bottom",filled:!0},n.a.createElement(E.h,null,n.a.createElement(E.d,{size:"l",stretched:!0,onClick:function(){return function(e){var t=JSON.parse(localStorage.getItem("cart"));if(console.log(t),0!==t.length){var a=t;a.unshift(e),a=JSON.stringify(a),localStorage.setItem("cart",a),console.log(r.cart)}else{var n=[];n.unshift(e),n=JSON.stringify(n),localStorage.setItem("cart",n),console.log(localStorage.getItem("cart"))}}(r.infoProductCart)}},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0443")))))});var G=Object(f.withRouter)(function(e){var t=e.router,r=e.storage,o=Object(a.useState)(""),c=Object(v.a)(o,2),i=c[0],l=c[1],u=Object(a.useState)(""),s=Object(v.a)(u,2),m=s[0],h=s[1],f=Object(a.useState)(""),p=Object(v.a)(f,2),d=p[0],g=p[1],y=Object(a.useState)(""),b=Object(v.a)(y,2),O=b[0],k=b[1];return n.a.createElement(n.a.Fragment,null,n.a.createElement(E.y,{left:n.a.createElement(E.z,{onClick:function(){return t.toBack()}})},"\u041d\u043e\u0432\u044b\u0439 \u0437\u0430\u043a\u0430\u0437"),n.a.createElement(E.n,null,n.a.createElement(E.l,{top:"\u0410\u0434\u0440\u0435\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"},n.a.createElement(E.I,{placeholder:'\u0433. \u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433, \u041d\u0435\u0432\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442, \u0434. 28, \u0411\u0426 "\u0417\u0438\u043d\u0433\u0435\u0440\u044a"',value:i,onChange:function(e){return l(e.currentTarget.value)}})),n.a.createElement(E.l,{top:"\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c"},n.a.createElement(E.s,{placeholder:"\u0418\u0432\u0430\u043d\u043e\u0432 \u0418\u0432\u0430\u043d \u0418\u0432\u0430\u043d\u043e\u0432\u0438\u0447",value:m,onChange:function(e){return h(e.currentTarget.value)}})),n.a.createElement(E.l,{top:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"},n.a.createElement(E.s,{placeholder:"+70000000000",type:"number",maxLength:12,value:d,onChange:function(e){return g(e.currentTarget.value)}})),n.a.createElement(E.l,{top:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)"},n.a.createElement(E.I,{value:O,onChange:function(e){return k(e.currentTarget.value)}})),n.a.createElement(E.j,{vertical:"bottom",filled:!0},n.a.createElement(E.C,{wide:!0}),n.a.createElement(E.o,{mode:"secondary"},"\u0418\u0442\u043e\u0433\u043e"),n.a.createElement(E.D,{disabled:!0,after:n.a.createElement("span",{className:"count_cart"},JSON.parse(localStorage.getItem("cart")).length," ",w(JSON.parse(localStorage.getItem("cart")).length,["\u0442\u043e\u0432\u0430\u0440","\u0442\u043e\u0432\u0430\u0440\u0430","\u0442\u043e\u0432\u0430\u0440\u043e\u0432"]))},r.price,"\u20bd"),n.a.createElement(E.h,null,n.a.createElement(E.d,{size:"l",stretched:!0,onClick:function(){return t.toPanel("newOrder")},disabled:0===i.length||0===m.length||0===d.length},"\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437")))))});function K(){K=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},n=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function i(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{i({},"")}catch(x){i=function(e,t,r){return e[t]=r}}function l(e,t,r,a){var n=t&&t.prototype instanceof m?t:m,o=Object.create(n.prototype),c=new k(a||[]);return o._invoke=function(e,t,r){var a="suspendedStart";return function(n,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===n)throw o;return j()}for(r.method=n,r.arg=o;;){var c=r.delegate;if(c){var i=b(c,r);if(i){if(i===s)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===a)throw a="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a="executing";var l=u(e,t,r);if("normal"===l.type){if(a=r.done?"completed":"suspendedYield",l.arg===s)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(a="completed",r.method="throw",r.arg=l.arg)}}}(e,r,c),o}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(x){return{type:"throw",arg:x}}}e.wrap=l;var s={};function m(){}function h(){}function f(){}var p={};i(p,n,function(){return this});var d=Object.getPrototypeOf,g=d&&d(d(S([])));g&&g!==t&&r.call(g,n)&&(p=g);var v=f.prototype=m.prototype=Object.create(p);function E(e){["next","throw","return"].forEach(function(t){i(e,t,function(e){return this._invoke(t,e)})})}function y(e,t){var a;this._invoke=function(n,o){function c(){return new t(function(a,c){!function a(n,o,c,i){var l=u(e[n],e,o);if("throw"!==l.type){var s=l.arg,m=s.value;return m&&"object"==typeof m&&r.call(m,"__await")?t.resolve(m.__await).then(function(e){a("next",e,c,i)},function(e){a("throw",e,c,i)}):t.resolve(m).then(function(e){s.value=e,c(s)},function(e){return a("throw",e,c,i)})}i(l.arg)}(n,o,a,c)})}return a=a?a.then(c,c):c()}}function b(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,b(e,t),"throw"===t.method))return s;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var a=u(r,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,s;var n=a.arg;return n?n.done?(t[e.resultName]=n.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,s):n:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,s)}function w(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function k(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(w,this),this.reset(!0)}function S(e){if(e){var t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,o=function t(){for(;++a<e.length;)if(r.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return h.prototype=f,i(v,"constructor",f),i(f,"constructor",h),h.displayName=i(f,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,f):(e.__proto__=f,i(e,c,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},E(y.prototype),i(y.prototype,o,function(){return this}),e.AsyncIterator=y,e.async=function(t,r,a,n,o){void 0===o&&(o=Promise);var c=new y(l(t,r,a,n),o);return e.isGeneratorFunction(r)?c:c.next().then(function(e){return e.done?e.value:c.next()})},E(v),i(v,c,"Generator"),i(v,n,function(){return this}),i(v,"toString",function(){return"[object Generator]"}),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var a=t.pop();if(a in e)return r.value=a,r.done=!1,r}return r.done=!0,r}},e.values=S,k.prototype={constructor:k,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(r,a){return c.type="throw",c.arg=e,t.next=r,a&&(t.method="next",t.arg=void 0),!!a}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],c=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var i=r.call(o,"catchLoc"),l=r.call(o,"finallyLoc");if(i&&l){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),s},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),O(r),s}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var a=r.completion;if("throw"===a.type){var n=a.arg;O(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:S(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},e}var T=Object(E.M)(function(e){var t=e.viewWidth,r=e.router,o=Object(i.useSelector)(function(e){return e.main}),c=Object(i.useDispatch)(),l=Object(a.useState)(""),u=Object(v.a)(l,2),m=u[0],h=u[1],f=Object(a.useState)(0),p=Object(v.a)(f,2),d=p[0],y=p[1],O=localStorage,k=O.getItem("cart");function S(){return(S=Object(g.a)(K().mark(function e(){var t;return K().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return b.a.subscribe(function(e){if("VKWebAppUpdateConfig"===e.detail.type){var t=e.detail.data.scheme;h(t)}}),e.next=3,b.a.send("VKWebAppGetConfig");case 3:t=e.sent,h(t.scheme);case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}function C(){return P.apply(this,arguments)}function P(){return(P=Object(g.a)(K().mark(function e(){return K().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log(k),null===localStorage.getItem("cart")||0===JSON.parse(localStorage.getItem("cart")).length?(localStorage.setItem("cart","[]"),y(0)):y(JSON.parse(localStorage.getItem("cart")).length);case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}c(s({key:"isDesktop",value:t>=3})),c(s({key:"platform",value:o.isDesktop?E.J:Object(E.L)()})),c(s({key:"hasHeader",value:!0!==o.isDesktop})),c(s({key:"cart",value:"[]"})),Object(a.useEffect)(function(){!function(){S.apply(this,arguments)}(),C()},[]);var N=n.a.createElement(E.w,{activeModal:r.modal,onClose:function(){return r.toBack()}},n.a.createElement(L,{nav:"botsList"}),n.a.createElement(_,{nav:"botInfo"}));return n.a.createElement(E.f,{platform:"vkcom"===o.platform?"vkcom":"ios",scheme:m,isWebView:!0},n.a.createElement(E.b,null,n.a.createElement(E.F,{header:o.hasHeader&&n.a.createElement(E.y,{separator:!1}),style:{justifyContent:"center"}},n.a.createElement(E.E,{animate:!o.isDesktop,spaced:o.isDesktop,width:o.isDesktop?"560px":"100%",maxWidth:o.isDesktop?"560px":"100%"},n.a.createElement(E.i,{activeStory:r.activeView,tabbar:!o.isDesktop&&n.a.createElement(x,{count:d})},n.a.createElement(E.K,{id:"home",activePanel:"route_modal"===r.activePanel?"base":r.activePanel,popout:r.popout,modal:N},n.a.createElement(E.x,{id:"base"},n.a.createElement(z,{router:r,storage:o,products:[{id:0,price:15e4,name:"MacBook Pro 13 M1 16/512",description:"fghgh\njhgfgyhj\nkjhgftyh\ngtyujkoiuy\njytfvhui",photo:["https://www.notebookcheck-ru.com/uploads/tx_nbc2/2020-12-07_00_20_10-13__MacBook_Pro_kaufen_-_Apple__DE_.png"]},{id:1,price:1,name:"Macbook pro 15",description:"\u041a\u0443\u0440\u0438\u0442 \u043a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u043d\u044c\n\u042f \u0431\u044b \u0435\u043c\u0443 \u0434\u0430\u043b",photo:["https://sun7-7.userapi.com/s/v1/ig2/1qEavBZOdwuKu_remPVlGnMXqPpDxtS7VvWzHz2VVajG6wbfGdO4YLK4ShxDJ9F2BuSxewqRLp0htPtFiQaPrmqU.jpg?size=200x200&quality=95&crop=490,773,712,712&ava=1"]},{id:2,price:1,name:"\u0421\u0430\u0432\u0435\u043b\u0438\u0439 \u0425\u0430\u0439\u0440\u0443\u043b\u043b\u0438\u043d",description:"\u041a\u0443\u0440\u0438\u0442 \u043a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u043d\u044c\n\u042f \u0431\u044b \u0435\u043c\u0443 \u0434\u0430\u043b",photo:["https://sun7-7.userapi.com/s/v1/ig2/1qEavBZOdwuKu_remPVlGnMXqPpDxtS7VvWzHz2VVajG6wbfGdO4YLK4ShxDJ9F2BuSxewqRLp0htPtFiQaPrmqU.jpg?size=200x200&quality=95&crop=490,773,712,712&ava=1"]},{id:3,price:1,name:"Ol Eg",description:"aboba",photo:["https://sun7-7.userapi.com/s/v1/ig2/1qEavBZOdwuKu_remPVlGnMXqPpDxtS7VvWzHz2VVajG6wbfGdO4YLK4ShxDJ9F2BuSxewqRLp0htPtFiQaPrmqU.jpg?size=200x200&quality=95&crop=490,773,712,712&ava=1"]}],declOfNum:function(e,t){return w(e,t)}})),n.a.createElement(E.x,{id:"infoProduct"},n.a.createElement(D,{storage:o,declOfNum:function(e,t){return w(e,t)},localstorage:O,dispatch:function(e){return c(e)},count:d,setCount:function(e){return y(e)}}))),n.a.createElement(E.K,{id:"cart",activePanel:"route_modal"===r.activePanel?"base":r.activePanel,popout:r.popout,modal:N},n.a.createElement(E.x,{id:"base"},n.a.createElement(J,{localstorage:O,cart:k,isDesktop:o.isDesktop,storage:o,dispatch:function(e){return c(e)},checkCart:function(){return C()},setCount:function(e){return y(e)}})),n.a.createElement(E.x,{id:"infoProductCart"},n.a.createElement(F,{storage:o,declOfNum:function(e,t){return w(e,t)},localstorage:O,dispatch:function(e){return c(e)}})),n.a.createElement(E.x,{id:"newOrder"},n.a.createElement(G,{router:r,storage:o}))),n.a.createElement(E.K,{id:"orders",activePanel:"route_modal"===r.activePanel?"base":r.activePanel,popout:r.popout,modal:N},n.a.createElement(E.x,{id:"base"},n.a.createElement(q,{isDesktop:o.isDesktop}))))),o.isDesktop&&n.a.createElement(j,null))))},{viewWidth:!0}),A=Object(f.withRouter)(T);r(213),r(214);b.a.send("VKWebAppInit",{}),c.a.render(n.a.createElement(i.Provider,{store:h},n.a.createElement(E.a,null,n.a.createElement(p.a,{structure:d},n.a.createElement(A,null)))),document.getElementById("root")),Promise.all([r.e(3),r.e(4)]).then(r.bind(null,228)).then(function(e){e.default})}},[[161,1,2]]]);