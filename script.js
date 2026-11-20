// ====== PERSONALIZA AQUÍ ======
const INVITADO = "D";       // nombre de tu invitado/a
const HORA = "Cuando tengas hambre";  // hora de la cena
const WA = "5353850111";    // WhatsApp de Romi (53 + 53850111)
// ===============================
const ROMI = "romi.png"; // imagen de Romi (PNG con fondo transparente)
const $=id=>document.getElementById(id), stage=$('stage'), btns=$('btns'), text=$('text');
let hop=0, shake=0;

/* ---------- Escena 3D: habitación azul con mesa de madera ---------- */
(function(){
try{
  const cvs=$('gl'), W=()=>stage.clientWidth, H=()=>stage.clientHeight;
  const r=new THREE.WebGLRenderer({canvas:cvs,antialias:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2)); r.outputEncoding=THREE.sRGBEncoding;
  r.shadowMap.enabled=true; r.shadowMap.type=THREE.PCFSoftShadowMap;
  const sc=new THREE.Scene(), cam=new THREE.PerspectiveCamera(38,1,.1,60);
  const look=new THREE.Vector3(0,1.5,0);
  const tex=(w,h,fn,rx=1,ry=1)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);
    const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.anisotropy=4;return t};
  const wood=(base,seams,rx,ry)=>tex(512,512,(c,w,h)=>{c.fillStyle=base;c.fillRect(0,0,w,h);
    for(let i=0;i<280;i++){c.strokeStyle='rgba(60,30,10,'+(.05+Math.random()*.13)+')';c.lineWidth=1+Math.random()*2;c.beginPath();
      const y=Math.random()*h;c.moveTo(0,y);c.bezierCurveTo(w*.3,y+Math.random()*10-5,w*.6,y+Math.random()*10-5,w,y+Math.random()*6-3);c.stroke()}
    if(seams)for(let k=0;k<4;k++){c.fillStyle='rgba(30,15,5,.55)';c.fillRect(0,k*h/4,w,3)}},rx,ry);
  const M=(o)=>new THREE.MeshStandardMaterial(o);
  const add=(geo,mat,x,y,z,cast=true,recv=true)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=recv;sc.add(m);return m};
  const Bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d), Cy=(a,b,h,s=24)=>new THREE.CylinderGeometry(a,b,h,s), Sp=(r)=>new THREE.SphereGeometry(r,20,16);

  // paredes y piso
  add(new THREE.PlaneGeometry(16,12),M({map:wood('#b07a45',true,3,3),roughness:.55}),0,0,1,false,true).rotation.x=-Math.PI/2;
  const wallT=tex(256,256,(c,w,h)=>{c.fillStyle='#3a67b0';c.fillRect(0,0,w,h);for(let x=0;x<w;x+=32){c.fillStyle='rgba(255,255,255,.07)';c.fillRect(x,0,16,h)}
    for(let i=0;i<900;i++){c.fillStyle='rgba(255,255,255,'+Math.random()*.04+')';c.fillRect(Math.random()*w,Math.random()*h,2,2)}},7,3);
  add(new THREE.PlaneGeometry(16,7),M({map:wallT,roughness:.9}),0,3.5,-3.3,false,true);
  const side=add(new THREE.PlaneGeometry(12,7),M({map:wallT,roughness:.9}),-8,3.5,1,false,true);side.rotation.y=Math.PI/2;
  const side2=add(new THREE.PlaneGeometry(12,7),M({map:wallT,roughness:.9}),8,3.5,1,false,true);side2.rotation.y=-Math.PI/2;
  add(Bx(16,1.1,.08),M({color:0x2b5192,roughness:.8}),0,.55,-3.25);               // friso inferior
  add(Bx(16,.12,.14),M({color:0xf5efe0,roughness:.5}),0,1.12,-3.22);              // moldura
  add(Bx(16,.3,.12),M({color:0xf5efe0,roughness:.5}),0,.15,-3.22);                // zócalo
  // cuadro y ventana
  add(Bx(1.5,1.05,.08),M({color:0x7a4a22,roughness:.5}),-2.6,3.3,-3.22);
  add(new THREE.PlaneGeometry(1.3,.88),new THREE.MeshBasicMaterial({map:tex(130,88,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#f7d9a0');g.addColorStop(1,'#e98d5a');c.fillStyle=g;c.fillRect(0,0,w,h);
    c.fillStyle='#fff3c8';c.beginPath();c.arc(90,34,14,0,7);c.fill();c.fillStyle='#2f4a6e';c.beginPath();c.moveTo(0,h);c.lineTo(40,48);c.lineTo(80,h);c.fill();c.fillStyle='#223a5a';c.beginPath();c.moveTo(50,h);c.lineTo(100,40);c.lineTo(w,h);c.fill()})}),-2.6,3.3,-3.17,false,false);
  const win=tex(64,64,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#bfe3ff');g.addColorStop(1,'#fff6df');c.fillStyle=g;c.fillRect(0,0,w,h)});
  add(Bx(1.7,2.2,.1),M({color:0xf5efe0,roughness:.5}),2.8,3.2,-3.22);
  add(new THREE.PlaneGeometry(1.5,2),new THREE.MeshBasicMaterial({map:win}),2.8,3.2,-3.16,false,false);
  add(Bx(.06,2,.04),M({color:0xf5efe0}),2.8,3.2,-3.13,false,false);add(Bx(1.5,.06,.04),M({color:0xf5efe0}),2.8,3.2,-3.13,false,false);
  // lámpara colgante
  add(Cy(.01,.01,2),M({color:0x222222}),0,5.6,-1.9,false,false);
  const lamp=add(new THREE.ConeGeometry(.55,.4,28,1,true),M({color:0xf2b84b,roughness:.4,metalness:.3,side:THREE.DoubleSide}),0,4.5,-1.9,false,false);
  add(Sp(.14),new THREE.MeshBasicMaterial({color:0xfff2c2}),0,4.42,-1.9,false,false);

  // mesa de madera
  const tw=wood('#a8713a',false,1,1), WM=M({map:tw,roughness:.45});
  add(Bx(5.6,.16,1.8),WM,0,1.0,-1.9);
  add(Bx(5.4,.12,1.6),M({map:tw,roughness:.5,color:0x8a5a2b}),0,.88,-1.9);
  [[-2.6,-1.2],[2.6,-1.2],[-2.6,-2.6],[2.6,-2.6]].forEach(p=>add(Bx(.17,.92,.17),WM,p[0],.46,p[1]));
  add(Bx(4.8,.012,.75),M({color:0xf6eedb,roughness:.9}),0,1.085,-1.9,false,true); // camino de mesa
  const TY=1.09;
  // platos
  [-1.6,1.6].forEach(x=>{add(Cy(.36,.3,.03,40),M({color:0xffffff,roughness:.25}),x,TY+.015,-1.5);add(Cy(.2,.2,.032,40),M({color:0xe9eef7,roughness:.3}),x,TY+.02,-1.5)});
  // copas
  const prof=[[0,0],[.15,0],[.15,.02],[.02,.05],[.02,.3],[.08,.36],[.11,.5],[.1,.62],[.085,.66]].map(p=>new THREE.Vector2(p[0],p[1]));
  const gl=M({color:0xd8ecff,transparent:true,opacity:.38,roughness:.05,metalness:.1,side:THREE.DoubleSide});
  [-1.05,1.05,2.3].forEach((x,i)=>{const g=add(new THREE.LatheGeometry(prof,28),gl,x,TY,i==2?-2.2:-1.6);if(i!=2)add(Cy(.095,.08,.16,20),M({color:0x7a1530,roughness:.2}),x,TY+.46,-1.6,false,false)});
  // botella de vino
  add(Cy(.14,.14,.7,28),M({color:0x1c3a2a,roughness:.15,metalness:.4}),1.95,TY+.35,-2.1);
  add(new THREE.CylinderGeometry(.045,.14,.2,28),M({color:0x1c3a2a,roughness:.15,metalness:.4}),1.95,TY+.8,-2.1);
  add(Cy(.045,.045,.22,20),M({color:0x1c3a2a,roughness:.15,metalness:.4}),1.95,TY+.98,-2.1);
  add(Cy(.142,.142,.3,28),M({color:0xf4ecd8,roughness:.8}),1.95,TY+.32,-2.1,false,false);
  add(Cy(.05,.05,.07,20),M({color:0x8b1a2e}),1.95,TY+1.1,-2.1,false,false);
  // velas
  const flames=[];
  [-1.25,1.3].forEach((x,i)=>{add(Cy(.12,.14,.3,22),M({color:0xe9e0c8}),x,TY+.2,-2.1);add(Cy(.04,.04,.4,16),M({color:0xf6eedb,roughness:.7}),x,TY+.5,-2.1);
    const f=add(Sp(.05),new THREE.MeshBasicMaterial({color:0xffc060}),x,TY+.76,-2.1,false,false);f.scale.y=1.7;
    const pl=new THREE.PointLight(0xffa850,.9,4);pl.position.set(x,TY+.9,-1.9);sc.add(pl);flames.push([f,pl])});
  // florero
  const vp=[[0,0],[.15,0],[.22,.25],[.12,.5],[.14,.62],[.1,.62],[.08,.5]].map(p=>new THREE.Vector2(p[0],p[1]));
  add(new THREE.LatheGeometry(vp,28),M({color:0xf3f6fb,roughness:.2,side:THREE.DoubleSide}),-2.1,TY,-2.1);
  [[0,.9,0xe36b8f],[.12,.8,0xf7c6d4],[-.13,.82,0xffffff],[.04,1.02,0xf2b84b],[-.06,.72,0xe36b8f]].forEach(f=>{
    add(Cy(.01,.01,f[1]-.5),M({color:0x3f7a43}),-2.1+f[0]*.7,TY+.5+(f[1]-.5)/2,-2.1,false,false);add(Sp(.1),M({color:f[2],roughness:.6}),-2.1+f[0],TY+f[1],-2.1)});

  // personaje (plano con recorte) y sombra de contacto
  const shT=tex(128,64,(c,w,h)=>{const g=c.createRadialGradient(w/2,h/2,2,w/2,h/2,w/2);g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,w,h)});
  const sh=add(new THREE.PlaneGeometry(2.5,1.05),new THREE.MeshBasicMaterial({map:shT,transparent:true,depthWrite:false}),0,.012,.44,false,false);sh.rotation.x=-Math.PI/2;
  let romi;const CH=3.3;
  new THREE.TextureLoader().load(ROMI,t=>{t.encoding=THREE.sRGBEncoding;t.anisotropy=8;
    const pg=new THREE.PlaneGeometry(CH*t.image.width/t.image.height,CH);pg.translate(0,CH/2,0);romi=new THREE.Mesh(pg,new THREE.MeshBasicMaterial({map:t,transparent:true,alphaTest:.04,color:0xf2ece4}));
    romi.position.set(0,-.02,.5);sc.add(romi);const fb=$('fb');fb&&fb.remove()});

  // luces
  sc.add(new THREE.HemisphereLight(0xdfeaff,0x8a6a4a,.75));
  const dl=new THREE.DirectionalLight(0xfff0d8,.8);dl.position.set(3,6,5);dl.castShadow=true;dl.shadow.mapSize.set(1024,1024);
  Object.assign(dl.shadow.camera,{left:-6,right:6,top:6,bottom:-6});dl.shadow.bias=-.0005;sc.add(dl);
  const lp=new THREE.PointLight(0xffd59a,1.1,9);lp.position.set(0,4.2,-1.2);sc.add(lp);

  let mx=0,my=0;stage.addEventListener('pointermove',e=>{const b=stage.getBoundingClientRect();mx=(e.clientX-b.left)/b.width-.5;my=(e.clientY-b.top)/b.height-.5});
  const size=()=>{r.setSize(W(),H(),false);cam.aspect=W()/H();cam.updateProjectionMatrix()};size();addEventListener('resize',size);
  const clock=new THREE.Clock();
  (function loop(){requestAnimationFrame(loop);const t=clock.getElapsedTime();
    cam.position.set(mx*.6,1.75-my*.15,7.2);cam.lookAt(look);
    if(romi){romi.scale.y=1+Math.sin(t*2.2)*.008+hop*.04*Math.abs(Math.sin(t*10));romi.rotation.y=mx*.1;romi.rotation.z=Math.sin(t*45)*shake*.04}
    hop*=.95;shake*=.93;
    flames.forEach((f,i)=>{const k=1+Math.sin(t*9+i*2)*.1+Math.random()*.05;f[0].scale.set(k,1.7*k,k);f[1].intensity=.8*k});
    r.render(sc,cam)})();
}catch(e){stage.insertAdjacentHTML('beforeend','<img id="fb" alt="Romi" src="'+ROMI+'">')}
})();
const face=(ex,pose,mk='')=>{$('mark').textContent=mk;if(ex=='happy')hop=1;if(ex=='shock')shake=1};

/* ---------- Motor del juego ---------- */
let typer,menu='';
function say(msg,cb){clearInterval(typer);text.textContent='';btns.innerHTML='';let i=0;
  typer=setInterval(()=>{text.textContent=msg.slice(0,++i);if(i>=msg.length){clearInterval(typer);cb&&cb()}},22)}
function btn(label,fn,alt){const b=document.createElement('button');b.textContent=label;if(alt)b.className='alt';b.onclick=fn;btns.appendChild(b);return b}
const hud=(l,s)=>{$('lvl').textContent=l;$('score').textContent=s};

function start(){
  hud('INVITACIÓN','♥ ♥ ♥'); face('happy','wave','!');
  say('¡Hola '+INVITADO+'! Um... quería invitarte a cenar el martes. Ah, y un vinito viene incluido: ya lo compré y todo (me costó muchísimo no abrirlo antes de tiempo).',
    ()=>btn('Continuar',menuStep));
}

function menuStep(){
  $('title').style.display='none'; hud('MENÚ','♥ ♥ ♥'); face('think','idle','?');
  say('De menú, pues, te presento dos opciones, ya que tú serás la chef, jejeje... aunque prometo ayudar (prometo, no garantizo talento). Escoge la que más te guste:',()=>{
    const pick=(m,r)=>()=>{menu=m;face('happy','idle','♥');say(r,()=>btn('Continuar',dressStep))};
    btn('🍚 Congrí con picadillo y ensalada de zanahoria',pick('Arroz congrí con picadillo y ensalada de zanahoria','Pues tengo en cuenta el arroz congrí con picadillo y la ensalada de zanahoria. Muy buena elección, y ya me dio hambre solo de pensarlo.'));
    btn('🍗 Congrí con pollito en salsa y ensalada de zanahoria',pick('Arroz congrí con pollito en salsa y ensalada de zanahoria','Pues tengo en cuenta el arroz congrí con pollito en salsa y la ensalada de zanahoria. Muy buena elección, y ya me dio hambre solo de pensarlo.'));
  });
}

function dressStep(){
  hud('VESTIMENTA','♥ ♥ ♥'); face('idle','idle','');
  say('Ah, y el código de vestimenta es informal: en chancletas. Cero etiqueta, máxima comodidad.',()=>btn('Continuar',finalStep));
}

function finalStep(){
  hud('RESPUESTA','♥ ♥ ♥'); face('happy','wave','!');
  say('Entonces... ¿aceptas mi pequeña propuesta de una cena en equipo? Con una copa de vino y buena compañía, sería una noche muy bonita.',()=>{
    btn('💕 Acepto la propuesta',win);
    const no=btn('Mejor no...',()=>{},true);
    const dodge=()=>{no.style.position='absolute';no.style.left=Math.random()*Math.max(btns.clientWidth-no.offsetWidth,1)+'px';no.style.top=(Math.random()*40-20)+'px'};
    no.addEventListener('mouseenter',dodge);no.addEventListener('focus',dodge);
    no.addEventListener('touchstart',e=>{e.preventDefault();dodge()},{passive:false});
  });
}

function win(){
  for(let i=0;i<26;i++){const c=document.createElement('div');c.className='confetti';c.textContent=['✨','🎉','🍷','⭐'][i%4];
    c.style.left=Math.random()*95+'%';c.style.animationDelay=(Math.random()*1.5)+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),5000)}
  const msg='¡Hola Romi! Soy '+INVITADO+' 🎟️\nAcepto tu propuesta de cena en equipo el martes 24 de noviembre.\nMenú que escogí: '+menu+'.\nCódigo de vestimenta: informal, en chancletas 🩴\n¡Nos vemos con vinito!';
  let bars='';for(let i=0;i<46;i++)bars+='<i style="width:'+(1+Math.floor(Math.random()*4))+'px"></i>';
  $('game').innerHTML=
   '<div class="ticket"><div class="tk top"><div class="tkh"><img src="'+ROMI+'" alt="Romi"><div><h2>Cena con Romi</h2><span>Cena en equipo para dos</span></div></div>'+
   '<div class="rows"><div><small>Fecha</small><strong>Martes 24 de noviembre</strong></div><div><small>Hora</small><strong>'+HORA+'</strong></div>'+
   '<div class="full"><small>Lugar</small><strong>En casa de '+INVITADO+' (el amor de mi vida)</strong></div>'+
   '<div class="full"><small>Menú</small><strong>'+menu+'</strong></div>'+
   '<div><small>Bebida</small><strong>Vinito incluido</strong></div><div><small>Dress code</small><strong>Informal, en chancletas</strong></div>'+
   '<div class="full"><small>Ayudante oficial</small><strong>Romi (que se le olvida echarle el pollo al arroz con pollo)</strong></div></div></div>'+
   '<div class="perf"></div><div class="tk b bot"><div class="bars">'+bars+'</div><p>N.º 2411-CENA · No reembolsable, sí repetible</p></div></div>'+
   '<a class="cta" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent(msg)+'">📲 Enviar mi respuesta a Romi por WhatsApp</a>'+
   '<button class="alt again" onclick="location.reload()">↻ Volver a empezar</button>';
}
start();
