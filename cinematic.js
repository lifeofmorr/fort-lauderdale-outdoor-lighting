/* CINE-1 motion — reference reveal script (program assets/cinematic-ref.js)
   verbatim, plus the pilot-lesson 1.2s safety visibility timeout. */
(function(){
var root=document.documentElement;
root.classList.add('js-rv');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=window.matchMedia('(pointer: fine)').matches;
var rv=document.querySelectorAll('.rv');
function showAll(){for(var i=0;i<rv.length;i++){rv[i].classList.add('in');}}
if(reduce||!('IntersectionObserver' in window)){showAll();}
else{
var io=new IntersectionObserver(function(entries){
entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:0.15,rootMargin:'0px 0px -8% 0px'});
rv.forEach(function(el){io.observe(el);});
}
setTimeout(showAll,1200);
if(reduce||!fine){return;}
var hero=document.querySelector('.cine-hero');
var layers=document.querySelectorAll('[data-depth]');
if(hero&&layers.length){
var tx=0,ty=0,cx=0,cy=0,ticking=false;
function frame(){
cx+=(tx-cx)*0.08;cy+=(ty-cy)*0.08;
layers.forEach(function(el){
var d=parseFloat(el.getAttribute('data-depth'))||0;
var x=Math.max(-14,Math.min(14,cx*d*14));
var y=Math.max(-14,Math.min(14,cy*d*14));
el.style.transform='translate3d('+x.toFixed(2)+'px,'+y.toFixed(2)+'px,0)';
});
if(Math.abs(tx-cx)>0.001||Math.abs(ty-cy)>0.001){requestAnimationFrame(frame);}else{ticking=false;}
}
hero.addEventListener('pointermove',function(ev){
var r=hero.getBoundingClientRect();
tx=((ev.clientX-r.left)/r.width-0.5)*2;
ty=((ev.clientY-r.top)/r.height-0.5)*2;
if(!ticking){ticking=true;requestAnimationFrame(frame);}
});
hero.addEventListener('pointerleave',function(){tx=0;ty=0;if(!ticking){ticking=true;requestAnimationFrame(frame);}});
}
var cards=document.querySelectorAll('.tilt');
cards.forEach(function(card){
card.addEventListener('pointermove',function(ev){
var r=card.getBoundingClientRect();
var rx=((ev.clientY-r.top)/r.height-0.5)*-8;
var ry=((ev.clientX-r.left)/r.width-0.5)*8;
rx=Math.max(-4,Math.min(4,rx));ry=Math.max(-4,Math.min(4,ry));
card.style.transform='perspective(800px) rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg)';
});
card.addEventListener('pointerleave',function(){card.style.transform='';});
});
})();
