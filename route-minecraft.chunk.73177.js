webpackJsonp([0],{"+Eei":function(t,e,i){"use strict";e.a=function(){i("kAbg")}},"7x+8":function(t,e,i){"use strict";function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),i.d(e,"default",function(){return p});var r=i("KM04"),a=(i.n(r),i("eYwp")),s=(i.n(a),i("+Eei")),c=i.i(r.h)("div",null,i.i(r.h)("a-entity",{id:"teleHand","hand-controls":"left"}),i.i(r.h)("a-entity",{id:"blockHand","hand-controls":"right"})),l=i.i(r.h)("a-scene",null,i.i(r.h)("a-assets",null,i.i(r.h)("img",{id:"skyTexture",src:"https://cdn.aframe.io/a-painter/images/sky.jpg"}),i.i(r.h)("img",{id:"groundTexture",src:"https://cdn.aframe.io/a-painter/images/floor.jpg"}),i.i(r.h)("a-mixin",{id:"voxel",geometry:"primitive: box; height: 0.5; width: 0.5; depth: 0.5",material:"shader: standard","random-color":!0,snap:"offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"})),i.i(r.h)("a-entity",{geometry:"primitive: box; depth: 0.5; height: 0.5; width 0.5",material:"shader: standard",position:"0 0.5 -2","random-color":!0}),i.i(r.h)("a-cylinder",{id:"ground",src:"https://cdn.aframe.io/a-painter/images/floor.jpg",radius:"32",height:"0.1"}),i.i(r.h)("a-sky",{id:"background",src:"#skyTexture","theta-length":"90",radius:"30"}),i.i(r.h)("a-entity",{mixin:"voxel",position:"-1 0 -2"}),i.i(r.h)("a-entity",{mixin:"voxel",position:"0 0 -2"}),i.i(r.h)("a-entity",{mixin:"voxel",position:"0 1 -2"},i.i(r.h)("a-animation",{attribute:"rotation",to:"0 360 0",repeat:"indefinite"})),i.i(r.h)("a-entity",{mixin:"voxel",position:"1 0 -2"}),controllers),p=function(t){function e(){for(var e,i,o,r=arguments.length,a=Array(r),s=0;s<r;s++)a[s]=arguments[s];return e=i=n(this,t.call.apply(t,[this].concat(a))),i.detectControlers=function(){return c},o=e,n(i,o)}return o(e,t),e.prototype.componentWillMount=function(){i.i(s.a)()},e.prototype.render=function(){this.detectControlers();return l},e}(r.Component)},eYwp:function(t){t.exports={profile:"profile__1thg6"}},kAbg:function(){AFRAME.registerComponent("random-color",{dependencies:["material"],init:function(){this.el.setAttribute("material","color",t())}});var t=function(){for(var t="#",e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}}});
//# sourceMappingURL=route-minecraft.chunk.73177.js.map