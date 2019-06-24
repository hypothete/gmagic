(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{28:function(e,n,t){e.exports=t(39)},33:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(16),i=t.n(r),c=(t(33),t(6)),l=t(7),s=t(9),u=t(8),d=t(10),p=t(2),m=t(5),f=t(3),h=t(4),v=t(1),b=["#000000","#1D2B53","#7E2553","#008751","#AB5236","#5F574F","#C2C3C7","#FFF1E8","#FF004D","#FFA300","#FFEC27","#00E436","#29ADFF","#83769C","#FF77A8","#FFCCAA"],O=t(11),g="ADD_COMMAND",y="REMOVE_COMMAND",j="MOVE_COMMAND_UP",x="MOVE_COMMAND_DOWN",E="MOVE_POINT",C="ADD_POINT",w="REMOVE_POINT",k="SET_COLOR",M="NAME_COMMAND",P="SET_PATTERN",D="ADD_BACKGROUND",N="SET_COMMANDS",I="MOVE_COMMAND",_="COPY_COMMAND",S="CHANGE_COMMAND_TYPE",T="SET_ACTIVE_COMMAND",A="SET_DRAWING_MODE",L="OPEN_MODAL",F="CLOSE_MODAL",R=0;function U(){var e=Object(p.a)(["\n  width: ","px;\n  height: ","px;\n  image-rendering: optimizeSpeed;\n  image-rendering: -moz-crisp-edges;\n  image-rendering: -webkit-optimize-contrast;\n  image-rendering: optimize-contrast;\n  image-rendering: pixelated;\n  -ms-interpolation-mode: nearest-neighbor;\n  z-index: 1;\n  background-color: white;\n  flex-shrink: 0;\n  margin: 50px;\n  box-shadow: 0px 10px 20px rgba(0,0,0,0.2);\n"]);return U=function(){return e},e}function z(){var e=Object(p.a)(["\n  position: absolute;\n  display: ",";\n  z-index: 3;\n  left: 10px;\n  top: 10px;\n"]);return z=function(){return e},e}function V(){var e=Object(p.a)(["\n  position: relative;\n  flex: 1;\n  height: 100%;\n  overflow: scroll;\n  display: flex;\n  justify-content: flex-start;\n  align-items: flex-start;\n  background-color: darkgray;\n  margin-right: 10px;\n"]);return V=function(){return e},e}var Y=f.a.div(V()),B=f.a.div(z(),function(e){return e.dragging?"none":"block"}),G=f.a.canvas(U(),function(e){return e.scale},function(e){return e.scale});function X(e,n,t){return Math.max(Math.min(t,e),n)}var W=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(s.a)(this,Object(u.a)(n).call(this,e))).renderCanvas=t.renderCanvas.bind(Object(v.a)(Object(v.a)(t))),t.handleMouseDown=t.handleMouseDown.bind(Object(v.a)(Object(v.a)(t))),t.handleMouseMove=t.handleMouseMove.bind(Object(v.a)(Object(v.a)(t))),t.handleMouseUp=t.handleMouseUp.bind(Object(v.a)(Object(v.a)(t))),t.handleClick=t.handleClick.bind(Object(v.a)(Object(v.a)(t))),t.handleContextMenu=t.handleContextMenu.bind(Object(v.a)(Object(v.a)(t))),t.zoomIn=t.zoomIn.bind(Object(v.a)(Object(v.a)(t))),t.zoomOut=t.zoomOut.bind(Object(v.a)(Object(v.a)(t))),t.state={dragIndex:-1,movingPoints:!1,scale:512,lastX:0,lastY:0},t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"componentDidMount",value:function(){this.refs.canvas.width=128,this.refs.canvas.height=128,this.ctx=this.refs.canvas.getContext("2d"),this.renderCanvas(this.props)}},{key:"componentWillReceiveProps",value:function(e){this.renderCanvas(e)}},{key:"zoomIn",value:function(){this.setState({scale:2*this.state.scale})}},{key:"zoomOut",value:function(){this.setState({scale:this.state.scale/2})}},{key:"fillPattern",value:function(e,n,t,a){var o=a[4*(n%4)+e%4];this.ctx.fillStyle=b[t[o?1:0]],this.ctx.fillRect(e,n,1,1)}},{key:"bresenham",value:function(e,n,t,a,o,r){for(var i,c=Math.abs(t-e),l=-Math.abs(a-n),s=e<t?1:-1,u=n<a?1:-1,d=e,p=n,m=c+l,f=0;;){if(++f>500){console.error("error drawing line ".concat(e,", ").concat(n," to ").concat(t,", ").concat(a));break}if(this.fillPattern(d,p,o,r),d===t&&p===a)break;(i=2*m)>=l&&(m+=l,d+=s),i<=c&&(m+=c,p+=u)}}},{key:"polygon",value:function(e,n,t){for(var a=e.length/2,o=[],r=[],i=0;i<e.length;i+=2)o.push(e[i]),r.push(e[i+1]),i<e.length-3&&this.bresenham(e[i],e[i+1],e[i+2],e[i+3],n,t);for(var c=0;c<this.refs.canvas.height;c++){for(var l=[],s=0,u=a-1,d=0;d<a;d++)(r[d]<c&&r[u]>=c||r[u]<c&&r[d]>=c)&&(l[s++]=o[d]+Math.round((c-r[d])/(r[u]-r[d]+1e-4)*(o[u]-o[d]))),u=d;for(var p=0;p<s-1;)if(l[p]>l[p+1]){var m=l[p];l[p]=l[p+1],l[p+1]=m,p&&p--}else p++;for(var f=0;f<s&&!(l[f]>=this.refs.canvas.width);f+=2)l[f+1]>0&&(l[f]<0&&(l[f]=0),l[f+1]>this.refs.canvas.width&&(l[f+1]=this.refs.canvas.width-1),this.bresenham(l[f],c,l[f+1],c,n,t))}}},{key:"renderCanvas",value:function(e){var n=this;this.ctx.clearRect(0,0,this.refs.canvas.width,this.refs.canvas.height);var t,a=e.commands,o=e.activeCommand;if(Object(h.a)(a).forEach(function(e){switch(e.type){case"POLYGON":n.polygon(e.points,e.colors,e.pattern);break;case"LINE":for(var a=0;a<e.points.length-3;a+=2){var r=e.points[a],i=e.points[a+1],c=e.points[a+2],l=e.points[a+3];n.bresenham(r,i,c,l,e.colors,e.pattern)}break;default:return}e.id===o&&(t=e)}),t){this.ctx.globalCompositeOperation="xor",this.ctx.strokeStyle=b[t.colors[0]];for(var r=0;r<t.points.length;r+=2){var i=t.points[r]-.5,c=t.points[r+1]-.5;this.ctx.strokeRect(i,c,2,2)}this.ctx.globalCompositeOperation="source-over"}}},{key:"convert",value:function(e){var n=this.refs.canvas.getBoundingClientRect();return{x:X(Math.floor(this.refs.canvas.width*(e.clientX-n.left)/n.width),0,this.refs.canvas.width),y:X(Math.floor(this.refs.canvas.height*(e.clientY-n.top)/n.height),0,this.refs.canvas.height)}}},{key:"dist",value:function(e,n){return Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2)}},{key:"getNearestPoint",value:function(e){for(var n=this,t=this.convert(e),a=this.props.commands.find(function(e){return e.id===n.props.activeCommand}),o=-1,r=0;r<a.points.length;r+=2){var i={x:a.points[r],y:a.points[r+1]};if(this.dist(i,t)<8){o=r;break}}return o}},{key:"handleClick",value:function(e){if(e.stopPropagation(),e.preventDefault(),null!==this.props.activeCommand&&"ADD_POINTS"===this.props.drawingMode){var n=this.convert(e),t=n.x,a=n.y;this.props.addPoint(this.props.activeCommand,t,a)}}},{key:"handleMouseDown",value:function(e){if(e.stopPropagation(),e.preventDefault(),null!==this.props.activeCommand)if("MOVE_POINTS"===this.props.drawingMode){var n=this.convert(e),t=n.x,a=n.y;this.setState({movingPoints:!0,lastX:t,lastY:a})}else if("EDIT_POINTS"===this.props.drawingMode){var o=this.getNearestPoint(e);o>=0&&this.setState({dragIndex:o})}}},{key:"handleMouseMove",value:function(e){if(e.stopPropagation(),e.preventDefault(),null!==this.props.activeCommand)if("EDIT_POINTS"===this.props.drawingMode&&this.state.dragIndex>=0){var n=this.convert(e),t=n.x,a=n.y;this.props.movePoint(this.props.activeCommand,this.state.dragIndex,t,a)}else if("MOVE_POINTS"===this.props.drawingMode&&this.state.movingPoints){var o=this.convert(e),r=o.x,i=o.y,c=r-this.state.lastX,l=i-this.state.lastY;this.props.moveCommand(this.props.activeCommand,c,l),this.setState({lastX:r,lastY:i})}}},{key:"handleMouseUp",value:function(e){e.stopPropagation(),e.preventDefault();var n=this.convert(e),t=n.x,a=n.y;this.setState({dragIndex:-1,movingPoints:!1,lastX:t,lastY:a})}},{key:"handleContextMenu",value:function(e){return e.stopPropagation(),e.preventDefault(),!1}},{key:"render",value:function(){return[o.a.createElement(Y,{key:"frame",onMouseUp:this.handleMouseUp,onMouseMove:this.handleMouseMove},o.a.createElement(G,{scale:this.state.scale,ref:"canvas",onMouseDown:this.handleMouseDown,onClick:this.handleClick,onContextMenu:this.handleContextMenu})),o.a.createElement(B,{key:"ctrls",dragging:this.state.dragIndex>-1},o.a.createElement("button",{onClick:this.zoomIn},o.a.createElement("span",{role:"img","aria-label":"zoom in"},"\u2795")),o.a.createElement("button",{onClick:this.zoomOut},o.a.createElement("span",{role:"img","aria-label":"zoom out"},"\u2796")))]}}]),n}(a.Component),J=Object(m.b)(function(e){return{commands:e.commands,activeCommand:e.activeCommand,drawingMode:e.drawingMode}},{addPoint:function(e,n,t){return{type:C,payload:{id:e,x:n,y:t}}},movePoint:function(e,n,t,a){return{type:E,payload:{id:e,index:n,x:t,y:a}}},removePoint:function(e,n){return{type:w,payload:{id:e,index:n}}},moveCommand:function(e,n,t){return{type:I,payload:{id:e,x:n,y:t}}}})(W);function H(){var e=Object(p.a)(["\n  width: 3em;\n  height: 3em;\n  margin: 5px;\n"]);return H=function(){return e},e}function K(){var e=Object(p.a)(["\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  background-color: ",";\n  border: 2px inset;\n"]);return K=function(){return e},e}function $(){var e=Object(p.a)(["\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  justify-content: center;\n  margin: 5px;\n"]);return $=function(){return e},e}function q(){var e=Object(p.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-right: 10px;\n  flex: 1;\n  height: 50%;\n"]);return q=function(){return e},e}function Q(){var e=Object(p.a)(["\n  display: flex;\n  height: 100%;\n  width: 3em;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  margin-right: 5px;\n"]);return Q=function(){return e},e}function Z(){var e=Object(p.a)(["\n  width: 100%;\n  border-bottom: 2px outset;\n  padding: 10px;\n  background-color: ","\n  display: flex;\n  justify-content: flex-end;\n"]);return Z=function(){return e},e}var ee={LINE:"\u2712\ufe0f",POLYGON:"\u2b50"},ne=f.a.div(Z(),function(e){return e.active?"darkgray":"white"}),te=f.a.div(Q()),ae=f.a.div(q()),oe=f.a.div($()),re=f.a.div(K(),function(e){return e.color}),ie=f.a.div(H()),ce=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(s.a)(this,Object(u.a)(n).call(this,e))).selectItem=t.selectItem.bind(Object(v.a)(Object(v.a)(t))),t.moveUp=t.moveUp.bind(Object(v.a)(Object(v.a)(t))),t.moveDown=t.moveDown.bind(Object(v.a)(Object(v.a)(t))),t.remove=t.remove.bind(Object(v.a)(Object(v.a)(t))),t.handleNameChange=t.handleNameChange.bind(Object(v.a)(Object(v.a)(t))),t.copy=t.copy.bind(Object(v.a)(Object(v.a)(t))),t.change=t.change.bind(Object(v.a)(Object(v.a)(t))),t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"selectItem",value:function(){this.props.activeCommand!==this.props.item.id?this.props.setActiveCommand(this.props.item):this.props.setActiveCommand({id:null})}},{key:"moveUp",value:function(e){e.stopPropagation(),this.props.moveCommandUp(this.props.item)}},{key:"moveDown",value:function(e){e.stopPropagation(),this.props.moveCommandDown(this.props.item)}},{key:"copy",value:function(e){e.stopPropagation(),this.props.copyCommand(this.props.item)}},{key:"change",value:function(e){e.stopPropagation(),this.props.changeCommandType(this.props.item.id)}},{key:"remove",value:function(e){e.stopPropagation(),this.props.removeCommand(this.props.item)}},{key:"handleNameChange",value:function(e){this.props.nameCommand(this.props.item.id,e.target.value)}},{key:"render",value:function(){var e=this.props,n=e.item,t=e.activeCommand;return o.a.createElement(ne,{onClick:this.selectItem,active:t===n.id},o.a.createElement("div",null,o.a.createElement(ae,null,o.a.createElement("span",{role:"img","aria-label":n.type},ee[n.type]),o.a.createElement("input",{type:"text",value:n.name,onChange:this.handleNameChange})),o.a.createElement(oe,null,o.a.createElement("button",{onClick:this.copy,title:"copy command"},o.a.createElement("span",{role:"img","aria-label":"copy command"},"\u2702\ufe0f")),o.a.createElement("button",{onClick:this.change,title:"change command type"},o.a.createElement("span",{role:"img","aria-label":"change command type"},"\u267b\ufe0f")),o.a.createElement("button",{onClick:this.remove,title:"remove command"},o.a.createElement("span",{role:"img","aria-label":"remove command"},"\ud83d\uddd1\ufe0f")))),o.a.createElement(ie,null,o.a.createElement(re,{color:b[n.colors[0]]}),o.a.createElement(re,{color:b[n.colors[1]]})),o.a.createElement(te,null,o.a.createElement("button",{onClick:this.moveUp,title:"move command up"},o.a.createElement("span",{role:"img","aria-label":"move command up"},"\ud83d\udd3c")),o.a.createElement("button",{onClick:this.moveDown,title:"move command down"},o.a.createElement("span",{role:"img","aria-label":"move command down"},"\ud83d\udd3d"))))}}]),n}(a.Component),le={setActiveCommand:function(e){return{type:T,payload:e.id}},moveCommandUp:function(e){return{type:j,payload:e}},moveCommandDown:function(e){return{type:x,payload:e}},removeCommand:function(e){return{type:y,payload:e}},nameCommand:function(e,n){return{type:M,payload:{id:e,name:n}}},copyCommand:function(e){return{type:_,payload:Object(O.a)({},e,{name:e.name+"-copy",id:++R})}},changeCommandType:function(e){return{type:S,payload:e}}},se=Object(m.b)(function(e){return{activeCommand:e.activeCommand}},le)(ce);function ue(){var e=Object(p.a)(["\n  border: 2px inset;\n  border-top: none;\n  width: 300px;\n  height: 100%;\n  overflow-y: scroll;\n  margin: 0 10px 0 0;\n  padding-top: 10px;\n"]);return ue=function(){return e},e}var de=f.a.div(ue()),pe=function(e){function n(){return Object(c.a)(this,n),Object(s.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(d.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){var e=this.props.commands;return o.a.createElement(de,null,e.map(function(e){return o.a.createElement(se,{key:e.id,item:e})}))}}]),n}(a.Component),me=Object(m.b)(function(e){return{commands:e.commands}})(pe);function fe(){var e=Object(p.a)(["\n  width: 20px;\n  height: 20px;\n  background-color: ",";\n  border: 2px  ",";\n  border-color:  ",";\n"]);return fe=function(){return e},e}function he(){var e=Object(p.a)(["\n  margin: 10px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n"]);return he=function(){return e},e}var ve=f.a.div(he()),be=f.a.div(fe(),function(e){return e.color},function(e){return e.active?"dashed":"inset"},function(e){return e.active?"black":"auto"}),Oe=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(s.a)(this,Object(u.a)(n).call(this,e))).state={activeIndex:-1},t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"componentWillReceiveProps",value:function(e){var n=e.commands.find(function(n){return n.id===e.activeCommand});n&&this.setState({activeIndex:n.colors[e.index]})}},{key:"render",value:function(){var e=this,n=this.props,t=n.activeCommand,a=n.setColor,r=n.index;return o.a.createElement(ve,null,b.map(function(n,i){return o.a.createElement(be,{color:n,key:i,active:e.state.activeIndex===i,onClick:function(){a(t,i,r)}})}))}}]),n}(a.Component),ge=Object(m.b)(function(e){return{activeCommand:e.activeCommand,commands:e.commands}},{setColor:function(e,n,t){return{type:k,payload:{id:e,color:n,index:t}}}})(Oe);function ye(){var e=Object(p.a)(["\n  width: 25%;\n  height: 25%;\n  float: left;\n  margin: 0;\n"]);return ye=function(){return e},e}function je(){var e=Object(p.a)(["\n  width: 100px;\n  height: 100px;\n"]);return je=function(){return e},e}var xe=f.a.div(je()),Ee=f.a.input(ye()),Ce=function(e){function n(e){var t;Object(c.a)(this,n),t=Object(s.a)(this,Object(u.a)(n).call(this,e));var a=e.commands.find(function(n){return n.id===e.activeCommand});return t.state=a?{values:Object(h.a)(a.pattern)}:{values:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]},t.toggleValue=t.toggleValue.bind(Object(v.a)(Object(v.a)(t))),t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"componentWillReceiveProps",value:function(e){var n=e.commands.find(function(n){return n.id===e.activeCommand});n&&this.setState({values:Object(h.a)(n.pattern)})}},{key:"toggleValue",value:function(e){this.props.setPattern(this.props.activeCommand,this.state.values.map(function(n,t){return t===e?!n:n}))}},{key:"render",value:function(){var e=this;return o.a.createElement(xe,null,this.state.values.map(function(n,t){return o.a.createElement(Ee,{type:"checkbox",key:t,checked:n,onChange:function(){e.toggleValue(t)}})}))}}]),n}(a.Component),we=Object(m.b)(function(e){return{activeCommand:e.activeCommand,commands:e.commands}},{setPattern:function(e,n){return{type:P,payload:{id:e,pattern:n}}}})(Ce);function ke(){var e=Object(p.a)(["\n  min-height: 30px;\n"]);return ke=function(){return e},e}function Me(){var e=Object(p.a)(["\n  margin: 0px 5px 5px 5px;\n  border-width: 2px;\n  border-color: ",";\n  cursor: pointer;\n"]);return Me=function(){return e},e}function Pe(){var e=Object(p.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: flex-start;\n"]);return Pe=function(){return e},e}function De(){var e=Object(p.a)(["\n  margin: 10px;\n  flex: 1;\n  min-height: 100px;\n  z-index: 2;\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  justify-content: space-between;\n  overflow-y: scroll;\n  padding: 0 10px;\n"]);return De=function(){return e},e}var Ne=f.a.div(De()),Ie=f.a.div(Pe()),_e=f.a.button(Me(),function(e){return e.active?"blue":"none"}),Se=f.a.div(ke()),Te=function(e){function n(){return Object(c.a)(this,n),Object(s.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(d.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){var e=this.props,n=e.addCommand,t=e.activeCommand,r=e.setDrawingMode,i=e.drawingMode,c=e.addBackground,l=e.openModal;return o.a.createElement(Ne,null,o.a.createElement(Ie,null,o.a.createElement(Se,null,o.a.createElement(_e,{onClick:function(){n("LINE")}},o.a.createElement("span",{role:"img","aria-label":"add line"},"\u2712\ufe0f Add Line")),o.a.createElement(_e,{onClick:function(){n("POLYGON")}},o.a.createElement("span",{role:"img","aria-label":"add polygon"},"\u2b50 Add Polygon")),o.a.createElement(_e,{onClick:function(){c()}},o.a.createElement("span",{role:"img","aria-label":"add background"},"\ud83d\uddbc\ufe0f Add Background")),o.a.createElement(_e,{onClick:function(){l()}},o.a.createElement("span",{role:"img","aria-label":"open export modal"},"\ud83d\udcbe Import/Export")),o.a.createElement("a",{href:"//github.com/hypothete/gmagic",target:"_blank",rel:"noreferrer noopener"},o.a.createElement(_e,null,o.a.createElement("span",{role:"img","aria-label":"go to help readme"},"\u2753 Help")))),o.a.createElement(Se,null,null!==t&&o.a.createElement(a.Fragment,null,o.a.createElement(_e,{onClick:function(){r("ADD_POINTS")},active:"ADD_POINTS"===i},o.a.createElement("span",{role:"img","aria-label":"add points"},"\u2795 Add Points")),o.a.createElement(_e,{onClick:function(){r("EDIT_POINTS")},active:"EDIT_POINTS"===i},o.a.createElement("span",{role:"img","aria-label":"edit points"},"\ud83d\udccd Edit Points")),o.a.createElement(_e,{onClick:function(){r("MOVE_POINTS")},active:"MOVE_POINTS"===i},o.a.createElement("span",{role:"img","aria-label":"move points"},"\ud83d\udd79\ufe0f Move Points"))))),o.a.createElement(Ie,null,o.a.createElement(ge,{index:0}),o.a.createElement(ge,{index:1})),o.a.createElement(Ie,null,o.a.createElement(we,null)))}}]),n}(a.Component),Ae=Object(m.b)(function(e){return{activeCommand:e.activeCommand,drawingMode:e.drawingMode}},{addCommand:function(e){return{type:g,payload:{type:e,id:++R}}},addBackground:function(){return{type:D,payload:{type:"POLYGON",id:++R}}},setDrawingMode:function(e){return{type:A,payload:e}},openModal:function(){return{type:L}}})(Te);function Le(){var e=Object(p.a)(["\n  cursor: pointer;\n"]);return Le=function(){return e},e}function Fe(){var e=Object(p.a)(["\n  padding: 10px;\n"]);return Fe=function(){return e},e}function Re(){var e=Object(p.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 10px;\n\n  p {\n    margin: 0 10px 0 0;\n  }\n"]);return Re=function(){return e},e}function Ue(){var e=Object(p.a)(["\n  background-color: #fff;\n  box-shadow: 0px 10px 20px rgba(0,0,0,0.1);\n  cursor: auto;\n"]);return Ue=function(){return e},e}function ze(){var e=Object(p.a)(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0,0,0,0.5);\n  z-index: 5;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);return ze=function(){return e},e}var Ve=f.a.div(ze()),Ye=f.a.div(Ue()),Be=f.a.div(Re()),Ge=f.a.div(Fe()),Xe=f.a.div(Le()),We=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(s.a)(this,Object(u.a)(n).call(this,e))).exitModal=t.exitModal.bind(Object(v.a)(Object(v.a)(t))),t.importFile=t.importFile.bind(Object(v.a)(Object(v.a)(t))),t}return Object(d.a)(n,e),Object(l.a)(n,[{key:"importFile",value:function(e){var n=this,t=new FileReader;t.onload=function(e){var t=JSON.parse(e.target.result);n.props.setCommands(t),n.props.closeModal()},t.readAsText(e.target.files[0])}},{key:"calculatePattern",value:function(e){var n=0;return e.forEach(function(e,t){var a=0;e&&t>0?a=Math.pow(2,15-t):e&&(a-=32768),n+=a}),n}},{key:"compressToPico",value:function(e){var n=this,t="function()\n";return e.forEach(function(e){"POLYGON"===e.type?t+=" poly(":"LINE"===e.type&&(t+=" pline(");var a=16*e.colors[1]+e.colors[0],o=n.calculatePattern(e.pattern);t+="'".concat(e.points.join(","),"', 0x").concat(a.toString(16),", ").concat(o,")\n")}),t+="end\n"}},{key:"exitModal",value:function(e){e.stopPropagation(),this.props.closeModal()}},{key:"render",value:function(){var e=this.props,n=e.commands;if(!e.modalOpen)return null;var t=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),a=new Blob([this.compressToPico(n)],{type:"text/plain"}),r=window.URL.createObjectURL(t),i=window.URL.createObjectURL(a);return o.a.createElement(Ve,null,o.a.createElement(Ye,null,o.a.createElement(Be,null,o.a.createElement("p",null,"Import and export data"),o.a.createElement(Xe,{onClick:this.exitModal},o.a.createElement("span",{role:"img","aria-label":"exit modal button"},"\u274c"))),o.a.createElement(Ge,null,o.a.createElement("p",null,"Import JSON: ",o.a.createElement("input",{type:"file",onChange:this.importFile})),o.a.createElement("p",null,o.a.createElement("a",{download:"gmagic_drawing.json",href:r},"Download JSON")),o.a.createElement("p",null,o.a.createElement("a",{download:"gmagic_drawing.txt",href:i},"Download PICO-8 code")))))}}]),n}(a.Component),Je=Object(m.b)(function(e){return{commands:e.commands,modalOpen:e.modalOpen}},{closeModal:function(){return{type:F}},setCommands:function(e){return{type:N,payload:e}}})(We);function He(){var e=Object(p.a)(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  display: flex;\n  flex-direction: column;\n"]);return He=function(){return e},e}function Ke(){var e=Object(p.a)(["\n  width: 100%;\n  height: 80vh;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin: 0;\n"]);return Ke=function(){return e},e}var $e=f.a.div(Ke()),qe=f.a.div(He()),Qe=function(e){function n(){return Object(c.a)(this,n),Object(s.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(d.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){return o.a.createElement(qe,null,o.a.createElement($e,null,o.a.createElement(J,null),o.a.createElement(me,null)),o.a.createElement(Ae,null),o.a.createElement(Je,null))}}]),n}(a.Component),Ze=Object(m.b)(function(e){return{}})(Qe);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var en=t(14),nn={commands:[{id:12345,name:"Background",type:"POLYGON",points:[0,0,127,0,127,127,0,127],colors:[6,7],pattern:[!0,!0,!1,!1,!0,!0,!1,!1,!1,!1,!0,!0,!1,!1,!0,!0]}],activeCommand:null,drawingMode:"EDIT_POINTS",modalOpen:!1};var tn=Object(en.b)({commands:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:nn.commands,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case g:return[].concat(Object(h.a)(e),[{id:n.payload.id,name:"cmd-".concat(n.payload.id),type:n.payload.type,points:[],colors:[0,7],pattern:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]}]);case y:return Object(h.a)(e.filter(function(e){return e.id!==n.payload.id}));case D:return[{id:n.payload.id,name:"Background-".concat(n.payload.id),type:n.payload.type,points:[0,0,127,0,127,127,0,127],colors:[7,0],pattern:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]}].concat(Object(h.a)(e));case j:var t=e.findIndex(function(e){return e.id===n.payload.id});if(t<=0)return Object(h.a)(e);var a=e[t];return[].concat(Object(h.a)(e.slice(0,t-1)),[Object(O.a)({},a),Object(O.a)({},e[t-1])],Object(h.a)(e.slice(t+1)));case x:var o=e.findIndex(function(e){return e.id===n.payload.id});if(o<0||o===e.length-1)return Object(h.a)(e);var r=e[o];return[].concat(Object(h.a)(e.slice(0,o)),[Object(O.a)({},e[o+1]),Object(O.a)({},r)],Object(h.a)(e.slice(o+2)));case E:var i=n.payload,c=i.id,l=i.index,s=i.x,u=i.y;return e.map(function(e){return e.id===c?Object(O.a)({},e,{points:e.points.map(function(e,n){return n===l?s:n===l+1?u:e})}):e});case C:var d=n.payload,p=d.id,m=d.x,f=d.y;return e.map(function(e){return e.id===p?Object(O.a)({},e,{points:[].concat(Object(h.a)(e.points),[m,f])}):e});case w:var v=n.payload,b=v.id,T=v.index;return e.map(function(e){return e.id===b?Object(O.a)({},e,{points:e.points.splice(T,2)}):e});case k:var A=n.payload,L=A.id,F=A.color,R=A.index;return e.map(function(e){return e.id===L?Object(O.a)({},e,{colors:e.colors.map(function(e,n){return R===n?F:e})}):e});case M:var U=n.payload,z=U.id,V=U.name;return e.map(function(e){return e.id===z?Object(O.a)({},e,{name:V}):e});case P:var Y=n.payload,B=Y.id,G=Y.pattern;return e.map(function(e){return e.id===B?Object(O.a)({},e,{pattern:Object(h.a)(G)}):e});case N:return Object(h.a)(n.payload);case I:var X=n.payload,W=X.id,J=X.x,H=X.y;return e.map(function(e){return e.id===W?Object(O.a)({},e,{points:e.points.map(function(e,n){return n%2===0?e+J:e+H})}):e});case _:var K=n.payload;return[].concat(Object(h.a)(e),[K]);case S:return e.map(function(e){return e.id===n.payload?Object(O.a)({},e,{type:"POLYGON"===e.type?"LINE":"POLYGON"}):e});default:return e}},activeCommand:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:nn.activeCommand,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case T:return n.payload;case g:return n.payload.id;case y:return n.payload.id===e?null:e;case _:return n.payload.id;default:return e}},drawingMode:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:nn.drawingMode,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case A:return n.payload;case T:return"EDIT_POINTS";case g:return"ADD_POINTS";default:return e}},modalOpen:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:nn.modalOpen;switch((arguments.length>1?arguments[1]:void 0).type){case L:return!0;case F:return!1;default:return e}}}),an=Object(en.c)(tn,nn,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),on=document.getElementById("root");i.a.render(o.a.createElement(m.a,{store:an},o.a.createElement(Ze,null)),on),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[28,2,1]]]);
//# sourceMappingURL=main.d9d091ec.chunk.js.map