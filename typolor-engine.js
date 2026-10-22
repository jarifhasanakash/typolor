/**
 * Typolor Studio Color & Typographic Engine
 * Provides harmonic color palette generation, perceptual lightness curve transfers,
 * and typographic scale calculation for modern design systems.
 *
 * Modes:
 *  1. 'original': Nearest hand-crafted skeleton + relative deltaE projection + HSL curve transfer
 *  2. 'lockInputColor': Pins exact user color to target shade (500 default) with tent-tapered curve
 *  3. 'apca': Calibrated APCA contrast targets against white/black text
 *  4. Standalone browser & Node.js support (zero external dependencies)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TypolorEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // --- EMBEDDED CHROMA-JS ---
  const chroma = (function() {
    const exports = {};
    const module = { exports };
    const{min:ze,max:Ge}=Math,J=(t,e=0,n=1)=>ze(Ge(e,t),n),Yt=t=>{t._clipped=!1,t._unclipped=t.slice(0);for(let e=0;e<=3;e++)e<3?((t[e]<0||t[e]>255)&&(t._clipped=!0),t[e]=J(t[e],0,255)):e===3&&(t[e]=J(t[e],0,1));return t},re={};for(let t of["Boolean","Number","String","Function","Array","Date","RegExp","Undefined","Null"])re[`[object ${t}]`]=t.toLowerCase();function A(t){return re[Object.prototype.toString.call(t)]||"object"}const $=(t,e=null)=>t.length>=3?Array.prototype.slice.call(t):A(t[0])=="object"&&e?e.split("").filter(n=>t[0][n]!==void 0).map(n=>t[0][n]):t[0].slice(0),ot=t=>{if(t.length<2)return null;const e=t.length-1;return A(t[e])=="string"?t[e].toLowerCase():null},{PI:yt,min:oe,max:ce}=Math,X=t=>Math.round(t*100)/100,Ct=t=>Math.round(t*100)/100,W=yt*2,Mt=yt/3,Be=yt/180,Se=180/yt;function se(t){return[...t.slice(0,3).reverse(),...t.slice(3)]}const _={format:{},autodetect:[]};class u{constructor(...e){const n=this;if(A(e[0])==="object"&&e[0].constructor&&e[0].constructor===this.constructor)return e[0];let r=ot(e),o=!1;if(!r){o=!0,_.sorted||(_.autodetect=_.autodetect.sort((s,c)=>c.p-s.p),_.sorted=!0);for(let s of _.autodetect)if(r=s.test(...e),r)break}if(_.format[r]){const s=_.format[r].apply(null,o?e:e.slice(0,-1));n._rgb=Yt(s)}else throw new Error("unknown format: "+e);n._rgb.length===3&&n._rgb.push(1)}toString(){return A(this.hex)=="function"?this.hex():`[${this._rgb.join(",")}]`}}const Xe="3.2.0",L=(...t)=>new u(...t);L.version=Xe;const nt={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},qe=/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,Ze=/^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,fe=t=>{if(t.match(qe)){(t.length===4||t.length===7)&&(t=t.substr(1)),t.length===3&&(t=t.split(""),t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);const e=parseInt(t,16),n=e>>16,r=e>>8&255,o=e&255;return[n,r,o,1]}if(t.match(Ze)){(t.length===5||t.length===9)&&(t=t.substr(1)),t.length===4&&(t=t.split(""),t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]+t[3]+t[3]);const e=parseInt(t,16),n=e>>24&255,r=e>>16&255,o=e>>8&255,s=Math.round((e&255)/255*100)/100;return[n,r,o,s]}throw new Error(`unknown hex color: ${t}`)},{round:bt}=Math,ae=(...t)=>{let[e,n,r,o]=$(t,"rgba"),s=ot(t)||"auto";o===void 0&&(o=1),s==="auto"&&(s=o<1?"rgba":"rgb"),e=bt(e),n=bt(n),r=bt(r);let f="000000"+(e<<16|n<<8|r).toString(16);f=f.substr(f.length-6);let a="0"+bt(o*255).toString(16);switch(a=a.substr(a.length-2),s.toLowerCase()){case"rgba":return`#${f}${a}`;case"argb":return`#${a}${f}`;default:return`#${f}`}};u.prototype.name=function(){const t=ae(this._rgb,"rgb");for(let e of Object.keys(nt))if(nt[e]===t)return e.toLowerCase();return t};_.format.named=t=>{if(t=t.toLowerCase(),nt[t])return fe(nt[t]);throw new Error("unknown color name: "+t)};_.autodetect.push({p:5,test:(t,...e)=>{if(!e.length&&A(t)==="string"&&nt[t.toLowerCase()])return"named"}});u.prototype.alpha=function(t,e=!1){return t!==void 0&&A(t)==="number"?e?(this._rgb[3]=t,this):new u([this._rgb[0],this._rgb[1],this._rgb[2],t],"rgb"):this._rgb[3]};u.prototype.clipped=function(){return this._rgb._clipped||!1};const T={Kn:18,labWhitePoint:"d65",Xn:.95047,Yn:1,Zn:1.08883,kE:216/24389,kKE:8,kK:24389/27,RefWhiteRGB:{X:.95047,Y:1,Z:1.08883},MtxRGB2XYZ:{m00:.4124564390896922,m01:.21267285140562253,m02:.0193338955823293,m10:.357576077643909,m11:.715152155287818,m12:.11919202588130297,m20:.18043748326639894,m21:.07217499330655958,m22:.9503040785363679},MtxXYZ2RGB:{m00:3.2404541621141045,m01:-.9692660305051868,m02:.055643430959114726,m10:-1.5371385127977166,m11:1.8760108454466942,m12:-.2040259135167538,m20:-.498531409556016,m21:.041556017530349834,m22:1.0572251882231791},As:.9414285350000001,Bs:1.040417467,Cs:1.089532651,MtxAdaptMa:{m00:.8951,m01:-.7502,m02:.0389,m10:.2664,m11:1.7135,m12:-.0685,m20:-.1614,m21:.0367,m22:1.0296},MtxAdaptMaI:{m00:.9869929054667123,m01:.43230526972339456,m02:-.008528664575177328,m10:-.14705425642099013,m11:.5183602715367776,m12:.04004282165408487,m20:.15996265166373125,m21:.0492912282128556,m22:.9684866957875502}},Ie=new Map([["a",[1.0985,.35585]],["b",[1.0985,.35585]],["c",[.98074,1.18232]],["d50",[.96422,.82521]],["d55",[.95682,.92149]],["d65",[.95047,1.08883]],["e",[1,1,1]],["f2",[.99186,.67393]],["f7",[.95041,1.08747]],["f11",[1.00962,.6435]],["icc",[.96422,.82521]]]);function H(t){const e=Ie.get(String(t).toLowerCase());if(!e)throw new Error("unknown Lab illuminant "+t);T.labWhitePoint=t,T.Xn=e[0],T.Zn=e[1]}function lt(){return T.labWhitePoint}const zt=(...t)=>{t=$(t,"lab");const[e,n,r]=t,[o,s,c]=Te(e,n,r),[f,a,l]=le(o,s,c);return[f,a,l,t.length>3?t[3]:1]},Te=(t,e,n)=>{const{kE:r,kK:o,kKE:s,Xn:c,Yn:f,Zn:a}=T,l=(t+16)/116,h=.002*e+l,d=l-.005*n,b=h*h*h,m=d*d*d,M=b>r?b:(116*h-16)/o,R=t>s?Math.pow((t+16)/116,3):t/o,g=m>r?m:(116*d-16)/o,w=M*c,Y=R*f,j=g*a;return[w,Y,j]},$t=t=>{const e=Math.sign(t);return t=Math.abs(t),(t<=.0031308?t*12.92:1.055*Math.pow(t,1/2.4)-.055)*e},le=(t,e,n)=>{const{MtxAdaptMa:r,MtxAdaptMaI:o,MtxXYZ2RGB:s,RefWhiteRGB:c,Xn:f,Yn:a,Zn:l}=T,h=f*r.m00+a*r.m10+l*r.m20,d=f*r.m01+a*r.m11+l*r.m21,b=f*r.m02+a*r.m12+l*r.m22,m=c.X*r.m00+c.Y*r.m10+c.Z*r.m20,M=c.X*r.m01+c.Y*r.m11+c.Z*r.m21,R=c.X*r.m02+c.Y*r.m12+c.Z*r.m22,g=(t*r.m00+e*r.m10+n*r.m20)*(m/h),w=(t*r.m01+e*r.m11+n*r.m21)*(M/d),Y=(t*r.m02+e*r.m12+n*r.m22)*(R/b),j=g*o.m00+w*o.m10+Y*o.m20,P=g*o.m01+w*o.m11+Y*o.m21,O=g*o.m02+w*o.m12+Y*o.m22,S=$t(j*s.m00+P*s.m10+O*s.m20),E=$t(j*s.m01+P*s.m11+O*s.m21),i=$t(j*s.m02+P*s.m12+O*s.m22);return[S*255,E*255,i*255]},Gt=(...t)=>{const[e,n,r,...o]=$(t,"rgb"),[s,c,f]=ie(e,n,r),[a,l,h]=Ke(s,c,f);return[a,l,h,...o.length>0&&o[0]<1?[o[0]]:[]]};function Ke(t,e,n){const{Xn:r,Yn:o,Zn:s,kE:c,kK:f}=T,a=t/r,l=e/o,h=n/s,d=a>c?Math.pow(a,1/3):(f*a+16)/116,b=l>c?Math.pow(l,1/3):(f*l+16)/116,m=h>c?Math.pow(h,1/3):(f*h+16)/116;return[116*b-16,500*(d-b),200*(b-m)]}function xt(t){const e=Math.sign(t);return t=Math.abs(t),(t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4))*e}const ie=(t,e,n)=>{t=xt(t/255),e=xt(e/255),n=xt(n/255);const{MtxRGB2XYZ:r,MtxAdaptMa:o,MtxAdaptMaI:s,Xn:c,Yn:f,Zn:a,As:l,Bs:h,Cs:d}=T;let b=t*r.m00+e*r.m10+n*r.m20,m=t*r.m01+e*r.m11+n*r.m21,M=t*r.m02+e*r.m12+n*r.m22;const R=c*o.m00+f*o.m10+a*o.m20,g=c*o.m01+f*o.m11+a*o.m21,w=c*o.m02+f*o.m12+a*o.m22;let Y=b*o.m00+m*o.m10+M*o.m20,j=b*o.m01+m*o.m11+M*o.m21,P=b*o.m02+m*o.m12+M*o.m22;return Y*=R/l,j*=g/h,P*=w/d,b=Y*s.m00+j*s.m10+P*s.m20,m=Y*s.m01+j*s.m11+P*s.m21,M=Y*s.m02+j*s.m12+P*s.m22,[b,m,M]};u.prototype.lab=function(){return Gt(this._rgb)};const We=(...t)=>new u(...t,"lab");Object.assign(L,{lab:We,getLabWhitePoint:lt,setLabWhitePoint:H});_.format.lab=zt;_.autodetect.push({p:2,test:(...t)=>{if(t=$(t,"lab"),A(t)==="array"&&t.length===3)return"lab"}});u.prototype.darken=function(t=1){const e=this,n=e.lab();return n[0]-=T.Kn*t,new u(n,"lab").alpha(e.alpha(),!0)};u.prototype.brighten=function(t=1){return this.darken(-t)};u.prototype.darker=u.prototype.darken;u.prototype.brighter=u.prototype.brighten;u.prototype.get=function(t){const[e,n]=t.split("."),r=this[e]();if(n){const o=e.indexOf(n)-(e.substr(0,2)==="ok"?2:0);if(o>-1)return r[o];throw new Error(`unknown channel ${n} in mode ${e}`)}else return r};const{pow:He}=Math,De=1e-7,Fe=20;u.prototype.luminance=function(t,e="rgb"){if(t!==void 0&&A(t)==="number"){if(t===0)return new u([0,0,0,this._rgb[3]],"rgb");if(t===1)return new u([255,255,255,this._rgb[3]],"rgb");let n=this.luminance(),r=Fe;const o=(c,f)=>{const a=c.interpolate(f,.5,e),l=a.luminance();return Math.abs(t-l)<De||!r--?a:l>t?o(c,a):o(a,f)},s=(n>t?o(new u([0,0,0]),this):o(this,new u([255,255,255]))).rgb();return new u([...s,this._rgb[3]])}return Ue(...this._rgb.slice(0,3))};const Ue=(t,e,n)=>(t=At(t),e=At(e),n=At(n),.2126*t+.7152*e+.0722*n),At=t=>(t/=255,t<=.03928?t/12.92:He((t+.055)/1.055,2.4)),z={},rt=(t,e,n=.5,...r)=>{let o=r[0]||"lrgb";if(!z[o]&&!r.length&&(o=Object.keys(z)[0]),!z[o])throw new Error(`interpolation mode ${o} is not defined`);return A(t)!=="object"&&(t=new u(t)),A(e)!=="object"&&(e=new u(e)),z[o](t,e,n).alpha(t.alpha()+n*(e.alpha()-t.alpha()))};u.prototype.mix=u.prototype.interpolate=function(t,e=.5,...n){return rt(this,t,e,...n)};u.prototype.premultiply=function(t=!1){const e=this._rgb,n=e[3];return t?(this._rgb=[e[0]*n,e[1]*n,e[2]*n,n],this):new u([e[0]*n,e[1]*n,e[2]*n,n],"rgb")};const{sin:Ve,cos:Je}=Math,ue=(...t)=>{let[e,n,r]=$(t,"lch");return isNaN(r)&&(r=0),r=r*Be,[e,Je(r)*n,Ve(r)*n]},Bt=(...t)=>{t=$(t,"lch");const[e,n,r]=t,[o,s,c]=ue(e,n,r),[f,a,l]=zt(o,s,c);return[f,a,l,t.length>3?t[3]:1]},Qe=(...t)=>{const e=se($(t,"hcl"));return Bt(...e)},{sqrt:tn,atan2:en,round:nn}=Math,be=(...t)=>{const[e,n,r]=$(t,"lab"),o=tn(n*n+r*r);let s=(en(r,n)*Se+360)%360;return nn(o*1e4)===0&&(s=Number.NaN),[e,o,s]},St=(...t)=>{const[e,n,r,...o]=$(t,"rgb"),[s,c,f]=Gt(e,n,r),[a,l,h]=be(s,c,f);return[a,l,h,...o.length>0&&o[0]<1?[o[0]]:[]]};u.prototype.lch=function(){return St(this._rgb)};u.prototype.hcl=function(){return se(St(this._rgb))};const rn=(...t)=>new u(...t,"lch"),on=(...t)=>new u(...t,"hcl");Object.assign(L,{lch:rn,hcl:on});_.format.lch=Bt;_.format.hcl=Qe;["lch","hcl"].forEach(t=>_.autodetect.push({p:2,test:(...e)=>{if(e=$(e,t),A(e)==="array"&&e.length===3)return t}}));u.prototype.saturate=function(t=1){const e=this,n=e.lch();return n[1]+=T.Kn*t,n[1]<0&&(n[1]=0),new u(n,"lch").alpha(e.alpha(),!0)};u.prototype.desaturate=function(t=1){return this.saturate(-t)};u.prototype.set=function(t,e,n=!1){const[r,o]=t.split("."),s=this[r]();if(o){const c=r.indexOf(o)-(r.substr(0,2)==="ok"?2:0);if(c>-1){if(A(e)=="string")switch(e.charAt(0)){case"+":s[c]+=+e;break;case"-":s[c]+=+e;break;case"*":s[c]*=+e.substr(1);break;case"/":s[c]/=+e.substr(1);break;default:s[c]=+e}else if(A(e)==="number")s[c]=e;else throw new Error("unsupported value for Color.set");const f=new u(s,r);return n?(this._rgb=f._rgb,this):f}throw new Error(`unknown channel ${o} in mode ${r}`)}else return s};u.prototype.tint=function(t=.5,...e){return rt(this,"white",t,...e)};u.prototype.shade=function(t=.5,...e){return rt(this,"black",t,...e)};const cn=(t,e,n)=>{const r=t._rgb,o=e._rgb;return new u(r[0]+n*(o[0]-r[0]),r[1]+n*(o[1]-r[1]),r[2]+n*(o[2]-r[2]),"rgb")};z.rgb=cn;const{sqrt:Lt,pow:Q}=Math,sn=(t,e,n)=>{const[r,o,s]=t._rgb,[c,f,a]=e._rgb;return new u(Lt(Q(r,2)*(1-n)+Q(c,2)*n),Lt(Q(o,2)*(1-n)+Q(f,2)*n),Lt(Q(s,2)*(1-n)+Q(a,2)*n),"rgb")};z.lrgb=sn;const fn=(t,e,n)=>{const r=t.lab(),o=e.lab();return new u(r[0]+n*(o[0]-r[0]),r[1]+n*(o[1]-r[1]),r[2]+n*(o[2]-r[2]),"lab")};z.lab=fn;const ct=(t,e,n,r)=>{let o,s;r==="hsl"?(o=t.hsl(),s=e.hsl()):r==="hsv"?(o=t.hsv(),s=e.hsv()):r==="hcg"?(o=t.hcg(),s=e.hcg()):r==="hsi"?(o=t.hsi(),s=e.hsi()):r==="lch"||r==="hcl"?(r="hcl",o=t.hcl(),s=e.hcl()):r==="oklch"&&(o=t.oklch().reverse(),s=e.oklch().reverse());let c,f,a,l,h,d;(r.substr(0,1)==="h"||r==="oklch")&&([c,a,h]=o,[f,l,d]=s);let b,m,M,R;return!isNaN(c)&&!isNaN(f)?(f>c&&f-c>180?R=f-(c+360):f<c&&c-f>180?R=f+360-c:R=f-c,m=c+n*R):isNaN(c)?isNaN(f)?m=Number.NaN:(m=f,(h==1||h==0)&&r!="hsv"&&(b=l)):(m=c,(d==1||d==0)&&r!="hsv"&&(b=a)),b===void 0&&(b=a+n*(l-a)),M=h+n*(d-h),r==="oklch"?new u([M,b,m],r):new u([m,b,M],r)},he=(t,e,n)=>ct(t,e,n,"lch");z.lch=he;z.hcl=he;const an=t=>{if(A(t)=="number"&&t>=0&&t<=16777215){const e=t>>16,n=t>>8&255,r=t&255;return[e,n,r,1]}throw new Error("unknown num color: "+t)},ln=(...t)=>{const[e,n,r]=$(t,"rgb");return(e<<16)+(n<<8)+r};u.prototype.num=function(){return ln(this._rgb)};const un=(...t)=>new u(...t,"num");Object.assign(L,{num:un});_.format.num=an;_.autodetect.push({p:5,test:(...t)=>{if(t.length===1&&A(t[0])==="number"&&t[0]>=0&&t[0]<=16777215)return"num"}});const bn=(t,e,n)=>{const r=t.num(),o=e.num();return new u(r+n*(o-r),"num")};z.num=bn;const{floor:hn}=Math,dn=(...t)=>{t=$(t,"hcg");let[e,n,r]=t,o,s,c;r=r*255;const f=n*255;if(n===0)o=s=c=r;else{e===360&&(e=0),e>360&&(e-=360),e<0&&(e+=360),e/=60;const a=hn(e),l=e-a,h=r*(1-n),d=h+f*(1-l),b=h+f*l,m=h+f;switch(a){case 0:[o,s,c]=[m,b,h];break;case 1:[o,s,c]=[d,m,h];break;case 2:[o,s,c]=[h,m,b];break;case 3:[o,s,c]=[h,d,m];break;case 4:[o,s,c]=[b,h,m];break;case 5:[o,s,c]=[m,h,d];break}}return[o,s,c,t.length>3?t[3]:1]},pn=(...t)=>{const[e,n,r]=$(t,"rgb"),o=oe(e,n,r),s=ce(e,n,r),c=s-o,f=c*100/255,a=o/(255-c)*100;let l;return c===0?l=Number.NaN:(e===s&&(l=(n-r)/c),n===s&&(l=2+(r-e)/c),r===s&&(l=4+(e-n)/c),l*=60,l<0&&(l+=360)),[l,f,a]};u.prototype.hcg=function(){return pn(this._rgb)};const mn=(...t)=>new u(...t,"hcg");L.hcg=mn;_.format.hcg=dn;_.autodetect.push({p:1,test:(...t)=>{if(t=$(t,"hcg"),A(t)==="array"&&t.length===3)return"hcg"}});const gn=(t,e,n)=>ct(t,e,n,"hcg");z.hcg=gn;const{cos:tt}=Math,wn=(...t)=>{t=$(t,"hsi");let[e,n,r]=t,o,s,c;return isNaN(e)&&(e=0),isNaN(n)&&(n=0),e>360&&(e-=360),e<0&&(e+=360),e/=360,e<1/3?(c=(1-n)/3,o=(1+n*tt(W*e)/tt(Mt-W*e))/3,s=1-(c+o)):e<2/3?(e-=1/3,o=(1-n)/3,s=(1+n*tt(W*e)/tt(Mt-W*e))/3,c=1-(o+s)):(e-=2/3,s=(1-n)/3,c=(1+n*tt(W*e)/tt(Mt-W*e))/3,o=1-(s+c)),o=J(r*o*3),s=J(r*s*3),c=J(r*c*3),[o*255,s*255,c*255,t.length>3?t[3]:1]},{min:yn,sqrt:kn,acos:_n}=Math,Mn=(...t)=>{let[e,n,r]=$(t,"rgb");e/=255,n/=255,r/=255;let o;const s=yn(e,n,r),c=(e+n+r)/3,f=c>0?1-s/c:0;return f===0?o=NaN:(o=(e-n+(e-r))/2,o/=kn((e-n)*(e-n)+(e-r)*(n-r)),o=_n(o),r>n&&(o=W-o),o/=W),[o*360,f,c]};u.prototype.hsi=function(){return Mn(this._rgb)};const $n=(...t)=>new u(...t,"hsi");L.hsi=$n;_.format.hsi=wn;_.autodetect.push({p:2,test:(...t)=>{if(t=$(t,"hsi"),A(t)==="array"&&t.length===3)return"hsi"}});const xn=(t,e,n)=>ct(t,e,n,"hsi");z.hsi=xn;const Pt=(...t)=>{t=$(t,"hsl");const[e,n,r]=t;let o,s,c;if(n===0)o=s=c=r*255;else{const f=[0,0,0],a=[0,0,0],l=r<.5?r*(1+n):r+n-r*n,h=2*r-l,d=e/360;f[0]=d+1/3,f[1]=d,f[2]=d-1/3;for(let b=0;b<3;b++)f[b]<0&&(f[b]+=1),f[b]>1&&(f[b]-=1),6*f[b]<1?a[b]=h+(l-h)*6*f[b]:2*f[b]<1?a[b]=l:3*f[b]<2?a[b]=h+(l-h)*(2/3-f[b])*6:a[b]=h;[o,s,c]=[a[0]*255,a[1]*255,a[2]*255]}return t.length>3?[o,s,c,t[3]]:[o,s,c,1]},de=(...t)=>{t=$(t,"rgba");let[e,n,r]=t;e/=255,n/=255,r/=255;const o=oe(e,n,r),s=ce(e,n,r),c=(s+o)/2;let f,a;return s===o?(f=0,a=Number.NaN):f=c<.5?(s-o)/(s+o):(s-o)/(2-s-o),e==s?a=(n-r)/(s-o):n==s?a=2+(r-e)/(s-o):r==s&&(a=4+(e-n)/(s-o)),a*=60,a<0&&(a+=360),t.length>3&&t[3]!==void 0?[a,f,c,t[3]]:[a,f,c]};u.prototype.hsl=function(){return de(this._rgb)};const An=(...t)=>new u(...t,"hsl");L.hsl=An;_.format.hsl=Pt;_.autodetect.push({p:2,test:(...t)=>{if(t=$(t,"hsl"),A(t)==="array"&&t.length===3)return"hsl"}});const Ln=(t,e,n)=>ct(t,e,n,"hsl");z.hsl=Ln;const{floor:En}=Math,Rn=(...t)=>{t=$(t,"hsv");let[e,n,r]=t,o,s,c;if(r*=255,n===0)o=s=c=r;else{e===360&&(e=0),e>360&&(e-=360),e<0&&(e+=360),e/=60;const f=En(e),a=e-f,l=r*(1-n),h=r*(1-n*a),d=r*(1-n*(1-a));switch(f){case 0:[o,s,c]=[r,d,l];break;case 1:[o,s,c]=[h,r,l];break;case 2:[o,s,c]=[l,r,d];break;case 3:[o,s,c]=[l,h,r];break;case 4:[o,s,c]=[d,l,r];break;case 5:[o,s,c]=[r,l,h];break}}return[o,s,c,t.length>3?t[3]:1]},{min:Nn,max:jn}=Math,vn=(...t)=>{t=$(t,"rgb");let[e,n,r]=t;const o=Nn(e,n,r),s=jn(e,n,r),c=s-o;let f,a,l;return l=s/255,s===0?(f=Number.NaN,a=0):(a=c/s,e===s&&(f=(n-r)/c),n===s&&(f=2+(r-e)/c),r===s&&(f=4+(e-n)/c),f*=60,f<0&&(f+=360)),[f,a,l]};u.prototype.hsv=function(){return vn(this._rgb)};const Cn=(...t)=>new u(...t,"hsv");L.hsv=Cn;_.format.hsv=Rn;_.autodetect.push({p:2,test:(...t)=>{if(t=$(t,"hsv"),A(t)==="array"&&t.length===3)return"hsv"}});const Pn=(t,e,n)=>ct(t,e,n,"hsv");z.hsv=Pn;function mt(t,e){let n=t.length;Array.isArray(t[0])||(t=[t]),Array.isArray(e[0])||(e=e.map(c=>[c]));let r=e[0].length,o=e[0].map((c,f)=>e.map(a=>a[f])),s=t.map(c=>o.map(f=>Array.isArray(c)?c.reduce((a,l,h)=>a+l*(f[h]||0),0):f.reduce((a,l)=>a+l*c,0)));return n===1&&(s=s[0]),r===1?s.map(c=>c[0]):s}const Xt=(...t)=>{t=$(t,"lab");const[e,n,r,...o]=t,[s,c,f]=On([e,n,r]),[a,l,h]=le(s,c,f);return[a,l,h,...o.length>0&&o[0]<1?[o[0]]:[]]};function On(t){var e=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],n=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]],r=mt(n,t);return mt(e,r.map(o=>o**3))}const qt=(...t)=>{const[e,n,r,...o]=$(t,"rgb"),s=ie(e,n,r);return[...Yn(s),...o.length>0&&o[0]<1?[o[0]]:[]]};function Yn(t){const e=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],n=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],r=mt(e,t);return mt(n,r.map(o=>Math.cbrt(o)))}u.prototype.oklab=function(){return qt(this._rgb)};const zn=(...t)=>new u(...t,"oklab");Object.assign(L,{oklab:zn});_.format.oklab=Xt;_.autodetect.push({p:2,test:(...t)=>{if(t=$(t,"oklab"),A(t)==="array"&&t.length===3)return"oklab"}});const Gn=(t,e,n)=>{const r=t.oklab(),o=e.oklab();return new u(r[0]+n*(o[0]-r[0]),r[1]+n*(o[1]-r[1]),r[2]+n*(o[2]-r[2]),"oklab")};z.oklab=Gn;const Bn=(t,e,n)=>ct(t,e,n,"oklch");z.oklch=Bn;const{pow:Et,sqrt:Rt,PI:Nt,cos:Tt,sin:Kt,atan2:Sn}=Math,Xn=(t,e="lrgb",n=null)=>{const r=t.length;n||(n=Array.from(new Array(r)).map(()=>1));const o=r/n.reduce(function(d,b){return d+b});if(n.forEach((d,b)=>{n[b]*=o}),t=t.map(d=>new u(d)),e==="lrgb")return qn(t,n);const s=t.shift(),c=s.get(e),f=[];let a=0,l=0;for(let d=0;d<c.length;d++)if(c[d]=(c[d]||0)*n[0],f.push(isNaN(c[d])?0:n[0]),e.charAt(d)==="h"&&!isNaN(c[d])){const b=c[d]/180*Nt;a+=Tt(b)*n[0],l+=Kt(b)*n[0]}let h=s.alpha()*n[0];t.forEach((d,b)=>{const m=d.get(e);h+=d.alpha()*n[b+1];for(let M=0;M<c.length;M++)if(!isNaN(m[M]))if(f[M]+=n[b+1],e.charAt(M)==="h"){const R=m[M]/180*Nt;a+=Tt(R)*n[b+1],l+=Kt(R)*n[b+1]}else c[M]+=m[M]*n[b+1]});for(let d=0;d<c.length;d++)if(e.charAt(d)==="h"){let b=Sn(l/f[d],a/f[d])/Nt*180;for(;b<0;)b+=360;for(;b>=360;)b-=360;c[d]=b}else c[d]=c[d]/f[d];return h/=r,new u(c,e).alpha(h>.99999?1:h,!0)},qn=(t,e)=>{const n=t.length,r=[0,0,0,0];for(let o=0;o<t.length;o++){const s=t[o],c=e[o]/n,f=s._rgb;r[0]+=Et(f[0],2)*c,r[1]+=Et(f[1],2)*c,r[2]+=Et(f[2],2)*c,r[3]+=f[3]*c}return r[0]=Rt(r[0]),r[1]=Rt(r[1]),r[2]=Rt(r[2]),r[3]>.9999999&&(r[3]=1),new u(Yt(r))},{pow:Zn}=Math;function gt(t){let e="rgb",n=L("#ccc"),r=0,o=[0,1],s=[0,1],c=[],f=[0,0],a=!1,l=[],h=!1,d=0,b=1,m=!1,M={},R=!0,g=1;const w=function(i){if(i=i||["#fff","#000"],i&&A(i)==="string"&&L.brewer&&L.brewer[i.toLowerCase()]&&(i=L.brewer[i.toLowerCase()]),A(i)==="array"){i.length===1&&(i=[i[0],i[0]]),i=i.slice(0);for(let p=0;p<i.length;p++)i[p]=L(i[p]);c.length=0;for(let p=0;p<i.length;p++)c.push(p/(i.length-1))}return S(),l=i},Y=function(i){if(a!=null){const p=a.length-1;let x=0;for(;x<p&&i>=a[x];)x++;return x-1}return 0};let j=i=>i,P=i=>i;const O=function(i,p){let x,y;if(p==null&&(p=!1),isNaN(i)||i===null)return n;p?y=i:a&&a.length>2?y=Y(i)/(a.length-2):b!==d?y=(i-d)/(b-d):y=1,y=P(y),p||(y=j(y)),g!==1&&(y=Zn(y,g)),y=f[0]+y*(1-f[0]-f[1]),y=J(y,0,1);const N=Math.floor(y*1e4);if(R&&M[N])x=M[N];else{if(A(l)==="array")for(let k=0;k<c.length;k++){const G=c[k];if(y<=G){x=l[k];break}if(y>=G&&k===c.length-1){x=l[k];break}if(y>G&&y<c[k+1]){y=(y-G)/(c[k+1]-G),x=L.interpolate(l[k],l[k+1],y,e);break}}else A(l)==="function"&&(x=l(y));R&&(M[N]=x)}return x};var S=()=>M={};w(t);const E=function(i){const p=L(O(i));return h&&p[h]?p[h]():p};return E.classes=function(i){if(i!=null){if(A(i)==="array")a=i,o=[i[0],i[i.length-1]];else{const p=L.analyze(o);i===0?a=[p.min,p.max]:a=L.limits(p,"e",i)}return E}return a},E.domain=function(i){if(!arguments.length)return s;s=i.slice(0),d=i[0],b=i[i.length-1],c=[];const p=l.length;if(i.length===p&&d!==b)for(let x of Array.from(i))c.push((x-d)/(b-d));else{for(let x=0;x<p;x++)c.push(x/(p-1));if(i.length>2){const x=i.map((N,k)=>k/(i.length-1)),y=i.map(N=>(N-d)/(b-d));y.every((N,k)=>x[k]===N)||(P=N=>{if(N<=0||N>=1)return N;let k=0;for(;N>=y[k+1];)k++;const G=(N-y[k])/(y[k+1]-y[k]);return x[k]+G*(x[k+1]-x[k])})}}return o=[d,b],E},E.mode=function(i){return arguments.length?(e=i,S(),E):e},E.range=function(i,p){return w(i),E},E.out=function(i){return h=i,E},E.spread=function(i){return arguments.length?(r=i,E):r},E.correctLightness=function(i){return i==null&&(i=!0),m=i,S(),m?j=function(p){const x=O(0,!0).lab()[0],y=O(1,!0).lab()[0],N=x>y;let k=O(p,!0).lab()[0];const G=x+(y-x)*p;let F=k-G,it=0,at=1,ut=20;for(;Math.abs(F)>.01&&ut-- >0;)(function(){return N&&(F*=-1),F<0?(it=p,p+=(at-p)*.5):(at=p,p+=(it-p)*.5),k=O(p,!0).lab()[0],F=k-G})();return p}:j=p=>p,E},E.padding=function(i){return i!=null?(A(i)==="number"&&(i=[i,i]),f=i,E):f},E.colors=function(i,p){arguments.length<2&&(p="hex");let x=[];if(arguments.length===0)x=l.slice(0);else if(i===1)x=[E(.5)];else if(i>1){const y=o[0],N=o[1]-y;x=In(0,i).map(k=>E(y+k/(i-1)*N))}else{t=[];let y=[];if(a&&a.length>2)for(let N=1,k=a.length,G=1<=k;G?N<k:N>k;G?N++:N--)y.push((a[N-1]+a[N])*.5);else y=o;x=y.map(N=>E(N))}return L[p]&&(x=x.map(y=>y[p]())),x},E.cache=function(i){return i!=null?(R=i,E):R},E.gamma=function(i){return i!=null?(g=i,E):g},E.nodata=function(i){return i!=null?(n=L(i),E):n},E}function In(t,e,n){let r=[],o=t<e,s=e;for(let c=t;o?c<s:c>s;o?c++:c--)r.push(c);return r}const Tn=function(t){let e=[1,1];for(let n=1;n<t;n++){let r=[1];for(let o=1;o<=e.length;o++)r[o]=(e[o]||0)+e[o-1];e=r}return e},Kn=function(t){let e,n,r,o;if(t=t.map(s=>new u(s)),t.length===2)[n,r]=t.map(s=>s.lab()),e=function(s){const c=[0,1,2].map(f=>n[f]+s*(r[f]-n[f]));return new u(c,"lab")};else if(t.length===3)[n,r,o]=t.map(s=>s.lab()),e=function(s){const c=[0,1,2].map(f=>(1-s)*(1-s)*n[f]+2*(1-s)*s*r[f]+s*s*o[f]);return new u(c,"lab")};else if(t.length===4){let s;[n,r,o,s]=t.map(c=>c.lab()),e=function(c){const f=[0,1,2].map(a=>(1-c)*(1-c)*(1-c)*n[a]+3*(1-c)*(1-c)*c*r[a]+3*(1-c)*c*c*o[a]+c*c*c*s[a]);return new u(f,"lab")}}else if(t.length>=5){let s,c,f;s=t.map(a=>a.lab()),f=t.length-1,c=Tn(f),e=function(a){const l=1-a,h=[0,1,2].map(d=>s.reduce((b,m,M)=>b+c[M]*l**(f-M)*a**M*m[d],0));return new u(h,"lab")}}else throw new RangeError("No point in running bezier with only one color.");return e},Wn=t=>{const e=Kn(t);return e.scale=()=>gt(e),e},{round:pe}=Math;u.prototype.rgb=function(t=!0){return t===!1?this._rgb.slice(0,3):this._rgb.slice(0,3).map(pe)};u.prototype.rgba=function(t=!0){return this._rgb.slice(0,4).map((e,n)=>n<3?t===!1?e:pe(e):e)};const Hn=(...t)=>new u(...t,"rgb");Object.assign(L,{rgb:Hn});_.format.rgb=(...t)=>{const e=$(t,"rgba");return e[3]===void 0&&(e[3]=1),e};_.autodetect.push({p:3,test:(...t)=>{if(t=$(t,"rgba"),A(t)==="array"&&(t.length===3||t.length===4&&A(t[3])=="number"&&t[3]>=0&&t[3]<=1))return"rgb"}});const I=(t,e,n)=>{if(!I[n])throw new Error("unknown blend mode "+n);return I[n](t,e)},U=t=>(e,n)=>{const r=L(n).rgb(),o=L(e).rgb();return L.rgb(t(r,o))},V=t=>(e,n)=>{const r=[];return r[0]=t(e[0],n[0]),r[1]=t(e[1],n[1]),r[2]=t(e[2],n[2]),r},Dn=t=>t,Fn=(t,e)=>t*e/255,Un=(t,e)=>t>e?e:t,Vn=(t,e)=>t>e?t:e,Jn=(t,e)=>255*(1-(1-t/255)*(1-e/255)),Qn=(t,e)=>e<128?2*t*e/255:255*(1-2*(1-t/255)*(1-e/255)),t0=(t,e)=>255*(1-(1-e/255)/(t/255)),e0=(t,e)=>t===255?255:(t=255*(e/255)/(1-t/255),t>255?255:t);I.normal=U(V(Dn));I.multiply=U(V(Fn));I.screen=U(V(Jn));I.overlay=U(V(Qn));I.darken=U(V(Un));I.lighten=U(V(Vn));I.dodge=U(V(e0));I.burn=U(V(t0));const{pow:n0,sin:r0,cos:o0}=Math;function c0(t=300,e=-1.5,n=1,r=1,o=[0,1]){let s=0,c;A(o)==="array"?c=o[1]-o[0]:(c=0,o=[o,o]);const f=function(a){const l=W*((t+120)/360+e*a),h=n0(o[0]+c*a,r),b=(s!==0?n[0]+a*s:n)*h*(1-h)/2,m=o0(l),M=r0(l),R=h+b*(-.14861*m+1.78277*M),g=h+b*(-.29227*m-.90649*M),w=h+b*(1.97294*m);return L(Yt([R*255,g*255,w*255,1]))};return f.start=function(a){return a==null?t:(t=a,f)},f.rotations=function(a){return a==null?e:(e=a,f)},f.gamma=function(a){return a==null?r:(r=a,f)},f.hue=function(a){return a==null?n:(n=a,A(n)==="array"?(s=n[1]-n[0],s===0&&(n=n[1])):s=0,f)},f.lightness=function(a){return a==null?o:(A(a)==="array"?(o=a,c=a[1]-a[0]):(o=[a,a],c=0),f)},f.scale=()=>L.scale(f),f.hue(n),f}const s0="0123456789abcdef",{floor:f0,random:a0}=Math,l0=(t=a0)=>{let e="#";for(let n=0;n<6;n++)e+=s0.charAt(f0(t()*16));return new u(e,"hex")},{log:Wt,pow:i0,floor:u0,abs:b0}=Math;function me(t,e=null){const n={min:Number.MAX_VALUE,max:Number.MAX_VALUE*-1,sum:0,values:[],count:0};return A(t)==="object"&&(t=Object.values(t)),t.forEach(r=>{e&&A(r)==="object"&&(r=r[e]),r!=null&&!isNaN(r)&&(n.values.push(r),n.sum+=r,r<n.min&&(n.min=r),r>n.max&&(n.max=r),n.count+=1)}),n.domain=[n.min,n.max],n.limits=(r,o)=>ge(n,r,o),n}function ge(t,e="equal",n=7){A(t)=="array"&&(t=me(t));const{min:r,max:o}=t,s=t.values.sort((f,a)=>f-a);if(n===1)return[r,o];const c=[];if(e.substr(0,1)==="c"&&(c.push(r),c.push(o)),e.substr(0,1)==="e"){c.push(r);for(let f=1;f<n;f++)c.push(r+f/n*(o-r));c.push(o)}else if(e.substr(0,1)==="l"){if(r<=0)throw new Error("Logarithmic scales are only possible for values > 0");const f=Math.LOG10E*Wt(r),a=Math.LOG10E*Wt(o);c.push(r);for(let l=1;l<n;l++)c.push(i0(10,f+l/n*(a-f)));c.push(o)}else if(e.substr(0,1)==="q"){c.push(r);for(let f=1;f<n;f++){const a=(s.length-1)*f/n,l=u0(a);if(l===a)c.push(s[l]);else{const h=a-l;c.push(s[l]*(1-h)+s[l+1]*h)}}c.push(o)}else if(e.substr(0,1)==="k"){let f;const a=s.length,l=new Array(a),h=new Array(n);let d=!0,b=0,m=null;m=[],m.push(r);for(let g=1;g<n;g++)m.push(r+g/n*(o-r));for(m.push(o);d;){for(let w=0;w<n;w++)h[w]=0;for(let w=0;w<a;w++){const Y=s[w];let j=Number.MAX_VALUE,P;for(let O=0;O<n;O++){const S=b0(m[O]-Y);S<j&&(j=S,P=O),h[P]++,l[w]=P}}const g=new Array(n);for(let w=0;w<n;w++)g[w]=null;for(let w=0;w<a;w++)f=l[w],g[f]===null?g[f]=s[w]:g[f]+=s[w];for(let w=0;w<n;w++)g[w]*=1/h[w];d=!1;for(let w=0;w<n;w++)if(g[w]!==m[w]){d=!0;break}m=g,b++,b>200&&(d=!1)}const M={};for(let g=0;g<n;g++)M[g]=[];for(let g=0;g<a;g++)f=l[g],M[f].push(s[g]);let R=[];for(let g=0;g<n;g++)R.push(M[g][0]),R.push(M[g][M[g].length-1]);R=R.sort((g,w)=>g-w),c.push(R[0]);for(let g=1;g<R.length;g+=2){const w=R[g];!isNaN(w)&&c.indexOf(w)===-1&&c.push(w)}}return c}const h0=(t,e)=>{t=new u(t),e=new u(e);const n=t.luminance(),r=e.luminance();return n>r?(n+.05)/(r+.05):(r+.05)/(n+.05)};const Ht=.027,d0=5e-4,p0=.1,Dt=1.14,ht=.022,Ft=1.414,m0=(t,e)=>{t=new u(t),e=new u(e),t.alpha()<1&&(t=rt(e,t,t.alpha(),"rgb"));const n=Ut(...t.rgb()),r=Ut(...e.rgb()),o=n>=ht?n:n+Math.pow(ht-n,Ft),s=r>=ht?r:r+Math.pow(ht-r,Ft),c=Math.pow(s,.56)-Math.pow(o,.57),f=Math.pow(s,.65)-Math.pow(o,.62),a=Math.abs(s-o)<d0?0:o<s?c*Dt:f*Dt;return(Math.abs(a)<p0?0:a>0?a-Ht:a+Ht)*100};function Ut(t,e,n){return .2126729*Math.pow(t/255,2.4)+.7151522*Math.pow(e/255,2.4)+.072175*Math.pow(n/255,2.4)}const{sqrt:K,pow:v,min:g0,max:w0,atan2:Vt,abs:Jt,cos:dt,sin:Qt,exp:y0,PI:te}=Math;function k0(t,e,n=1,r=1,o=1){var s=function(_t){return 360*_t/(2*te)},c=function(_t){return 2*te*_t/360};t=new u(t),e=new u(e);const[f,a,l]=Array.from(t.lab()),[h,d,b]=Array.from(e.lab()),m=(f+h)/2,M=K(v(a,2)+v(l,2)),R=K(v(d,2)+v(b,2)),g=(M+R)/2,w=.5*(1-K(v(g,7)/(v(g,7)+v(25,7)))),Y=a*(1+w),j=d*(1+w),P=K(v(Y,2)+v(l,2)),O=K(v(j,2)+v(b,2)),S=(P+O)/2,E=s(Vt(l,Y)),i=s(Vt(b,j)),p=E>=0?E:E+360,x=i>=0?i:i+360,y=Jt(p-x)>180?(p+x+360)/2:(p+x)/2,N=1-.17*dt(c(y-30))+.24*dt(c(2*y))+.32*dt(c(3*y+6))-.2*dt(c(4*y-63));let k=x-p;k=Jt(k)<=180?k:x<=p?k+360:k-360,k=2*K(P*O)*Qt(c(k)/2);const G=h-f,F=O-P,it=1+.015*v(m-50,2)/K(20+v(m-50,2)),at=1+.045*S,ut=1+.015*S*N,Pe=30*y0(-v((y-275)/25,2)),Oe=-(2*K(v(S,7)/(v(S,7)+v(25,7))))*Qt(2*c(Pe)),Ye=K(v(G/(n*it),2)+v(F/(r*at),2)+v(k/(o*ut),2)+Oe*(F/(r*at))*(k/(o*ut)));return w0(0,g0(100,Ye))}function _0(t,e,n="lab"){t=new u(t),e=new u(e);const r=t.get(n),o=e.get(n);let s=0;for(let c in r){const f=(r[c]||0)-(o[c]||0);s+=f*f}return Math.sqrt(s)}const M0=(...t)=>{try{return new u(...t),!0}catch{return!1}},$0={cool(){return gt([L.hsl(180,1,.9),L.hsl(250,.7,.4)])},hot(){return gt(["#000","#f00","#ff0","#fff"]).mode("rgb")}},Ot={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},we=Object.keys(Ot),ee=new Map(we.map(t=>[t.toLowerCase(),t])),x0=typeof Proxy=="function"?new Proxy(Ot,{get(t,e){const n=e.toLowerCase();if(ee.has(n))return t[ee.get(n)]},getOwnPropertyNames(){return Object.getOwnPropertyNames(we)}}):Ot,A0=(...t)=>{t=$(t,"cmyk");const[e,n,r,o]=t,s=t.length>4?t[4]:1;return o===1?[0,0,0,s]:[e>=1?0:255*(1-e)*(1-o),n>=1?0:255*(1-n)*(1-o),r>=1?0:255*(1-r)*(1-o),s]},{max:ne}=Math,L0=(...t)=>{let[e,n,r]=$(t,"rgb");e=e/255,n=n/255,r=r/255;const o=1-ne(e,ne(n,r)),s=o<1?1/(1-o):0,c=(1-e-o)*s,f=(1-n-o)*s,a=(1-r-o)*s;return[c,f,a,o]};u.prototype.cmyk=function(){return L0(this._rgb)};const E0=(...t)=>new u(...t,"cmyk");Object.assign(L,{cmyk:E0});_.format.cmyk=A0;_.autodetect.push({p:2,test:(...t)=>{if(t=$(t,"cmyk"),A(t)==="array"&&t.length===4)return"cmyk"}});const R0=(...t)=>{const e=$(t,"hsla");let n=ot(t)||"lsa";return e[0]=X(e[0]||0)+"deg",e[1]=X(e[1]*100)+"%",e[2]=X(e[2]*100)+"%",n==="hsla"||e.length>3&&e[3]<1?(e[3]="/ "+(e.length>3?e[3]:1),n="hsla"):e.length=3,`${n.substr(0,3)}(${e.join(" ")})`},N0=(...t)=>{const e=$(t,"lab");let n=ot(t)||"lab";return e[0]=X(e[0])+"%",e[1]=X(e[1]),e[2]=X(e[2]),n==="laba"||e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,`lab(${e.join(" ")})`},j0=(...t)=>{const e=$(t,"lch");let n=ot(t)||"lab";return e[0]=X(e[0])+"%",e[1]=X(e[1]),e[2]=isNaN(e[2])?"none":X(e[2])+"deg",n==="lcha"||e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,`lch(${e.join(" ")})`},v0=(...t)=>{const e=$(t,"lab");return e[0]=X(e[0]*100)+"%",e[1]=Ct(e[1]),e[2]=Ct(e[2]),e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,`oklab(${e.join(" ")})`},ye=(...t)=>{const[e,n,r,...o]=$(t,"rgb"),[s,c,f]=qt(e,n,r),[a,l,h]=be(s,c,f);return[a,l,h,...o.length>0&&o[0]<1?[o[0]]:[]]},C0=(...t)=>{const e=$(t,"lch");return e[0]=X(e[0]*100)+"%",e[1]=Ct(e[1]),e[2]=isNaN(e[2])?"none":X(e[2])+"deg",e.length>3&&e[3]<1?e[3]="/ "+(e.length>3?e[3]:1):e.length=3,`oklch(${e.join(" ")})`},{round:jt}=Math,P0=(...t)=>{const e=$(t,"rgba");let n=ot(t)||"rgb";if(n.substr(0,3)==="hsl")return R0(de(e),n);if(n.substr(0,3)==="lab"){const r=lt();H("d50");const o=N0(Gt(e),n);return H(r),o}if(n.substr(0,3)==="lch"){const r=lt();H("d50");const o=j0(St(e),n);return H(r),o}return n.substr(0,5)==="oklab"?v0(qt(e)):n.substr(0,5)==="oklch"?C0(ye(e)):(e[0]=jt(e[0]),e[1]=jt(e[1]),e[2]=jt(e[2]),(n==="rgba"||e.length>3&&e[3]<1)&&(e[3]="/ "+(e.length>3?e[3]:1),n="rgba"),`${n.substr(0,3)}(${e.slice(0,n==="rgb"?3:4).join(" ")})`)},ke=(...t)=>{t=$(t,"lch");const[e,n,r,...o]=t,[s,c,f]=ue(e,n,r),[a,l,h]=Xt(s,c,f);return[a,l,h,...o.length>0&&o[0]<1?[o[0]]:[]]},D=/((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source,Z=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source,wt=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source,q=/\s*/.source,st=/\s+/.source,Zt=/\s*,\s*/.source,kt=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source,ft=/\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source,_e=new RegExp("^rgba?\\("+q+[D,D,D].join(st)+ft+"\\)$"),Me=new RegExp("^rgb\\("+q+[D,D,D].join(Zt)+q+"\\)$"),$e=new RegExp("^rgba\\("+q+[D,D,D,Z].join(Zt)+q+"\\)$"),xe=new RegExp("^hsla?\\("+q+[kt,wt,wt].join(st)+ft+"\\)$"),Ae=new RegExp("^hsl?\\("+q+[kt,wt,wt].join(Zt)+q+"\\)$"),Le=/^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,Ee=new RegExp("^lab\\("+q+[Z,Z,Z].join(st)+ft+"\\)$"),Re=new RegExp("^lch\\("+q+[Z,Z,kt].join(st)+ft+"\\)$"),Ne=new RegExp("^oklab\\("+q+[Z,Z,Z].join(st)+ft+"\\)$"),je=new RegExp("^oklch\\("+q+[Z,Z,kt].join(st)+ft+"\\)$"),{round:ve}=Math,et=t=>t.map((e,n)=>n<=2?J(ve(e),0,255):e),C=(t,e=0,n=100,r=!1)=>(typeof t=="string"&&t.endsWith("%")&&(t=parseFloat(t.substring(0,t.length-1))/100,r?t=e+(t+1)*.5*(n-e):t=e+t*(n-e)),+t),B=(t,e)=>t==="none"?e:t,It=t=>{if(t=t.toLowerCase().trim(),t==="transparent")return[0,0,0,0];let e;if(_.format.named)try{return _.format.named(t)}catch{}if((e=t.match(_e))||(e=t.match(Me))){let n=e.slice(1,4);for(let o=0;o<3;o++)n[o]=+C(B(n[o],0),0,255);n=et(n);const r=e[4]!==void 0?+C(e[4],0,1):1;return n[3]=r,n}if(e=t.match($e)){const n=e.slice(1,5);for(let r=0;r<4;r++)n[r]=+C(n[r],0,255);return n}if((e=t.match(xe))||(e=t.match(Ae))){const n=e.slice(1,4);n[0]=+B(n[0].replace("deg",""),0),n[1]=+C(B(n[1],0),0,100)*.01,n[2]=+C(B(n[2],0),0,100)*.01;const r=et(Pt(n)),o=e[4]!==void 0?+C(e[4],0,1):1;return r[3]=o,r}if(e=t.match(Le)){const n=e.slice(1,4);n[1]*=.01,n[2]*=.01;const r=Pt(n);for(let o=0;o<3;o++)r[o]=ve(r[o]);return r[3]=+e[4],r}if(e=t.match(Ee)){const n=e.slice(1,4);n[0]=C(B(n[0],0),0,100),n[1]=C(B(n[1],0),-125,125,!0),n[2]=C(B(n[2],0),-125,125,!0);const r=lt();H("d50");const o=et(zt(n));H(r);const s=e[4]!==void 0?+C(e[4],0,1):1;return o[3]=s,o}if(e=t.match(Re)){const n=e.slice(1,4);n[0]=C(n[0],0,100),n[1]=C(B(n[1],0),0,150,!1),n[2]=+B(n[2].replace("deg",""),0);const r=lt();H("d50");const o=et(Bt(n));H(r);const s=e[4]!==void 0?+C(e[4],0,1):1;return o[3]=s,o}if(e=t.match(Ne)){const n=e.slice(1,4);n[0]=C(B(n[0],0),0,1),n[1]=C(B(n[1],0),-.4,.4,!0),n[2]=C(B(n[2],0),-.4,.4,!0);const r=et(Xt(n)),o=e[4]!==void 0?+C(e[4],0,1):1;return r[3]=o,r}if(e=t.match(je)){const n=e.slice(1,4);n[0]=C(B(n[0],0),0,1),n[1]=C(B(n[1],0),0,.4,!1),n[2]=+B(n[2].replace("deg",""),0);const r=et(ke(n)),o=e[4]!==void 0?+C(e[4],0,1):1;return r[3]=o,r}};It.test=t=>_e.test(t)||xe.test(t)||Ee.test(t)||Re.test(t)||Ne.test(t)||je.test(t)||Me.test(t)||$e.test(t)||Ae.test(t)||Le.test(t)||t==="transparent";u.prototype.css=function(t){return P0(this._rgb,t)};const O0=(...t)=>new u(...t,"css");L.css=O0;_.format.css=It;_.autodetect.push({p:5,test:(t,...e)=>{if(!e.length&&A(t)==="string"&&It.test(t))return"css"}});_.format.gl=(...t)=>{const e=$(t,"rgba");return e[0]*=255,e[1]*=255,e[2]*=255,e};const Y0=(...t)=>new u(...t,"gl");L.gl=Y0;u.prototype.gl=function(){const t=this._rgb;return[t[0]/255,t[1]/255,t[2]/255,t[3]]};u.prototype.hex=function(t){return ae(this._rgb,t)};const z0=(...t)=>new u(...t,"hex");L.hex=z0;_.format.hex=fe;_.autodetect.push({p:4,test:(t,...e)=>{if(!e.length&&A(t)==="string"&&[3,4,5,6,7,8,9].indexOf(t.length)>=0)return"hex"}});const{log:pt}=Math,Ce=t=>{const e=t/100;let n,r,o;return e<66?(n=255,r=e<6?0:-155.25485562709179-.44596950469579133*(r=e-2)+104.49216199393888*pt(r),o=e<20?0:-254.76935184120902+.8274096064007395*(o=e-10)+115.67994401066147*pt(o)):(n=351.97690566805693+.114206453784165*(n=e-55)-40.25366309332127*pt(n),r=325.4494125711974+.07943456536662342*(r=e-50)-28.0852963507957*pt(r),o=255),[n,r,o,1]},{round:G0}=Math,B0=(...t)=>{const e=$(t,"rgb"),n=e[0],r=e[2];let o=1e3,s=4e4;const c=.4;let f;for(;s-o>c;){f=(s+o)*.5;const a=Ce(f);a[2]/a[0]>=r/n?s=f:o=f}return G0(f)};u.prototype.temp=u.prototype.kelvin=u.prototype.temperature=function(){return B0(this._rgb)};const vt=(...t)=>new u(...t,"temp");Object.assign(L,{temp:vt,kelvin:vt,temperature:vt});_.format.temp=_.format.kelvin=_.format.temperature=Ce;u.prototype.oklch=function(){return ye(this._rgb)};const S0=(...t)=>new u(...t,"oklch");Object.assign(L,{oklch:S0});_.format.oklch=ke;_.autodetect.push({p:2,test:(...t)=>{if(t=$(t,"oklch"),A(t)==="array"&&t.length===3)return"oklch"}});Object.assign(L,{analyze:me,average:Xn,bezier:Wn,blend:I,brewer:x0,Color:u,colors:nt,contrast:h0,contrastAPCA:m0,cubehelix:c0,deltaE:k0,distance:_0,input:_,interpolate:rt,limits:ge,mix:rt,random:l0,scale:gt,scales:$0,valid:M0});module.exports = L;

    return module.exports;
  })();

  // --- TAILWIND CSS REFERENCE PALETTES ---
  const TAILWIND_PALETTES = [
  {
    "name": "Red",
    "id": "red",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fef2f2"
      },
      {
        "number": 100,
        "hexcode": "#fee2e2"
      },
      {
        "number": 200,
        "hexcode": "#fecaca"
      },
      {
        "number": 300,
        "hexcode": "#fca5a5"
      },
      {
        "number": 400,
        "hexcode": "#f87171"
      },
      {
        "number": 500,
        "hexcode": "#ef4444"
      },
      {
        "number": 600,
        "hexcode": "#dc2626"
      },
      {
        "number": 700,
        "hexcode": "#b91c1c"
      },
      {
        "number": 800,
        "hexcode": "#991b1b"
      },
      {
        "number": 900,
        "hexcode": "#7f1d1d"
      },
      {
        "number": 950,
        "hexcode": "#450a0a"
      }
    ]
  },
  {
    "name": "Orange",
    "id": "orange",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fff7ed"
      },
      {
        "number": 100,
        "hexcode": "#ffedd5"
      },
      {
        "number": 200,
        "hexcode": "#fed7aa"
      },
      {
        "number": 300,
        "hexcode": "#fdba74"
      },
      {
        "number": 400,
        "hexcode": "#fb923c"
      },
      {
        "number": 500,
        "hexcode": "#f97316"
      },
      {
        "number": 600,
        "hexcode": "#ea580c"
      },
      {
        "number": 700,
        "hexcode": "#c2410c"
      },
      {
        "number": 800,
        "hexcode": "#9a3412"
      },
      {
        "number": 900,
        "hexcode": "#7c2d12"
      },
      {
        "number": 950,
        "hexcode": "#431407"
      }
    ]
  },
  {
    "name": "Amber",
    "id": "amber",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fffbeb"
      },
      {
        "number": 100,
        "hexcode": "#fef3c7"
      },
      {
        "number": 200,
        "hexcode": "#fde68a"
      },
      {
        "number": 300,
        "hexcode": "#fcd34d"
      },
      {
        "number": 400,
        "hexcode": "#fbbf24"
      },
      {
        "number": 500,
        "hexcode": "#f59e0b"
      },
      {
        "number": 600,
        "hexcode": "#d97706"
      },
      {
        "number": 700,
        "hexcode": "#b45309"
      },
      {
        "number": 800,
        "hexcode": "#92400e"
      },
      {
        "number": 900,
        "hexcode": "#78350f"
      },
      {
        "number": 950,
        "hexcode": "#451a03"
      }
    ]
  },
  {
    "name": "Yellow",
    "id": "yellow",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fefce8"
      },
      {
        "number": 100,
        "hexcode": "#fef9c3"
      },
      {
        "number": 200,
        "hexcode": "#fef08a"
      },
      {
        "number": 300,
        "hexcode": "#fde047"
      },
      {
        "number": 400,
        "hexcode": "#facc15"
      },
      {
        "number": 500,
        "hexcode": "#eab308"
      },
      {
        "number": 600,
        "hexcode": "#ca8a04"
      },
      {
        "number": 700,
        "hexcode": "#a16207"
      },
      {
        "number": 800,
        "hexcode": "#854d0e"
      },
      {
        "number": 900,
        "hexcode": "#713f12"
      },
      {
        "number": 950,
        "hexcode": "#422006"
      }
    ]
  },
  {
    "name": "Lime",
    "id": "lime",
    "shades": [
      {
        "number": 50,
        "hexcode": "#f7fee7"
      },
      {
        "number": 100,
        "hexcode": "#ecfccb"
      },
      {
        "number": 200,
        "hexcode": "#d9f99d"
      },
      {
        "number": 300,
        "hexcode": "#bef264"
      },
      {
        "number": 400,
        "hexcode": "#a3e635"
      },
      {
        "number": 500,
        "hexcode": "#84cc16"
      },
      {
        "number": 600,
        "hexcode": "#65a30d"
      },
      {
        "number": 700,
        "hexcode": "#4d7c0f"
      },
      {
        "number": 800,
        "hexcode": "#3f6212"
      },
      {
        "number": 900,
        "hexcode": "#365314"
      },
      {
        "number": 950,
        "hexcode": "#1a2e05"
      }
    ]
  },
  {
    "name": "Green",
    "id": "green",
    "shades": [
      {
        "number": 50,
        "hexcode": "#f0fdf4"
      },
      {
        "number": 100,
        "hexcode": "#dcfce7"
      },
      {
        "number": 200,
        "hexcode": "#bbf7d0"
      },
      {
        "number": 300,
        "hexcode": "#86efac"
      },
      {
        "number": 400,
        "hexcode": "#4ade80"
      },
      {
        "number": 500,
        "hexcode": "#22c55e"
      },
      {
        "number": 600,
        "hexcode": "#16a34a"
      },
      {
        "number": 700,
        "hexcode": "#15803d"
      },
      {
        "number": 800,
        "hexcode": "#166534"
      },
      {
        "number": 900,
        "hexcode": "#14532d"
      },
      {
        "number": 950,
        "hexcode": "#052e16"
      }
    ]
  },
  {
    "name": "Emerald",
    "id": "emerald",
    "shades": [
      {
        "number": 50,
        "hexcode": "#ecfdf5"
      },
      {
        "number": 100,
        "hexcode": "#d1fae5"
      },
      {
        "number": 200,
        "hexcode": "#a7f3d0"
      },
      {
        "number": 300,
        "hexcode": "#6ee7b7"
      },
      {
        "number": 400,
        "hexcode": "#34d399"
      },
      {
        "number": 500,
        "hexcode": "#10b981"
      },
      {
        "number": 600,
        "hexcode": "#059669"
      },
      {
        "number": 700,
        "hexcode": "#047857"
      },
      {
        "number": 800,
        "hexcode": "#065f46"
      },
      {
        "number": 900,
        "hexcode": "#064e3b"
      },
      {
        "number": 950,
        "hexcode": "#022c22"
      }
    ]
  },
  {
    "name": "Teal",
    "id": "teal",
    "shades": [
      {
        "number": 50,
        "hexcode": "#f0fdfa"
      },
      {
        "number": 100,
        "hexcode": "#ccfbf1"
      },
      {
        "number": 200,
        "hexcode": "#99f6e4"
      },
      {
        "number": 300,
        "hexcode": "#5eead4"
      },
      {
        "number": 400,
        "hexcode": "#2dd4bf"
      },
      {
        "number": 500,
        "hexcode": "#14b8a6"
      },
      {
        "number": 600,
        "hexcode": "#0d9488"
      },
      {
        "number": 700,
        "hexcode": "#0f766e"
      },
      {
        "number": 800,
        "hexcode": "#115e59"
      },
      {
        "number": 900,
        "hexcode": "#134e4a"
      },
      {
        "number": 950,
        "hexcode": "#042f2e"
      }
    ]
  },
  {
    "name": "Cyan",
    "id": "cyan",
    "shades": [
      {
        "number": 50,
        "hexcode": "#ecfeff"
      },
      {
        "number": 100,
        "hexcode": "#cffafe"
      },
      {
        "number": 200,
        "hexcode": "#a5f3fc"
      },
      {
        "number": 300,
        "hexcode": "#67e8f9"
      },
      {
        "number": 400,
        "hexcode": "#22d3ee"
      },
      {
        "number": 500,
        "hexcode": "#06b6d4"
      },
      {
        "number": 600,
        "hexcode": "#0891b2"
      },
      {
        "number": 700,
        "hexcode": "#0e7490"
      },
      {
        "number": 800,
        "hexcode": "#155e75"
      },
      {
        "number": 900,
        "hexcode": "#164e63"
      },
      {
        "number": 950,
        "hexcode": "#083344"
      }
    ]
  },
  {
    "name": "Sky",
    "id": "sky",
    "shades": [
      {
        "number": 50,
        "hexcode": "#f0f9ff"
      },
      {
        "number": 100,
        "hexcode": "#e0f2fe"
      },
      {
        "number": 200,
        "hexcode": "#bae6fd"
      },
      {
        "number": 300,
        "hexcode": "#7dd3fc"
      },
      {
        "number": 400,
        "hexcode": "#38bdf8"
      },
      {
        "number": 500,
        "hexcode": "#0ea5e9"
      },
      {
        "number": 600,
        "hexcode": "#0284c7"
      },
      {
        "number": 700,
        "hexcode": "#0369a1"
      },
      {
        "number": 800,
        "hexcode": "#075985"
      },
      {
        "number": 900,
        "hexcode": "#0c4a6e"
      },
      {
        "number": 950,
        "hexcode": "#082f49"
      }
    ]
  },
  {
    "name": "Blue",
    "id": "blue",
    "shades": [
      {
        "number": 50,
        "hexcode": "#eff6ff"
      },
      {
        "number": 100,
        "hexcode": "#dbeafe"
      },
      {
        "number": 200,
        "hexcode": "#bfdbfe"
      },
      {
        "number": 300,
        "hexcode": "#93c5fd"
      },
      {
        "number": 400,
        "hexcode": "#60a5fa"
      },
      {
        "number": 500,
        "hexcode": "#3b82f6"
      },
      {
        "number": 600,
        "hexcode": "#2563eb"
      },
      {
        "number": 700,
        "hexcode": "#1d4ed8"
      },
      {
        "number": 800,
        "hexcode": "#1e40af"
      },
      {
        "number": 900,
        "hexcode": "#1e3a8a"
      },
      {
        "number": 950,
        "hexcode": "#172554"
      }
    ]
  },
  {
    "name": "Indigo",
    "id": "indigo",
    "shades": [
      {
        "number": 50,
        "hexcode": "#eef2ff"
      },
      {
        "number": 100,
        "hexcode": "#e0e7ff"
      },
      {
        "number": 200,
        "hexcode": "#c7d2fe"
      },
      {
        "number": 300,
        "hexcode": "#a5b4fc"
      },
      {
        "number": 400,
        "hexcode": "#818cf8"
      },
      {
        "number": 500,
        "hexcode": "#6366f1"
      },
      {
        "number": 600,
        "hexcode": "#4f46e5"
      },
      {
        "number": 700,
        "hexcode": "#4338ca"
      },
      {
        "number": 800,
        "hexcode": "#3730a3"
      },
      {
        "number": 900,
        "hexcode": "#312e81"
      },
      {
        "number": 950,
        "hexcode": "#1e1b4b"
      }
    ]
  },
  {
    "name": "Violet",
    "id": "violet",
    "shades": [
      {
        "number": 50,
        "hexcode": "#f5f3ff"
      },
      {
        "number": 100,
        "hexcode": "#ede9fe"
      },
      {
        "number": 200,
        "hexcode": "#ddd6fe"
      },
      {
        "number": 300,
        "hexcode": "#c4b5fd"
      },
      {
        "number": 400,
        "hexcode": "#a78bfa"
      },
      {
        "number": 500,
        "hexcode": "#8b5cf6"
      },
      {
        "number": 600,
        "hexcode": "#7c3aed"
      },
      {
        "number": 700,
        "hexcode": "#6d28d9"
      },
      {
        "number": 800,
        "hexcode": "#5b21b6"
      },
      {
        "number": 900,
        "hexcode": "#4c1d95"
      },
      {
        "number": 950,
        "hexcode": "#2e1065"
      }
    ]
  },
  {
    "name": "Purple",
    "id": "purple",
    "shades": [
      {
        "number": 50,
        "hexcode": "#faf5ff"
      },
      {
        "number": 100,
        "hexcode": "#f3e8ff"
      },
      {
        "number": 200,
        "hexcode": "#e9d5ff"
      },
      {
        "number": 300,
        "hexcode": "#d8b4fe"
      },
      {
        "number": 400,
        "hexcode": "#c084fc"
      },
      {
        "number": 500,
        "hexcode": "#a855f7"
      },
      {
        "number": 600,
        "hexcode": "#9333ea"
      },
      {
        "number": 700,
        "hexcode": "#7e22ce"
      },
      {
        "number": 800,
        "hexcode": "#6b21a8"
      },
      {
        "number": 900,
        "hexcode": "#581c87"
      },
      {
        "number": 950,
        "hexcode": "#3b0764"
      }
    ]
  },
  {
    "name": "Fuchsia",
    "id": "fuchsia",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fdf4ff"
      },
      {
        "number": 100,
        "hexcode": "#fae8ff"
      },
      {
        "number": 200,
        "hexcode": "#f5d0fe"
      },
      {
        "number": 300,
        "hexcode": "#f0abfc"
      },
      {
        "number": 400,
        "hexcode": "#e879f9"
      },
      {
        "number": 500,
        "hexcode": "#d946ef"
      },
      {
        "number": 600,
        "hexcode": "#c026d3"
      },
      {
        "number": 700,
        "hexcode": "#a21caf"
      },
      {
        "number": 800,
        "hexcode": "#86198f"
      },
      {
        "number": 900,
        "hexcode": "#701a75"
      },
      {
        "number": 950,
        "hexcode": "#4a044e"
      }
    ]
  },
  {
    "name": "Pink",
    "id": "pink",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fdf2f8"
      },
      {
        "number": 100,
        "hexcode": "#fce7f3"
      },
      {
        "number": 200,
        "hexcode": "#fbcfe8"
      },
      {
        "number": 300,
        "hexcode": "#f9a8d4"
      },
      {
        "number": 400,
        "hexcode": "#f472b6"
      },
      {
        "number": 500,
        "hexcode": "#ec4899"
      },
      {
        "number": 600,
        "hexcode": "#db2777"
      },
      {
        "number": 700,
        "hexcode": "#be185d"
      },
      {
        "number": 800,
        "hexcode": "#9d174d"
      },
      {
        "number": 900,
        "hexcode": "#831843"
      },
      {
        "number": 950,
        "hexcode": "#500724"
      }
    ]
  },
  {
    "name": "Rose",
    "id": "rose",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fff1f2"
      },
      {
        "number": 100,
        "hexcode": "#ffe4e6"
      },
      {
        "number": 200,
        "hexcode": "#fecdd3"
      },
      {
        "number": 300,
        "hexcode": "#fda4af"
      },
      {
        "number": 400,
        "hexcode": "#fb7185"
      },
      {
        "number": 500,
        "hexcode": "#f43f5e"
      },
      {
        "number": 600,
        "hexcode": "#e11d48"
      },
      {
        "number": 700,
        "hexcode": "#be123c"
      },
      {
        "number": 800,
        "hexcode": "#9f1239"
      },
      {
        "number": 900,
        "hexcode": "#881337"
      },
      {
        "number": 950,
        "hexcode": "#4c0519"
      }
    ]
  },
  {
    "name": "Slate",
    "id": "slate",
    "shades": [
      {
        "number": 50,
        "hexcode": "#f8fafc"
      },
      {
        "number": 100,
        "hexcode": "#f1f5f9"
      },
      {
        "number": 200,
        "hexcode": "#e2e8f0"
      },
      {
        "number": 300,
        "hexcode": "#cbd5e1"
      },
      {
        "number": 400,
        "hexcode": "#94a3b8"
      },
      {
        "number": 500,
        "hexcode": "#64748b"
      },
      {
        "number": 600,
        "hexcode": "#475569"
      },
      {
        "number": 700,
        "hexcode": "#334155"
      },
      {
        "number": 800,
        "hexcode": "#1e293b"
      },
      {
        "number": 900,
        "hexcode": "#0f172a"
      },
      {
        "number": 950,
        "hexcode": "#020617"
      }
    ]
  },
  {
    "name": "Gray",
    "id": "gray",
    "shades": [
      {
        "number": 50,
        "hexcode": "#f9fafb"
      },
      {
        "number": 100,
        "hexcode": "#f3f4f6"
      },
      {
        "number": 200,
        "hexcode": "#e5e7eb"
      },
      {
        "number": 300,
        "hexcode": "#d1d5db"
      },
      {
        "number": 400,
        "hexcode": "#9ca3af"
      },
      {
        "number": 500,
        "hexcode": "#6b7280"
      },
      {
        "number": 600,
        "hexcode": "#4b5563"
      },
      {
        "number": 700,
        "hexcode": "#374151"
      },
      {
        "number": 800,
        "hexcode": "#1f2937"
      },
      {
        "number": 900,
        "hexcode": "#111827"
      },
      {
        "number": 950,
        "hexcode": "#030712"
      }
    ]
  },
  {
    "name": "Zinc",
    "id": "zinc",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fafafa"
      },
      {
        "number": 100,
        "hexcode": "#f4f4f5"
      },
      {
        "number": 200,
        "hexcode": "#e4e4e7"
      },
      {
        "number": 300,
        "hexcode": "#d4d4d8"
      },
      {
        "number": 400,
        "hexcode": "#a1a1aa"
      },
      {
        "number": 500,
        "hexcode": "#71717a"
      },
      {
        "number": 600,
        "hexcode": "#52525b"
      },
      {
        "number": 700,
        "hexcode": "#3f3f46"
      },
      {
        "number": 800,
        "hexcode": "#27272a"
      },
      {
        "number": 900,
        "hexcode": "#18181b"
      },
      {
        "number": 950,
        "hexcode": "#09090b"
      }
    ]
  },
  {
    "name": "Neutral",
    "id": "neutral",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fafafa"
      },
      {
        "number": 100,
        "hexcode": "#f5f5f5"
      },
      {
        "number": 200,
        "hexcode": "#e5e5e5"
      },
      {
        "number": 300,
        "hexcode": "#d4d4d4"
      },
      {
        "number": 400,
        "hexcode": "#a3a3a3"
      },
      {
        "number": 500,
        "hexcode": "#737373"
      },
      {
        "number": 600,
        "hexcode": "#525252"
      },
      {
        "number": 700,
        "hexcode": "#404040"
      },
      {
        "number": 800,
        "hexcode": "#262626"
      },
      {
        "number": 900,
        "hexcode": "#171717"
      },
      {
        "number": 950,
        "hexcode": "#0a0a0a"
      }
    ]
  },
  {
    "name": "Stone",
    "id": "stone",
    "shades": [
      {
        "number": 50,
        "hexcode": "#fafaf9"
      },
      {
        "number": 100,
        "hexcode": "#f5f5f4"
      },
      {
        "number": 200,
        "hexcode": "#e7e5e4"
      },
      {
        "number": 300,
        "hexcode": "#d6d3d1"
      },
      {
        "number": 400,
        "hexcode": "#a8a29e"
      },
      {
        "number": 500,
        "hexcode": "#78716c"
      },
      {
        "number": 600,
        "hexcode": "#57534e"
      },
      {
        "number": 700,
        "hexcode": "#44403c"
      },
      {
        "number": 800,
        "hexcode": "#292524"
      },
      {
        "number": 900,
        "hexcode": "#1c1917"
      },
      {
        "number": 950,
        "hexcode": "#0c0a09"
      }
    ]
  }
];

  // --- EXTRA WARM/OCHRE SKELETON PALETTES (for warm/ochre nearest-neighbor coverage) ---
  const EXTRA_MUD_PALETTES = [
    {
      name: "Yellow Mud",
      id: "yellow-mud",
      shades: [
        { number: 50, hexcode: "#fefee8" },
        { number: 100, hexcode: "#fcfdc5" },
        { number: 200, hexcode: "#fcfc8f" },
        { number: 300, hexcode: "#faf54f" },
        { number: 400, hexcode: "#f5e91d" },
        { number: 500, hexcode: "#e2d10c" },
        { number: 600, hexcode: "#c0a607" },
        { number: 700, hexcode: "#977b09" },
        { number: 800, hexcode: "#7c610f" },
        { number: 900, hexcode: "#695113" },
        { number: 950, hexcode: "#3d2c06" }
      ]
    },
    {
      name: "Mud",
      id: "mud",
      shades: [
        { number: 50, hexcode: "#fcfee8" },
        { number: 100, hexcode: "#f6fdc7" },
        { number: 200, hexcode: "#f0fb94" },
        { number: 300, hexcode: "#e7f756" },
        { number: 400, hexcode: "#def025" },
        { number: 500, hexcode: "#cbdb0f" },
        { number: 600, hexcode: "#aeb609" },
        { number: 700, hexcode: "#8d8e0b" },
        { number: 800, hexcode: "#737110" },
        { number: 900, hexcode: "#625f13" },
        { number: 950, hexcode: "#383606" }
      ]
    }
  ];

  // --- COLOR NAMING ENGINE ---
  const { getColorName } = (function() {
    const exports = {};
    const module = { exports };
    const n = chroma;
    const C=r=>{let a=JSON.parse(JSON.stringify(o));return a.forEach(e=>{e.push(n.deltaE(r,e[0]))}),a.reduce((e,F)=>e[2]<F[2]?e:F)[1]},o=[["000000","Black"],["000080","Navy Blue"],["0000C8","Dark Blue"],["0000FF","Blue"],["000741","Stratos"],["001B1C","Swamp"],["002387","Resolution Blue"],["002900","Deep Fir"],["002E20","Burnham"],["002FA7","International Klein Blue"],["003153","Prussian Blue"],["003366","Midnight Blue"],["003399","Smalt"],["003532","Deep Teal"],["003E40","Cyprus"],["004620","Kaitoke Green"],["0047AB","Cobalt"],["004816","Crusoe"],["004950","Sherpa Blue"],["0056A7","Endeavour"],["00581A","Camarone"],["0066CC","Science Blue"],["0066FF","Blue Ribbon"],["00755E","Tropical Rain Forest"],["0076A3","Allports"],["007BA7","Deep Cerulean"],["007EC7","Lochmara"],["007FFF","Azure Radiance"],["008080","Teal"],["0095B6","Bondi Blue"],["009DC4","Pacific Blue"],["00A693","Persian Green"],["00A86B","Jade"],["00CC99","Caribbean Green"],["00CCCC","Robin's Egg Blue"],["00FF00","Green"],["00FF7F","Spring Green"],["00FFFF","Cyan / Aqua"],["010D1A","Blue Charcoal"],["011635","Midnight"],["011D13","Holly"],["012731","Daintree"],["01361C","Cardin Green"],["01371A","County Green"],["013E62","Astronaut Blue"],["013F6A","Regal Blue"],["014B43","Aqua Deep"],["015E85","Orient"],["016162","Blue Stone"],["016D39","Fun Green"],["01796F","Pine Green"],["017987","Blue Lagoon"],["01826B","Deep Sea"],["01A368","Green Haze"],["022D15","English Holly"],["02402C","Sherwood Green"],["02478E","Congress Blue"],["024E46","Evening Sea"],["026395","Bahama Blue"],["02866F","Observatory"],["02A4D3","Cerulean"],["03163C","Tangaroa"],["032B52","Green Vogue"],["036A6E","Mosque"],["041004","Midnight Moss"],["041322","Black Pearl"],["042E4C","Blue Whale"],["044022","Zuccini"],["044259","Teal Blue"],["051040","Deep Cove"],["051657","Gulf Blue"],["055989","Venice Blue"],["056F57","Watercourse"],["062A78","Catalina Blue"],["063537","Tiber"],["069B81","Gossamer"],["06A189","Niagara"],["073A50","Tarawera"],["080110","Jaguar"],["081910","Black Bean"],["082567","Deep Sapphire"],["088370","Elf Green"],["08E8DE","Bright Turquoise"],["092256","Downriver"],["09230F","Palm Green"],["09255D","Madison"],["093624","Bottle Green"],["095859","Deep Sea Green"],["097F4B","Salem"],["0A001C","Black Russian"],["0A480D","Dark Fern"],["0A6906","Japanese Laurel"],["0A6F75","Atoll"],["0B0B0B","Cod Gray"],["0B0F08","Marshland"],["0B1107","Gordons Green"],["0B1304","Black Forest"],["0B6207","San Felix"],["0BDA51","Malachite"],["0C0B1D","Ebony"],["0C0D0F","Woodsmoke"],["0C1911","Racing Green"],["0C7A79","Surfie Green"],["0C8990","Blue Chill"],["0D0332","Black Rock"],["0D1117","Bunker"],["0D1C19","Aztec"],["0D2E1C","Bush"],["0E0E18","Cinder"],["0E2A30","Firefly"],["0F2D9E","Torea Bay"],["10121D","Vulcan"],["101405","Green Waterloo"],["105852","Eden"],["110C6C","Arapawa"],["120A8F","Ultramarine"],["123447","Elephant"],["126B40","Jewel"],["130000","Diesel"],["130A06","Asphalt"],["13264D","Blue Zodiac"],["134F19","Parsley"],["140600","Nero"],["1450AA","Tory Blue"],["151F4C","Bunting"],["1560BD","Denim"],["15736B","Genoa"],["161928","Mirage"],["161D10","Hunter Green"],["162A40","Big Stone"],["163222","Celtic"],["16322C","Timber Green"],["163531","Gable Green"],["171F04","Pine Tree"],["175579","Chathams Blue"],["182D09","Deep Forest Green"],["18587A","Blumine"],["19330E","Palm Leaf"],["193751","Nile Blue"],["1959A8","Fun Blue"],["1A1A68","Lucky Point"],["1AB385","Mountain Meadow"],["1B0245","Tolopea"],["1B1035","Haiti"],["1B127B","Deep Koamaru"],["1B1404","Acadia"],["1B2F11","Seaweed"],["1B3162","Biscay"],["1B659D","Matisse"],["1C1208","Crowshead"],["1C1E13","Rangoon Green"],["1C39BB","Persian Blue"],["1C402E","Everglade"],["1C7C7D","Elm"],["1D6142","Green Pea"],["1E0F04","Creole"],["1E1609","Karaka"],["1E1708","El Paso"],["1E385B","Cello"],["1E433C","Te Papa Green"],["1E90FF","Dodger Blue"],["1E9AB0","Eastern Blue"],["1F120F","Night Rider"],["1FC2C2","Java"],["20208D","Jacksons Purple"],["202E54","Cloud Burst"],["204852","Blue Dianne"],["211A0E","Eternity"],["220878","Deep Blue"],["228B22","Forest Green"],["233418","Mallard"],["240A40","Violet"],["240C02","Kilamanjaro"],["242A1D","Log Cabin"],["242E16","Black Olive"],["24500F","Green House"],["251607","Graphite"],["251706","Cannon Black"],["251F4F","Port Gore"],["25272C","Shark"],["25311C","Green Kelp"],["2596D1","Curious Blue"],["260368","Paua"],["26056A","Paris M"],["261105","Wood Bark"],["261414","Gondola"],["262335","Steel Gray"],["26283B","Ebony Clay"],["273A81","Bay of Many"],["27504B","Plantation"],["278A5B","Eucalyptus"],["281E15","Oil"],["283A77","Astronaut"],["286ACD","Mariner"],["290C5E","Violent Violet"],["292130","Bastille"],["292319","Zeus"],["292937","Charade"],["297B9A","Jelly Bean"],["29AB87","Jungle Green"],["2A0359","Cherry Pie"],["2A140E","Coffee Bean"],["2A2630","Baltic Sea"],["2A380B","Turtle Green"],["2A52BE","Cerulean Blue"],["2B0202","Sepia Black"],["2B194F","Valhalla"],["2B3228","Heavy Metal"],["2C0E8C","Blue Gem"],["2C1632","Revolver"],["2C2133","Bleached Cedar"],["2C8C84","Lochinvar"],["2D2510","Mikado"],["2D383A","Outer Space"],["2D569B","St Tropaz"],["2E0329","Jacaranda"],["2E1905","Jacko Bean"],["2E3222","Rangitoto"],["2E3F62","Rhino"],["2E8B57","Sea Green"],["2EBFD4","Scooter"],["2F270E","Onion"],["2F3CB3","Governor Bay"],["2F519E","Sapphire"],["2F5A57","Spectra"],["2F6168","Casal"],["300529","Melanzane"],["301F1E","Cocoa Brown"],["302A0F","Woodrush"],["304B6A","San Juan"],["30D5C8","Turquoise"],["311C17","Eclipse"],["314459","Pickled Bluewood"],["315BA1","Azure"],["31728D","Calypso"],["317D82","Paradiso"],["32127A","Persian Indigo"],["32293A","Blackcurrant"],["323232","Mine Shaft"],["325D52","Stromboli"],["327C14","Bilbao"],["327DA0","Astral"],["33036B","Christalle"],["33292F","Thunder"],["33CC99","Shamrock"],["341515","Tamarind"],["350036","Mardi Gras"],["350E42","Valentino"],["350E57","Jagger"],["353542","Tuna"],["354E8C","Chambray"],["363050","Martinique"],["363534","Tuatara"],["363C0D","Waiouru"],["36747D","Ming"],["368716","La Palma"],["370202","Chocolate"],["371D09","Clinker"],["37290E","Brown Tumbleweed"],["373021","Birch"],["377475","Oracle"],["380474","Blue Diamond"],["381A51","Grape"],["383533","Dune"],["384555","Oxford Blue"],["384910","Clover"],["394851","Limed Spruce"],["396413","Dell"],["3A0020","Toledo"],["3A2010","Sambuca"],["3A2A6A","Jacarta"],["3A686C","William"],["3A6A47","Killarney"],["3AB09E","Keppel"],["3B000B","Temptress"],["3B0910","Aubergine"],["3B1F1F","Jon"],["3B2820","Treehouse"],["3B7A57","Amazon"],["3B91B4","Boston Blue"],["3C0878","Windsor"],["3C1206","Rebel"],["3C1F76","Meteorite"],["3C2005","Dark Ebony"],["3C3910","Camouflage"],["3C4151","Bright Gray"],["3C4443","Cape Cod"],["3C493A","Lunar Green"],["3D0C02","Bean  "],["3D2B1F","Bistre"],["3D7D52","Goblin"],["3E0480","Kingfisher Daisy"],["3E1C14","Cedar"],["3E2B23","English Walnut"],["3E2C1C","Black Marlin"],["3E3A44","Ship Gray"],["3EABBF","Pelorous"],["3F2109","Bronze"],["3F2500","Cola"],["3F3002","Madras"],["3F307F","Minsk"],["3F4C3A","Cabbage Pont"],["3F583B","Tom Thumb"],["3F5D53","Mineral Green"],["3FC1AA","Puerto Rico"],["3FFF00","Harlequin"],["401801","Brown Pod"],["40291D","Cork"],["403B38","Masala"],["403D19","Thatch Green"],["405169","Fiord"],["40826D","Viridian"],["40A860","Chateau Green"],["410056","Ripe Plum"],["411F10","Paco"],["412010","Deep Oak"],["413C37","Merlin"],["414257","Gun Powder"],["414C7D","East Bay"],["4169E1","Royal Blue"],["41AA78","Ocean Green"],["420303","Burnt Maroon"],["423921","Lisbon Brown"],["427977","Faded Jade"],["431560","Scarlet Gum"],["433120","Iroko"],["433E37","Armadillo"],["434C59","River Bed"],["436A0D","Green Leaf"],["44012D","Barossa"],["441D00","Morocco Brown"],["444954","Mako"],["454936","Kelp"],["456CAC","San Marino"],["45B1E8","Picton Blue"],["460B41","Loulou"],["462425","Crater Brown"],["465945","Gray Asparagus"],["4682B4","Steel Blue"],["480404","Rustic Red"],["480607","Bulgarian Rose"],["480656","Clairvoyant"],["481C1C","Cocoa Bean"],["483131","Woody Brown"],["483C32","Taupe"],["49170C","Van Cleef"],["492615","Brown Derby"],["49371B","Metallic Bronze"],["495400","Verdun Green"],["496679","Blue Bayoux"],["497183","Bismark"],["4A2A04","Bracken"],["4A3004","Deep Bronze"],["4A3C30","Mondo"],["4A4244","Tundora"],["4A444B","Gravel"],["4A4E5A","Trout"],["4B0082","Pigment Indigo"],["4B5D52","Nandor"],["4C3024","Saddle"],["4C4F56","Abbey"],["4D0135","Blackberry"],["4D0A18","Cab Sav"],["4D1E01","Indian Tan"],["4D282D","Cowboy"],["4D282E","Livid Brown"],["4D3833","Rock"],["4D3D14","Punga"],["4D400F","Bronzetone"],["4D5328","Woodland"],["4E0606","Mahogany"],["4E2A5A","Bossanova"],["4E3B41","Matterhorn"],["4E420C","Bronze Olive"],["4E4562","Mulled Wine"],["4E6649","Axolotl"],["4E7F9E","Wedgewood"],["4EABD1","Shakespeare"],["4F1C70","Honey Flower"],["4F2398","Daisy Bush"],["4F69C6","Indigo"],["4F7942","Fern Green"],["4F9D5D","Fruit Salad"],["4FA83D","Apple"],["504351","Mortar"],["507096","Kashmir Blue"],["507672","Cutty Sark"],["50C878","Emerald"],["514649","Emperor"],["516E3D","Chalet Green"],["517C66","Como"],["51808F","Smalt Blue"],["52001F","Castro"],["520C17","Maroon Oak"],["523C94","Gigas"],["533455","Voodoo"],["534491","Victoria"],["53824B","Hippie Green"],["541012","Heath"],["544333","Judge Gray"],["54534D","Fuscous Gray"],["549019","Vida Loca"],["55280C","Cioccolato"],["555B10","Saratoga"],["556D56","Finlandia"],["5590D9","Havelock Blue"],["56B4BE","Fountain Blue"],["578363","Spring Leaves"],["583401","Saddle Brown"],["585562","Scarpa Flow"],["587156","Cactus"],["589AAF","Hippie Blue"],["591D35","Wine Berry"],["592804","Brown Bramble"],["593737","Congo Brown"],["594433","Millbrook"],["5A6E9C","Waikawa Gray"],["5A87A0","Horizon"],["5B3013","Jambalaya"],["5C0120","Bordeaux"],["5C0536","Mulberry Wood"],["5C2E01","Carnaby Tan"],["5C5D75","Comet"],["5D1E0F","Redwood"],["5D4C51","Don Juan"],["5D5C58","Chicago"],["5D5E37","Verdigris"],["5D7747","Dingley"],["5DA19F","Breaker Bay"],["5E483E","Kabul"],["5E5D3B","Hemlock"],["5F3D26","Irish Coffee"],["5F5F6E","Mid Gray"],["5F6672","Shuttle Gray"],["5FA777","Aqua Forest"],["5FB3AC","Tradewind"],["604913","Horses Neck"],["605B73","Smoky"],["606E68","Corduroy"],["6093D1","Danube"],["612718","Espresso"],["614051","Eggplant"],["615D30","Costa Del Sol"],["61845F","Glade Green"],["622F30","Buccaneer"],["623F2D","Quincy"],["624E9A","Butterfly Bush"],["625119","West Coast"],["626649","Finch"],["639A8F","Patina"],["63B76C","Fern"],["6456B7","Blue Violet"],["646077","Dolphin"],["646463","Storm Dust"],["646A54","Siam"],["646E75","Nevada"],["6495ED","Cornflower Blue"],["64CCDB","Viking"],["65000B","Rosewood"],["651A14","Cherrywood"],["652DC1","Purple Heart"],["657220","Fern Frond"],["65745D","Willow Grove"],["65869F","Hoki"],["660045","Pompadour"],["660099","Purple"],["66023C","Tyrian Purple"],["661010","Dark Tan"],["66B58F","Silver Tree"],["66FF00","Bright Green"],["66FF66","Screamin' Green"],["67032D","Black Rose"],["675FA6","Scampi"],["676662","Ironside Gray"],["678975","Viridian Green"],["67A712","Christi"],["683600","Nutmeg Wood Finish"],["685558","Zambezi"],["685E6E","Salt Box"],["692545","Tawny Port"],["692D54","Finn"],["695F62","Scorpion"],["697E9A","Lynch"],["6A442E","Spice"],["6A5D1B","Himalaya"],["6A6051","Soya Bean"],["6B2A14","Hairy Heath"],["6B3FA0","Royal Purple"],["6B4E31","Shingle Fawn"],["6B5755","Dorado"],["6B8BA2","Bermuda Gray"],["6B8E23","Olive Drab"],["6C3082","Eminence"],["6CDAE7","Turquoise Blue"],["6D0101","Lonestar"],["6D5E54","Pine Cone"],["6D6C6C","Dove Gray"],["6D9292","Juniper"],["6D92A1","Gothic"],["6E0902","Red Oxide"],["6E1D14","Moccaccino"],["6E4826","Pickled Bean"],["6E4B26","Dallas"],["6E6D57","Kokoda"],["6E7783","Pale Sky"],["6F440C","Cafe Royale"],["6F6A61","Flint"],["6F8E63","Highland"],["6F9D02","Limeade"],["6FD0C5","Downy"],["701C1C","Persian Plum"],["704214","Sepia"],["704A07","Antique Bronze"],["704F50","Ferra"],["706555","Coffee"],["708090","Slate Gray"],["711A00","Cedar Wood Finish"],["71291D","Metallic Copper"],["714693","Affair"],["714AB2","Studio"],["715D47","Tobacco Brown"],["716338","Yellow Metal"],["716B56","Peat"],["716E10","Olivetone"],["717486","Storm Gray"],["718080","Sirocco"],["71D9E2","Aquamarine Blue"],["72010F","Venetian Red"],["724A2F","Old Copper"],["726D4E","Go Ben"],["727B89","Raven"],["731E8F","Seance"],["734A12","Raw Umber"],["736C9F","Kimberly"],["736D58","Crocodile"],["737829","Crete"],["738678","Xanadu"],["74640D","Spicy Mustard"],["747D63","Limed Ash"],["747D83","Rolling Stone"],["748881","Blue Smoke"],["749378","Laurel"],["74C365","Mantis"],["755A57","Russett"],["7563A8","Deluge"],["76395D","Cosmic"],["7666C6","Blue Marguerite"],["76BD17","Lima"],["76D7EA","Sky Blue"],["770F05","Dark Burgundy"],["771F1F","Crown of Thorns"],["773F1A","Walnut"],["776F61","Pablo"],["778120","Pacifika"],["779E86","Oxley"],["77DD77","Pastel Green"],["780109","Japanese Maple"],["782D19","Mocha"],["782F16","Peanut"],["78866B","Camouflage Green"],["788A25","Wasabi"],["788BBA","Ship Cove"],["78A39C","Sea Nymph"],["795D4C","Roman Coffee"],["796878","Old Lavender"],["796989","Rum"],["796A78","Fedora"],["796D62","Sandstone"],["79DEEC","Spray"],["7A013A","Siren"],["7A58C1","Fuchsia Blue"],["7A7A7A","Boulder"],["7A89B8","Wild Blue Yonder"],["7AC488","De York"],["7B3801","Red Beech"],["7B3F00","Cinnamon"],["7B6608","Yukon Gold"],["7B7874","Tapa"],["7B7C94","Waterloo "],["7B8265","Flax Smoke"],["7B9F80","Amulet"],["7BA05B","Asparagus"],["7C1C05","Kenyan Copper"],["7C7631","Pesto"],["7C778A","Topaz"],["7C7B7A","Concord"],["7C7B82","Jumbo"],["7C881A","Trendy Green"],["7CA1A6","Gumbo"],["7CB0A1","Acapulco"],["7CB7BB","Neptune"],["7D2C14","Pueblo"],["7DA98D","Bay Leaf"],["7DC8F7","Malibu"],["7DD8C6","Bermuda"],["7E3A15","Copper Canyon"],["7F1734","Claret"],["7F3A02","Peru Tan"],["7F626D","Falcon"],["7F7589","Mobster"],["7F76D3","Moody Blue"],["7FFF00","Chartreuse"],["7FFFD4","Aquamarine"],["800000","Maroon"],["800B47","Rose Bud Cherry"],["801818","Falu Red"],["80341F","Red Robin"],["803790","Vivid Violet"],["80461B","Russet"],["807E79","Friar Gray"],["808000","Olive"],["808080","Gray"],["80B3AE","Gulf Stream"],["80B3C4","Glacier"],["80CCEA","Seagull"],["81422C","Nutmeg"],["816E71","Spicy Pink"],["817377","Empress"],["819885","Spanish Green"],["826F65","Sand Dune"],["828685","Gunsmoke"],["828F72","Battleship Gray"],["831923","Merlot"],["837050","Shadow"],["83AA5D","Chelsea Cucumber"],["83D0C6","Monte Carlo"],["843179","Plum"],["84A0A0","Granny Smith"],["8581D9","Chetwode Blue"],["858470","Bandicoot"],["859FAF","Bali Hai"],["85C4CC","Half Baked"],["860111","Red Devil"],["863C3C","Lotus"],["86483C","Ironstone"],["864D1E","Bull Shot"],["86560A","Rusty Nail"],["868974","Bitter"],["86949F","Regent Gray"],["871550","Disco"],["87756E","Americano"],["877C7B","Hurricane"],["878D91","Oslo Gray"],["87AB39","Sushi"],["885342","Spicy Mix"],["886221","Kumera"],["888387","Suva Gray"],["888D65","Avocado"],["893456","Camelot"],["893843","Solid Pink"],["894367","Cannon Pink"],["897D6D","Makara"],["8A3324","Burnt Umber"],["8A73D6","True V"],["8A8360","Clay Creek"],["8A8389","Monsoon"],["8A8F8A","Stack"],["8AB9F1","Jordy Blue"],["8B00FF","Electric Violet"],["8B0723","Monarch"],["8B6B0B","Corn Harvest"],["8B8470","Olive Haze"],["8B847E","Schooner"],["8B8680","Natural Gray"],["8B9C90","Mantle"],["8B9FEE","Portage"],["8BA690","Envy"],["8BA9A5","Cascade"],["8BE6D8","Riptide"],["8C055E","Cardinal Pink"],["8C472F","Mule Fawn"],["8C5738","Potters Clay"],["8C6495","Trendy Pink"],["8D0226","Paprika"],["8D3D38","Sanguine Brown"],["8D3F3F","Tosca"],["8D7662","Cement"],["8D8974","Granite Green"],["8D90A1","Manatee"],["8DA8CC","Polo Blue"],["8E0000","Red Berry"],["8E4D1E","Rope"],["8E6F70","Opium"],["8E775E","Domino"],["8E8190","Mamba"],["8EABC1","Nepal"],["8F021C","Pohutukawa"],["8F3E33","El Salva"],["8F4B0E","Korma"],["8F8176","Squirrel"],["8FD6B4","Vista Blue"],["900020","Burgundy"],["901E1E","Old Brick"],["907874","Hemp"],["907B71","Almond Frost"],["908D39","Sycamore"],["92000A","Sangria"],["924321","Cumin"],["926F5B","Beaver"],["928573","Stonewall"],["928590","Venus"],["9370DB","Medium Purple"],["93CCEA","Cornflower"],["93DFB8","Algae Green"],["944747","Copper Rust"],["948771","Arrowtown"],["950015","Scarlett"],["956387","Strikemaster"],["959396","Mountain Mist"],["960018","Carmine"],["964B00","Brown"],["967059","Leather"],["9678B6","Purple Mountain's Majesty"],["967BB6","Lavender Purple"],["96A8A1","Pewter"],["96BBAB","Summer Green"],["97605D","Au Chico"],["9771B5","Wisteria"],["97CD2D","Atlantis"],["983D61","Vin Rouge"],["9874D3","Lilac Bush"],["98777B","Bazaar"],["98811B","Hacienda"],["988D77","Pale Oyster"],["98FF98","Mint Green"],["990066","Fresh Eggplant"],["991199","Violet Eggplant"],["991613","Tamarillo"],["991B07","Totem Pole"],["996666","Copper Rose"],["9966CC","Amethyst"],["997A8D","Mountbatten Pink"],["9999CC","Blue Bell"],["9A3820","Prairie Sand"],["9A6E61","Toast"],["9A9577","Gurkha"],["9AB973","Olivine"],["9AC2B8","Shadow Green"],["9B4703","Oregon"],["9B9E8F","Lemon Grass"],["9C3336","Stiletto"],["9D5616","Hawaiian Tan"],["9DACB7","Gull Gray"],["9DC209","Pistachio"],["9DE093","Granny Smith Apple"],["9DE5FF","Anakiwa"],["9E5302","Chelsea Gem"],["9E5B40","Sepia Skin"],["9EA587","Sage"],["9EA91F","Citron"],["9EB1CD","Rock Blue"],["9EDEE0","Morning Glory"],["9F381D","Cognac"],["9F821C","Reef Gold"],["9F9F9C","Star Dust"],["9FA0B1","Santas Gray"],["9FD7D3","Sinbad"],["9FDD8C","Feijoa"],["A02712","Tabasco"],["A1750D","Buttered Rum"],["A1ADB5","Hit Gray"],["A1C50A","Citrus"],["A1DAD7","Aqua Island"],["A1E9DE","Water Leaf"],["A2006D","Flirt"],["A23B6C","Rouge"],["A26645","Cape Palliser"],["A2AAB3","Gray Chateau"],["A2AEAB","Edward"],["A3807B","Pharlap"],["A397B4","Amethyst Smoke"],["A3E3ED","Blizzard Blue"],["A4A49D","Delta"],["A4A6D3","Wistful"],["A4AF6E","Green Smoke"],["A50B5E","Jazzberry Jam"],["A59B91","Zorba"],["A5CB0C","Bahia"],["A62F20","Roof Terracotta"],["A65529","Paarl"],["A68B5B","Barley Corn"],["A69279","Donkey Brown"],["A6A29A","Dawn"],["A72525","Mexican Red"],["A7882C","Luxor Gold"],["A85307","Rich Gold"],["A86515","Reno Sand"],["A86B6B","Coral Tree"],["A8989B","Dusty Gray"],["A899E6","Dull Lavender"],["A8A589","Tallow"],["A8AE9C","Bud"],["A8AF8E","Locust"],["A8BD9F","Norway"],["A8E3BD","Chinook"],["A9A491","Gray Olive"],["A9ACB6","Aluminium"],["A9B2C3","Cadet Blue"],["A9B497","Schist"],["A9BDBF","Tower Gray"],["A9BEF2","Perano"],["A9C6C2","Opal"],["AA375A","Night Shadz"],["AA4203","Fire"],["AA8B5B","Muesli"],["AA8D6F","Sandal"],["AAA5A9","Shady Lady"],["AAA9CD","Logan"],["AAABB7","Spun Pearl"],["AAD6E6","Regent St Blue"],["AAF0D1","Magic Mint"],["AB0563","Lipstick"],["AB3472","Royal Heath"],["AB917A","Sandrift"],["ABA0D9","Cold Purple"],["ABA196","Bronco"],["AC8A56","Limed Oak"],["AC91CE","East Side"],["AC9E22","Lemon Ginger"],["ACA494","Napa"],["ACA586","Hillary"],["ACA59F","Cloudy"],["ACACAC","Silver Chalice"],["ACB78E","Swamp Green"],["ACCBB1","Spring Rain"],["ACDD4D","Conifer"],["ACE1AF","Celadon"],["AD781B","Mandalay"],["ADBED1","Casper"],["ADDFAD","Moss Green"],["ADE6C4","Padua"],["ADFF2F","Green Yellow"],["AE4560","Hippie Pink"],["AE6020","Desert"],["AE809E","Bouquet"],["AF4035","Medium Carmine"],["AF4D43","Apple Blossom"],["AF593E","Brown Rust"],["AF8751","Driftwood"],["AF8F2C","Alpine"],["AF9F1C","Lucky"],["AFA09E","Martini"],["AFB1B8","Bombay"],["AFBDD9","Pigeon Post"],["B04C6A","Cadillac"],["B05D54","Matrix"],["B05E81","Tapestry"],["B06608","Mai Tai"],["B09A95","Del Rio"],["B0E0E6","Powder Blue"],["B0E313","Inch Worm"],["B10000","Bright Red"],["B14A0B","Vesuvius"],["B1610B","Pumpkin Skin"],["B16D52","Santa Fe"],["B19461","Teak"],["B1E2C1","Fringy Flower"],["B1F4E7","Ice Cold"],["B20931","Shiraz"],["B2A1EA","Biloba Flower"],["B32D29","Tall Poppy"],["B35213","Fiery Orange"],["B38007","Hot Toddy"],["B3AF95","Taupe Gray"],["B3C110","La Rioja"],["B43332","Well Read"],["B44668","Blush"],["B4CFD3","Jungle Mist"],["B57281","Turkish Rose"],["B57EDC","Lavender"],["B5A27F","Mongoose"],["B5B35C","Olive Green"],["B5D2CE","Jet Stream"],["B5ECDF","Cruise"],["B6316C","Hibiscus"],["B69D98","Thatch"],["B6B095","Heathered Gray"],["B6BAA4","Eagle"],["B6D1EA","Spindle"],["B6D3BF","Gum Leaf"],["B7410E","Rust"],["B78E5C","Muddy Waters"],["B7A214","Sahara"],["B7A458","Husk"],["B7B1B1","Nobel"],["B7C3D0","Heather"],["B7F0BE","Madang"],["B81104","Milano Red"],["B87333","Copper"],["B8B56A","Gimblet"],["B8C1B1","Green Spring"],["B8C25D","Celery"],["B8E0F9","Sail"],["B94E48","Chestnut"],["B95140","Crail"],["B98D28","Marigold"],["B9C46A","Wild Willow"],["B9C8AC","Rainee"],["BA0101","Guardsman Red"],["BA450C","Rock Spray"],["BA6F1E","Bourbon"],["BA7F03","Pirate Gold"],["BAB1A2","Nomad"],["BAC7C9","Submarine"],["BAEEF9","Charlotte"],["BB3385","Medium Red Violet"],["BB8983","Brandy Rose"],["BBD009","Rio Grande"],["BBD7C1","Surf"],["BCC9C2","Powder Ash"],["BD5E2E","Tuscany"],["BD978E","Quicksand"],["BDB1A8","Silk"],["BDB2A1","Malta"],["BDB3C7","Chatelle"],["BDBBD7","Lavender Gray"],["BDBDC6","French Gray"],["BDC8B3","Clay Ash"],["BDC9CE","Loblolly"],["BDEDFD","French Pass"],["BEA6C3","London Hue"],["BEB5B7","Pink Swan"],["BEDE0D","Fuego"],["BF5500","Rose of Sharon"],["BFB8B0","Tide"],["BFBED8","Blue Haze"],["BFC1C2","Silver Sand"],["BFC921","Key Lime Pie"],["BFDBE2","Ziggurat"],["BFFF00","Lime"],["C02B18","Thunderbird"],["C04737","Mojo"],["C08081","Old Rose"],["C0C0C0","Silver"],["C0D3B9","Pale Leaf"],["C0D8B6","Pixie Green"],["C1440E","Tia Maria"],["C154C1","Fuchsia Pink"],["C1A004","Buddha Gold"],["C1B7A4","Bison Hide"],["C1BAB0","Tea"],["C1BECD","Gray Suit"],["C1D7B0","Sprout"],["C1F07C","Sulu"],["C26B03","Indochine"],["C2955D","Twine"],["C2BDB6","Cotton Seed"],["C2CAC4","Pumice"],["C2E8E5","Jagged Ice"],["C32148","Maroon Flush"],["C3B091","Indian Khaki"],["C3BFC1","Pale Slate"],["C3C3BD","Gray Nickel"],["C3CDE6","Periwinkle Gray"],["C3D1D1","Tiara"],["C3DDF9","Tropical Blue"],["C41E3A","Cardinal"],["C45655","Fuzzy Wuzzy Brown"],["C45719","Orange Roughy"],["C4C4BC","Mist Gray"],["C4D0B0","Coriander"],["C4F4EB","Mint Tulip"],["C54B8C","Mulberry"],["C59922","Nugget"],["C5994B","Tussock"],["C5DBCA","Sea Mist"],["C5E17A","Yellow Green"],["C62D42","Brick Red"],["C6726B","Contessa"],["C69191","Oriental Pink"],["C6A84B","Roti"],["C6C3B5","Ash"],["C6C8BD","Kangaroo"],["C6E610","Las Palmas"],["C7031E","Monza"],["C71585","Red Violet"],["C7BCA2","Coral Reef"],["C7C1FF","Melrose"],["C7C4BF","Cloud"],["C7C9D5","Ghost"],["C7CD90","Pine Glade"],["C7DDE5","Botticelli"],["C88A65","Antique Brass"],["C8A2C8","Lilac"],["C8A528","Hokey Pokey"],["C8AABF","Lily"],["C8B568","Laser"],["C8E3D7","Edgewater"],["C96323","Piper"],["C99415","Pizza"],["C9A0DC","Light Wisteria"],["C9B29B","Rodeo Dust"],["C9B35B","Sundance"],["C9B93B","Earls Green"],["C9C0BB","Silver Rust"],["C9D9D2","Conch"],["C9FFA2","Reef"],["C9FFE5","Aero Blue"],["CA3435","Flush Mahogany"],["CABB48","Turmeric"],["CADCD4","Paris White"],["CAE00D","Bitter Lemon"],["CAE6DA","Skeptic"],["CB8FA9","Viola"],["CBCAB6","Foggy Gray"],["CBD3B0","Green Mist"],["CBDBD6","Nebula"],["CC3333","Persian Red"],["CC5500","Burnt Orange"],["CC7722","Ochre"],["CC8899","Puce"],["CCCAA8","Thistle Green"],["CCCCFF","Periwinkle"],["CCFF00","Electric Lime"],["CD5700","Tenn"],["CD5C5C","Chestnut Rose"],["CD8429","Brandy Punch"],["CDF4FF","Onahau"],["CEB98F","Sorrell Brown"],["CEBABA","Cold Turkey"],["CEC291","Yuma"],["CEC7A7","Chino"],["CFA39D","Eunry"],["CFB53B","Old Gold"],["CFDCCF","Tasman"],["CFE5D2","Surf Crest"],["CFF9F3","Humming Bird"],["CFFAF4","Scandal"],["D05F04","Red Stage"],["D06DA1","Hopbush"],["D07D12","Meteor"],["D0BEF8","Perfume"],["D0C0E5","Prelude"],["D0F0C0","Tea Green"],["D18F1B","Geebung"],["D1BEA8","Vanilla"],["D1C6B4","Soft Amber"],["D1D2CA","Celeste"],["D1D2DD","Mischka"],["D1E231","Pear"],["D2691E","Hot Cinnamon"],["D27D46","Raw Sienna"],["D29EAA","Careys Pink"],["D2B48C","Tan"],["D2DA97","Deco"],["D2F6DE","Blue Romance"],["D2F8B0","Gossip"],["D3CBBA","Sisal"],["D3CDC5","Swirl"],["D47494","Charm"],["D4B6AF","Clam Shell"],["D4BF8D","Straw"],["D4C4A8","Akaroa"],["D4CD16","Bird Flower"],["D4D7D9","Iron"],["D4DFE2","Geyser"],["D4E2FC","Hawkes Blue"],["D54600","Grenadier"],["D591A4","Can Can"],["D59A6F","Whiskey"],["D5D195","Winter Hazel"],["D5F6E3","Granny Apple"],["D69188","My Pink"],["D6C562","Tacha"],["D6CEF6","Moon Raker"],["D6D6D1","Quill Gray"],["D6FFDB","Snowy Mint"],["D7837F","New York Pink"],["D7C498","Pavlova"],["D7D0FF","Fog"],["D84437","Valencia"],["D87C63","Japonica"],["D8BFD8","Thistle"],["D8C2D5","Maverick"],["D8FCFA","Foam"],["D94972","Cabaret"],["D99376","Burning Sand"],["D9B99B","Cameo"],["D9D6CF","Timberwolf"],["D9DCC1","Tana"],["D9E4F5","Link Water"],["D9F7FF","Mabel"],["DA3287","Cerise"],["DA5B38","Flame Pea"],["DA6304","Bamboo"],["DA6A41","Red Damask"],["DA70D6","Orchid"],["DA8A67","Copperfield"],["DAA520","Golden Grass"],["DAECD6","Zanah"],["DAF4F0","Iceberg"],["DAFAFF","Oyster Bay"],["DB5079","Cranberry"],["DB9690","Petite Orchid"],["DB995E","Di Serria"],["DBDBDB","Alto"],["DBFFF8","Frosted Mint"],["DC143C","Crimson"],["DC4333","Punch"],["DCB20C","Galliano"],["DCB4BC","Blossom"],["DCD747","Wattle"],["DCD9D2","Westar"],["DCDDCC","Moon Mist"],["DCEDB4","Caper"],["DCF0EA","Swans Down"],["DDD6D5","Swiss Coffee"],["DDF9F1","White Ice"],["DE3163","Cerise Red"],["DE6360","Roman"],["DEA681","Tumbleweed"],["DEBA13","Gold Tips"],["DEC196","Brandy"],["DECBC6","Wafer"],["DED4A4","Sapling"],["DED717","Barberry"],["DEE5C0","Beryl Green"],["DEF5FF","Pattens Blue"],["DF73FF","Heliotrope"],["DFBE6F","Apache"],["DFCD6F","Chenin"],["DFCFDB","Lola"],["DFECDA","Willow Brook"],["DFFF00","Chartreuse Yellow"],["E0B0FF","Mauve"],["E0B646","Anzac"],["E0B974","Harvest Gold"],["E0C095","Calico"],["E0FFFF","Baby Blue"],["E16865","Sunglo"],["E1BC64","Equator"],["E1C0C8","Pink Flare"],["E1E6D6","Periglacial Blue"],["E1EAD4","Kidnapper"],["E1F6E8","Tara"],["E25465","Mandy"],["E2725B","Terracotta"],["E28913","Golden Bell"],["E292C0","Shocking"],["E29418","Dixie"],["E29CD2","Light Orchid"],["E2D8ED","Snuff"],["E2EBED","Mystic"],["E2F3EC","Apple Green"],["E30B5C","Razzmatazz"],["E32636","Alizarin Crimson"],["E34234","Cinnabar"],["E3BEBE","Cavern Pink"],["E3F5E1","Peppermint"],["E3F988","Mindaro"],["E47698","Deep Blush"],["E49B0F","Gamboge"],["E4C2D5","Melanie"],["E4CFDE","Twilight"],["E4D1C0","Bone"],["E4D422","Sunflower"],["E4D5B7","Grain Brown"],["E4D69B","Zombie"],["E4F6E7","Frostee"],["E4FFD1","Snow Flurry"],["E52B50","Amaranth"],["E5841B","Zest"],["E5CCC9","Dust Storm"],["E5D7BD","Stark White"],["E5D8AF","Hampton"],["E5E0E1","Bon Jour"],["E5E5E5","Mercury"],["E5F9F6","Polar"],["E64E03","Trinidad"],["E6BE8A","Gold Sand"],["E6BEA5","Cashmere"],["E6D7B9","Double Spanish White"],["E6E4D4","Satin Linen"],["E6F2EA","Harp"],["E6F8F3","Off Green"],["E6FFE9","Hint of Green"],["E6FFFF","Tranquil"],["E77200","Mango Tango"],["E7730A","Christine"],["E79F8C","Tonys Pink"],["E79FC4","Kobi"],["E7BCB4","Rose Fog"],["E7BF05","Corn"],["E7CD8C","Putty"],["E7ECE6","Gray Nurse"],["E7F8FF","Lily White"],["E7FEFF","Bubbles"],["E89928","Fire Bush"],["E8B9B3","Shilo"],["E8E0D5","Pearl Bush"],["E8EBE0","Green White"],["E8F1D4","Chrome White"],["E8F2EB","Gin"],["E8F5F2","Aqua Squeeze"],["E96E00","Clementine"],["E97451","Burnt Sienna"],["E97C07","Tahiti Gold"],["E9CECD","Oyster Pink"],["E9D75A","Confetti"],["E9E3E3","Ebb"],["E9F8ED","Ottoman"],["E9FFFD","Clear Day"],["EA88A8","Carissma"],["EAAE69","Porsche"],["EAB33B","Tulip Tree"],["EAC674","Rob Roy"],["EADAB8","Raffia"],["EAE8D4","White Rock"],["EAF6EE","Panache"],["EAF6FF","Solitude"],["EAF9F5","Aqua Spring"],["EAFFFE","Dew"],["EB9373","Apricot"],["EBC2AF","Zinnwaldite"],["ECA927","Fuel Yellow"],["ECC54E","Ronchi"],["ECC7EE","French Lilac"],["ECCDB9","Just Right"],["ECE090","Wild Rice"],["ECEBBD","Fall Green"],["ECEBCE","Aths Special"],["ECF245","Starship"],["ED0A3F","Red Ribbon"],["ED7A1C","Tango"],["ED9121","Carrot Orange"],["ED989E","Sea Pink"],["EDB381","Tacao"],["EDC9AF","Desert Sand"],["EDCDAB","Pancho"],["EDDCB1","Chamois"],["EDEA99","Primrose"],["EDF5DD","Frost"],["EDF5F5","Aqua Haze"],["EDF6FF","Zumthor"],["EDF9F1","Narvik"],["EDFC84","Honeysuckle"],["EE82EE","Lavender Magenta"],["EEC1BE","Beauty Bush"],["EED794","Chalky"],["EED9C4","Almond"],["EEDC82","Flax"],["EEDEDA","Bizarre"],["EEE3AD","Double Colonial White"],["EEEEE8","Cararra"],["EEEF78","Manz"],["EEF0C8","Tahuna Sands"],["EEF0F3","Athens Gray"],["EEF3C3","Tusk"],["EEF4DE","Loafer"],["EEF6F7","Catskill White"],["EEFDFF","Twilight Blue"],["EEFF9A","Jonquil"],["EEFFE2","Rice Flower"],["EF863F","Jaffa"],["EFEFEF","Gallery"],["EFF2F3","Porcelain"],["F091A9","Mauvelous"],["F0D52D","Golden Dream"],["F0DB7D","Golden Sand"],["F0DC82","Buff"],["F0E2EC","Prim"],["F0E68C","Khaki"],["F0EEFD","Selago"],["F0EEFF","Titan White"],["F0F8FF","Alice Blue"],["F0FCEA","Feta"],["F18200","Gold Drop"],["F19BAB","Wewak"],["F1E788","Sahara Sand"],["F1E9D2","Parchment"],["F1E9FF","Blue Chalk"],["F1EEC1","Mint Julep"],["F1F1F1","Seashell"],["F1F7F2","Saltpan"],["F1FFAD","Tidal"],["F1FFC8","Chiffon"],["F2552A","Flamingo"],["F28500","Tangerine"],["F2C3B2","Mandys Pink"],["F2F2F2","Concrete"],["F2FAFA","Black Squeeze"],["F34723","Pomegranate"],["F3AD16","Buttercup"],["F3D69D","New Orleans"],["F3D9DF","Vanilla Ice"],["F3E7BB","Sidecar"],["F3E9E5","Dawn Pink"],["F3EDCF","Wheatfield"],["F3FB62","Canary"],["F3FBD4","Orinoco"],["F3FFD8","Carla"],["F400A1","Hollywood Cerise"],["F4A460","Sandy brown"],["F4C430","Saffron"],["F4D81C","Ripe Lemon"],["F4EBD3","Janna"],["F4F2EE","Pampas"],["F4F4F4","Wild Sand"],["F4F8FF","Zircon"],["F57584","Froly"],["F5C85C","Cream Can"],["F5C999","Manhattan"],["F5D5A0","Maize"],["F5DEB3","Wheat"],["F5E7A2","Sandwisp"],["F5E7E2","Pot Pourri"],["F5E9D3","Albescent White"],["F5EDEF","Soft Peach"],["F5F3E5","Ecru White"],["F5F5DC","Beige"],["F5FB3D","Golden Fizz"],["F5FFBE","Australian Mint"],["F64A8A","French Rose"],["F653A6","Brilliant Rose"],["F6A4C9","Illusion"],["F6F0E6","Merino"],["F6F7F7","Black Haze"],["F6FFDC","Spring Sun"],["F7468A","Violet Red"],["F77703","Chilean Fire"],["F77FBE","Persian Pink"],["F7B668","Rajah"],["F7C8DA","Azalea"],["F7DBE6","We Peep"],["F7F2E1","Quarter Spanish White"],["F7F5FA","Whisper"],["F7FAF7","Snow Drift"],["F8B853","Casablanca"],["F8C3DF","Chantilly"],["F8D9E9","Cherub"],["F8DB9D","Marzipan"],["F8DD5C","Energy Yellow"],["F8E4BF","Givry"],["F8F0E8","White Linen"],["F8F4FF","Magnolia"],["F8F6F1","Spring Wood"],["F8F7DC","Coconut Cream"],["F8F7FC","White Lilac"],["F8F8F7","Desert Storm"],["F8F99C","Texas"],["F8FACD","Corn Field"],["F8FDD3","Mimosa"],["F95A61","Carnation"],["F9BF58","Saffron Mango"],["F9E0ED","Carousel Pink"],["F9E4BC","Dairy Cream"],["F9E663","Portica"],["F9EAF3","Amour"],["F9F8E4","Rum Swizzle"],["F9FF8B","Dolly"],["F9FFF6","Sugar Cane"],["FA7814","Ecstasy"],["FA9D5A","Tan Hide"],["FAD3A2","Corvette"],["FADFAD","Peach Yellow"],["FAE600","Turbo"],["FAEAB9","Astra"],["FAECCC","Champagne"],["FAF0E6","Linen"],["FAF3F0","Fantasy"],["FAF7D6","Citrine White"],["FAFAFA","Alabaster"],["FAFDE4","Hint of Yellow"],["FAFFA4","Milan"],["FB607F","Brink Pink"],["FB8989","Geraldine"],["FBA0E3","Lavender Rose"],["FBA129","Sea Buckthorn"],["FBAC13","Sun"],["FBAED2","Lavender Pink"],["FBB2A3","Rose Bud"],["FBBEDA","Cupid"],["FBCCE7","Classic Rose"],["FBCEB1","Apricot Peach"],["FBE7B2","Banana Mania"],["FBE870","Marigold Yellow"],["FBE96C","Festival"],["FBEA8C","Sweet Corn"],["FBEC5D","Candy Corn"],["FBF9F9","Hint of Red"],["FBFFBA","Shalimar"],["FC0FC0","Shocking Pink"],["FC80A5","Tickle Me Pink"],["FC9C1D","Tree Poppy"],["FCC01E","Lightning Yellow"],["FCD667","Goldenrod"],["FCD917","Candlelight"],["FCDA98","Cherokee"],["FCF4D0","Double Pearl Lusta"],["FCF4DC","Pearl Lusta"],["FCF8F7","Vista White"],["FCFBF3","Bianca"],["FCFEDA","Moon Glow"],["FCFFE7","China Ivory"],["FCFFF9","Ceramic"],["FD0E35","Torch Red"],["FD5B78","Wild Watermelon"],["FD7B33","Crusta"],["FD7C07","Sorbus"],["FD9FA2","Sweet Pink"],["FDD5B1","Light Apricot"],["FDD7E4","Pig Pink"],["FDE1DC","Cinderella"],["FDE295","Golden Glow"],["FDE910","Lemon"],["FDF5E6","Old Lace"],["FDF6D3","Half Colonial White"],["FDF7AD","Drover"],["FDFEB8","Pale Prim"],["FDFFD5","Cumulus"],["FE28A2","Persian Rose"],["FE4C40","Sunset Orange"],["FE6F5E","Bittersweet"],["FE9D04","California"],["FEA904","Yellow Sea"],["FEBAAD","Melon"],["FED33C","Bright Sun"],["FED85D","Dandelion"],["FEDB8D","Salomie"],["FEE5AC","Cape Honey"],["FEEBF3","Remy"],["FEEFCE","Oasis"],["FEF0EC","Bridesmaid"],["FEF2C7","Beeswax"],["FEF3D8","Bleach White"],["FEF4CC","Pipi"],["FEF4DB","Half Spanish White"],["FEF4F8","Wisp Pink"],["FEF5F1","Provincial Pink"],["FEF7DE","Half Dutch White"],["FEF8E2","Solitaire"],["FEF8FF","White Pointer"],["FEF9E3","Off Yellow"],["FEFCED","Orange White"],["FF0000","Red"],["FF007F","Rose"],["FF00CC","Purple Pizzazz"],["FF00FF","Magenta / Fuchsia"],["FF2400","Scarlet"],["FF3399","Wild Strawberry"],["FF33CC","Razzle Dazzle Rose"],["FF355E","Radical Red"],["FF3F34","Red Orange"],["FF4040","Coral Red"],["FF4D00","Vermilion"],["FF4F00","International Orange"],["FF6037","Outrageous Orange"],["FF6600","Blaze Orange"],["FF66FF","Pink Flamingo"],["FF681F","Orange"],["FF69B4","Hot Pink"],["FF6B53","Persimmon"],["FF6FFF","Blush Pink"],["FF7034","Burning Orange"],["FF7518","Pumpkin"],["FF7D07","Flamenco"],["FF7F00","Flush Orange"],["FF7F50","Coral"],["FF8C69","Salmon"],["FF9000","Pizazz"],["FF910F","West Side"],["FF91A4","Pink Salmon"],["FF9933","Neon Carrot"],["FF9966","Atomic Tangerine"],["FF9980","Vivid Tangerine"],["FF9E2C","Sunshade"],["FFA000","Orange Peel"],["FFA194","Mona Lisa"],["FFA500","Web Orange"],["FFA6C9","Carnation Pink"],["FFAB81","Hit Pink"],["FFAE42","Yellow Orange"],["FFB0AC","Cornflower Lilac"],["FFB1B3","Sundown"],["FFB31F","My Sin"],["FFB555","Texas Rose"],["FFB7D5","Cotton Candy"],["FFB97B","Macaroni and Cheese"],["FFBA00","Selective Yellow"],["FFBD5F","Koromiko"],["FFBF00","Amber"],["FFC0A8","Wax Flower"],["FFC0CB","Pink"],["FFC3C0","Your Pink"],["FFC901","Supernova"],["FFCBA4","Flesh"],["FFCC33","Sunglow"],["FFCC5C","Golden Tainoi"],["FFCC99","Peach Orange"],["FFCD8C","Chardonnay"],["FFD1DC","Pastel Pink"],["FFD2B7","Romantic"],["FFD38C","Grandis"],["FFD700","Gold"],["FFD800","School bus Yellow"],["FFD8D9","Cosmos"],["FFDB58","Mustard"],["FFDCD6","Peach Schnapps"],["FFDDAF","Caramel"],["FFDDCD","Tuft Bush"],["FFDDCF","Watusi"],["FFDDF4","Pink Lace"],["FFDEAD","Navajo White"],["FFDEB3","Frangipani"],["FFE1DF","Pippin"],["FFE1F2","Pale Rose"],["FFE2C5","Negroni"],["FFE5A0","Cream Brulee"],["FFE5B4","Peach"],["FFE6C7","Tequila"],["FFE772","Kournikova"],["FFEAC8","Sandy Beach"],["FFEAD4","Karry"],["FFEC13","Broom"],["FFEDBC","Colonial White"],["FFEED8","Derby"],["FFEFA1","Vis Vis"],["FFEFC1","Egg White"],["FFEFD5","Papaya Whip"],["FFEFEC","Fair Pink"],["FFF0DB","Peach Cream"],["FFF0F5","Lavender blush"],["FFF14F","Gorse"],["FFF1B5","Buttermilk"],["FFF1D8","Pink Lady"],["FFF1EE","Forget Me Not"],["FFF1F9","Tutu"],["FFF39D","Picasso"],["FFF3F1","Chardon"],["FFF46E","Paris Daisy"],["FFF4CE","Barley White"],["FFF4DD","Egg Sour"],["FFF4E0","Sazerac"],["FFF4E8","Serenade"],["FFF4F3","Chablis"],["FFF5EE","Seashell Peach"],["FFF5F3","Sauvignon"],["FFF6D4","Milk Punch"],["FFF6DF","Varden"],["FFF6F5","Rose White"],["FFF8D1","Baja White"],["FFF9E2","Gin Fizz"],["FFF9E6","Early Dawn"],["FFFACD","Lemon Chiffon"],["FFFAF4","Bridal Heath"],["FFFBDC","Scotch Mist"],["FFFBF9","Soapstone"],["FFFC99","Witch Haze"],["FFFCEA","Buttery White"],["FFFCEE","Island Spice"],["FFFDD0","Cream"],["FFFDE6","Chilean Heath"],["FFFDE8","Travertine"],["FFFDF3","Orchid White"],["FFFDF4","Quarter Pearl Lusta"],["FFFEE1","Half and Half"],["FFFEEC","Apricot White"],["FFFEF0","Rice Cake"],["FFFEF6","Black White"],["FFFEFD","Romance"],["FFFF00","Yellow"],["FFFF66","Laser Lemon"],["FFFF99","Pale Canary"],["FFFFB4","Portafino"],["FFFFF0","Ivory"],["FFFFFF","White"]];module.exports = { getColorName: C };

    return module.exports;
  })();

  // --- APCA CONTRAST CALCULATION ENGINE ---
  const APCA_CONSTANTS = {
    mainTRC: 2.4,
    sRco: 0.2126729,
    sGco: 0.7151522,
    sBco: 0.072175,
    normBG: 0.56,
    normTXT: 0.57,
    revTXT: 0.62,
    revBG: 0.65,
    blkThrs: 0.022,
    blkClmp: 1.414,
    scaleBoW: 1.14,
    scaleWoB: 1.14,
    loBoWoffset: 0.027,
    loWoBoffset: 0.027,
    deltaYmin: 0.0005,
    loClip: 0.1
  };

  function sRGBtoY(rgb) {
    if (!rgb) rgb = [0, 0, 0];
    function comp(c) { return Math.pow(c / 255, APCA_CONSTANTS.mainTRC); }
    return APCA_CONSTANTS.sRco * comp(rgb[0]) + APCA_CONSTANTS.sGco * comp(rgb[1]) + APCA_CONSTANTS.sBco * comp(rgb[2]);
  }

  function APCAcontrast(txtY, bgY, roundMode) {
    if (roundMode === undefined) roundMode = -1;
    const clampRange = [0, 1.1];
    if (isNaN(txtY) || isNaN(bgY) || Math.min(txtY, bgY) < clampRange[0] || Math.max(txtY, bgY) > clampRange[1]) return 0;
    let absVal = 0, output = 0;
    txtY = txtY > APCA_CONSTANTS.blkThrs ? txtY : txtY + Math.pow(APCA_CONSTANTS.blkThrs - txtY, APCA_CONSTANTS.blkClmp);
    bgY = bgY > APCA_CONSTANTS.blkThrs ? bgY : bgY + Math.pow(APCA_CONSTANTS.blkThrs - bgY, APCA_CONSTANTS.blkClmp);

    if (Math.abs(bgY - txtY) < APCA_CONSTANTS.deltaYmin) return 0;

    if (bgY > txtY) {
      absVal = (Math.pow(bgY, APCA_CONSTANTS.normBG) - Math.pow(txtY, APCA_CONSTANTS.normTXT)) * APCA_CONSTANTS.scaleBoW;
      output = absVal < APCA_CONSTANTS.loClip ? 0 : absVal - APCA_CONSTANTS.loBoWoffset;
    } else {
      absVal = (Math.pow(bgY, APCA_CONSTANTS.revBG) - Math.pow(txtY, APCA_CONSTANTS.revTXT)) * APCA_CONSTANTS.scaleWoB;
      output = absVal > -0.1 ? 0 : absVal + APCA_CONSTANTS.loWoBoffset;
    }
    return roundMode < 0 ? output * 100 : Math.round(Math.abs(output) * 100);
  }

  const APCA_TARGETS = [
    { number: 50,  apcaOnWhite: 0,   apcaOnBlack: -103 },
    { number: 100, apcaOnWhite: 5,   apcaOnBlack: -97 },
    { number: 200, apcaOnWhite: 16,  apcaOnBlack: -88 },
    { number: 300, apcaOnWhite: 28,  apcaOnBlack: -75 },
    { number: 400, apcaOnWhite: 42,  apcaOnBlack: -60 },
    { number: 500, apcaOnWhite: 55,  apcaOnBlack: -47 },
    { number: 600, apcaOnWhite: 67,  apcaOnBlack: -34 },
    { number: 700, apcaOnWhite: 78,  apcaOnBlack: -23 },
    { number: 800, apcaOnWhite: 86,  apcaOnBlack: -16 },
    { number: 900, apcaOnWhite: 92,  apcaOnBlack: -10 },
    { number: 950, apcaOnWhite: 101, apcaOnBlack: 0 }
  ];

  function findApcaLightness(targetApca, bgHex, colorHex) {
    const s = chroma(colorHex).get("hsl.h");
    const o = chroma(colorHex).get("hsl.s");
    let minDiff = 110;
    let bestL = 50;

    for (let l = 1; l < 100; l++) {
      const candidate = chroma(s, o, l / 100, "hsl").hex();
      const contrast = APCAcontrast(sRGBtoY(chroma(candidate).rgb()), sRGBtoY(chroma(bgHex).rgb()));
      const diff = Math.abs(Math.abs(targetApca) - Math.abs(contrast));
      if (diff < minDiff) {
        minDiff = diff;
        bestL = l;
      }
    }
    return chroma(s, o, bestL / 100, "hsl").hex();
  }

  // --- CORE SEARCH: FIND NEAREST HAND-CRAFTED SKELETON ---
  function findClosestReferencePalette(inputHex, candidatePalettes) {
    const palettesWithDelta = candidatePalettes.map(palette => {
      const shades = palette.shades.map(s => ({
        ...s,
        delta: chroma.deltaE(inputHex, s.hexcode)
      }));
      const closestShade = shades.reduce((best, curr) => curr.delta < best.delta ? curr : best);
      return {
        ...palette,
        shades,
        closestShade
      };
    });

    const bestPalette = palettesWithDelta.reduce((best, curr) =>
      curr.closestShade.delta < best.closestShade.delta ? curr : best
    );

    const inputL = chroma(inputHex).get("hsl.l");
    const shadesWithLightness = bestPalette.shades.map(s => ({
      ...s,
      lightnessDiff: Math.abs(chroma(s.hexcode).get("hsl.l") - inputL)
    }));

    const closestShadeLightness = shadesWithLightness.reduce((best, curr) =>
      curr.lightnessDiff < best.lightnessDiff ? curr : best
    );

    return {
      ...bestPalette,
      shades: shadesWithLightness,
      closestShadeLightness
    };
  }

  // --- GENERATION ALGORITHM ---
  function generate(inputHex, options) {
    if (!options) options = {};
    const mode = options.mode || 'original'; // 'original' | 'lockInputColor' | 'apca'
    const lockShade = options.lockShade || 500;

    // Normalize input to hex via chroma
    try {
      if (typeof inputHex !== 'string') inputHex = '#3b82f6';
      inputHex = inputHex.trim();
      if (!chroma.valid(inputHex) && chroma.valid('#' + inputHex)) {
        inputHex = '#' + inputHex;
      }
      inputHex = chroma(inputHex).hex();
    } catch (e) {
      inputHex = '#3b82f6';
    }

    const inputSat = chroma(inputHex).get("hsl.s");

    // Filter candidate palettes:
    // If saturation > 15%, exclude grays; if saturation <= 15%, ONLY use grays
    const candidates = [...TAILWIND_PALETTES, ...EXTRA_MUD_PALETTES]
      .filter(p => p.name !== "Neutral")
      .filter(p => {
        const isGray = p.name === "Slate" || p.name === "Gray" || p.name === "Zinc" || p.name === "Stone";
        return inputSat > 0.15 ? !isGray : isGray;
      });

    // Find nearest skeleton
    const ref = findClosestReferencePalette(inputHex, candidates);

    // Calculate relative projection deltas
    const inputHue = chroma(inputHex).get("hsl.h") || 0;
    const baseHue = chroma(ref.closestShadeLightness.hexcode).get("hsl.h") || 0;
    let deltaHue = inputHue - baseHue;

    const baseSat = chroma(ref.closestShadeLightness.hexcode).get("hsl.s");
    const satRatio = baseSat > 0 ? (chroma(inputHex).get("hsl.s") / baseSat) : 1;

    // Generate basic transformed shades
    let shades = ref.shades.map(s => {
      let hex = s.hexcode;
      let newSat = chroma(hex).get("hsl.s") * satRatio;
      let newHue = (chroma(hex).get("hsl.h") + deltaHue) % 360;
      if (newHue < 0) newHue += 360;

      hex = chroma(hex).set("hsl.s", newSat).hex();
      hex = chroma(hex).set("hsl.h", newHue).hex();

      const isLocked = ref.closestShadeLightness.number === s.number;
      if (isLocked) {
        hex = inputHex;
      }

      return {
        number: s.number,
        hexcode: hex,
        hsl: {
          hue: Math.round(chroma(hex).get("hsl.h")) || 0,
          saturation: Math.round(chroma(hex).get("hsl.s") * 100),
          lightness: Math.round(chroma(hex).get("hsl.l") * 100)
        },
        oklch: {
          lightness: Math.round(chroma(hex).get("oklch.l") * 100),
          chroma: Number(chroma(hex).get("oklch.c") * 100).toFixed(1),
          hue: Math.round(chroma(hex).get("oklch.h")) || 0
        },
        isLocked
      };
    });

    // Handle Mode: 'lockInputColor'
    if (mode === 'lockInputColor') {
      const shadeValues = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      const targetIdx = shadeValues.indexOf(Number(lockShade));
      const r = targetIdx === -1 ? 5 : targetIdx;

      const targetL = chroma(inputHex).get("hsl.l") * 100;
      const baseL = chroma(shades[r].hexcode).get("hsl.l") * 100;
      const deltaL = targetL - baseL;

      const targetS = chroma(inputHex).get("hsl.s") * 100;
      const baseS = chroma(shades[r].hexcode).get("hsl.s") * 100;
      const deltaS = targetS - baseS;

      const targetH = chroma(inputHex).get("hsl.h") || 0;
      const baseH = chroma(shades[r].hexcode).get("hsl.h") || 0;
      const deltaH = targetH - baseH;

      shades = shades.map(item => {
        const itemL = chroma(item.hexcode).get("hsl.l") * 100;
        let factor = 0;
        if (itemL < baseL + 1) {
          factor = itemL / baseL;
        } else {
          factor = (100 - itemL) / baseL;
        }
        factor = Math.min(1, factor);

        const finalL = (itemL + factor * deltaL) / 100;
        const finalS = (chroma(item.hexcode).get("hsl.s") * 100 + deltaS) / 100;
        let finalH = (chroma(item.hexcode).get("hsl.h") + deltaH) % 360;
        if (finalH < 0) finalH += 360;

        let hex = chroma(item.hexcode).set("hsl.l", finalL).hex();
        hex = chroma(hex).set("hsl.s", finalS).hex();
        hex = chroma(hex).set("hsl.h", finalH).hex();

        const isLocked = item.number == lockShade;
        if (isLocked) {
          hex = inputHex;
        }

        return {
          number: item.number,
          hexcode: hex,
          hsl: {
            hue: Math.round(chroma(hex).get("hsl.h")) || 0,
            saturation: Math.round(chroma(hex).get("hsl.s") * 100),
            lightness: Math.round(chroma(hex).get("hsl.l") * 100)
          },
          oklch: {
            lightness: Math.round(chroma(hex).get("oklch.l") * 100),
            chroma: Number(chroma(hex).get("oklch.c") * 100).toFixed(1),
            hue: Math.round(chroma(hex).get("oklch.h")) || 0
          },
          isLocked
        };
      });
    }

    // Handle Mode: 'apca'
    if (mode === 'apca') {
      shades = shades.map(s => {
        let hex = s.hexcode;
        if (s.number < 500) {
          const target = APCA_TARGETS.find(r => r.number == s.number).apcaOnBlack;
          hex = findApcaLightness(target, "#000000", hex);
        } else {
          const target = APCA_TARGETS.find(r => r.number == s.number).apcaOnWhite;
          hex = findApcaLightness(target, "#ffffff", hex);
        }

        return {
          number: s.number,
          hexcode: hex,
          hsl: {
            hue: Math.round(chroma(hex).get("hsl.h")) || 0,
            saturation: Math.round(chroma(hex).get("hsl.s") * 100),
            lightness: Math.round(chroma(hex).get("hsl.l") * 100)
          },
          oklch: {
            lightness: Math.round(chroma(hex).get("oklch.l") * 100),
            chroma: Number(chroma(hex).get("oklch.c") * 100).toFixed(1),
            hue: Math.round(chroma(hex).get("oklch.h")) || 0
          },
          isLocked: false
        };
      });
    }

    const colorName = getColorName(inputHex);

    return {
      name: colorName,
      slug: colorName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      inputHex,
      closestColorFamily: ref.name,
      mode,
      shades
    };
  }

  // --- EXPORTERS ---
  const exporters = {
    tailwindV3: function(palette) {
      const lines = palette.shades.map(function(s) {
        return "      " + s.number + ": '" + s.hexcode + "',";
      }).join('\n');
      return "// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        '" + palette.slug + "': {\n" + lines + "\n        }\n      }\n    }\n  }\n};";
    },
    tailwindV4: function(palette) {
      const lines = palette.shades.map(function(s) {
        return "  --color-" + palette.slug + "-" + s.number + ": " + s.hexcode + ";";
      }).join('\n');
      return "@theme {\n" + lines + "\n}";
    },
    cssVariables: function(palette) {
      const lines = palette.shades.map(function(s) {
        return "  --color-" + palette.slug + "-" + s.number + ": " + s.hexcode + ";";
      }).join('\n');
      return ":root {\n" + lines + "\n}";
    },
    json: function(palette) {
      const obj = {};
      palette.shades.forEach(function(s) { obj[s.number] = s.hexcode; });
      return JSON.stringify({ [palette.slug]: obj }, null, 2);
    }
  };

  return {
    chroma,
    getColorName,
    generate,
    generatePalette: generate,
    exporters,
    TAILWIND_PALETTES,
    EXTRA_MUD_PALETTES
  };
}));
