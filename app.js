const products=[
{id:1,name:"Noir Runner X",cat:"shoes",price:4999,old:5999,tag:"NEW",rating:"4.8",desc:"Low-profile street runner with sculpted sole and everyday cushioning.",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"},
{id:2,name:"Mono Chrono 02",cat:"watches",price:6999,old:7999,tag:"DROP",rating:"4.9",desc:"Minimal chronograph with a brushed case and black dial.",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"},
{id:3,name:"Heavyweight Core Tee",cat:"apparel",price:1499,old:1999,tag:"ESSENTIAL",rating:"4.7",desc:"240 GSM oversized cotton tee built for a structured fit.",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"},
{id:4,name:"Signal Crossbody",cat:"accessories",price:2299,old:2799,tag:"NEW",rating:"4.8",desc:"Compact utility bag with multiple compartments.",img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"},
{id:5,name:"Shadow 01",cat:"shoes",price:5799,old:6499,tag:"TRENDING",rating:"4.9",desc:"Chunky monochrome silhouette with layered panels.",img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85"},
{id:6,name:"Arc Automatic",cat:"watches",price:8999,old:10999,tag:"LIMITED",rating:"4.9",desc:"Statement watch with a clean architectural face.",img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85"},
{id:7,name:"Backkdrop Oversized",cat:"apparel",price:1799,old:2199,tag:"BESTSELLER",rating:"4.8",desc:"Signature oversized tee with heavyweight fabric.",img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85"},
{id:8,name:"Utility Cap",cat:"accessories",price:999,old:1299,tag:"NEW",rating:"4.6",desc:"Six-panel everyday cap with adjustable back strap.",img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85"},
{id:9,name:"Aero Street Low",cat:"shoes",price:4299,old:4999,tag:"HOT",rating:"4.7",desc:"Clean low-top sneaker designed for daily city movement.",img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85"},
{id:10,name:"Steelline 38",cat:"watches",price:7499,old:8999,tag:"NEW",rating:"4.8",desc:"Slim steel profile for a sharp minimal look.",img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85"},
{id:11,name:"Core Zip Hoodie",cat:"apparel",price:2899,old:3499,tag:"FALL",rating:"4.9",desc:"Relaxed heavyweight hoodie with a clean full-zip front.",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"},
{id:12,name:"Frame Sunglasses",cat:"accessories",price:1599,old:1999,tag:"NEW",rating:"4.7",desc:"Angular everyday frames with UV-protection lenses.",img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85"}
];

let cart=[];
let wishlist=[];
try{wishlist=JSON.parse(storageGet("backkdrop-wishlist","[]")||"[]")}catch(e){wishlist=[]}if(!Array.isArray(wishlist))wishlist=[]
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const storageGet=(key,fallback=null)=>{try{const v=localStorage.getItem(key);return v===null?fallback:v}catch(e){return fallback}};
const storageSet=(key,value)=>{try{localStorage.setItem(key,value);return true}catch(e){return false}};
const storageRemove=key=>{try{localStorage.removeItem(key)}catch(e){}};

function toast(msg){
 const t=$("#toast"); if(!t)return;
 t.textContent=msg;t.classList.add("show");
 clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>t.classList.remove("show"),1800);
}

function renderProducts(list=products){
 const el=$("#products");if(!el)return;
 el.innerHTML=list.map(p=>{
  const saved=wishlist.includes(p.id);
  return `<article class="product reveal show" data-product-id="${p.id}">
   <div class="product-img" style="background-image:url('${p.img}')" data-product-id="${p.id}" onclick="openProduct(${p.id})">
     <span class="tag">${p.tag}</span>
     <button class="quick" onclick="event.stopPropagation();addToCart(${p.id})" aria-label="Add ${p.name}">+</button>
     <button class="heart ${saved?'saved':''}" onclick="event.stopPropagation();toggleWishlist(${p.id})" aria-label="Save ${p.name}">${saved?'♥':'♡'}</button>
   </div>
   <div class="product-info" onclick="openProduct(${p.id})">
     <div class="rating">★ ${p.rating}</div><h3>${p.name}</h3><p>${p.desc}</p>
     <div class="price">${money(p.price)} <del>${money(p.old)}</del></div>
     <button class="add" onclick="event.stopPropagation();addToCart(${p.id})">ADD TO BAG</button>
   </div>
  </article>`
 }).join("");
}

function openProduct(id){
 const p=products.find(x=>x.id===id);if(!p)return;
 $("#detailTag").textContent=p.tag;$("#detailRating").textContent="★ "+p.rating;$("#detailName").textContent=p.name;$("#detailDesc").textContent=p.desc;$("#detailPrice").textContent=money(p.price);
 $("#productDetailImage").style.backgroundImage=`url('${p.img}')`;
 $("#detailAdd").onclick=()=>{addToCart(p.id);closeProduct()};$("#detailWishlist").onclick=()=>{toggleWishlist(p.id);updateDetailWishlist(p.id)};updateDetailWishlist(p.id);
 $("#productModal").classList.add("open");document.body.classList.add("modal-open");
}
function updateDetailWishlist(id){const b=$("#detailWishlist");if(b)b.textContent=wishlist.includes(id)?"♥ SAVED":"♡ SAVE"}
function closeProduct(){$("#productModal")?.classList.remove("open");if(!$(".modal.open"))document.body.classList.remove("modal-open")}
function toggleWishlist(id){
 wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];storageSet("backkdrop-wishlist",JSON.stringify(wishlist));
 const c=$("#wishlistCount");if(c)c.textContent=wishlist.length;renderProducts(products.filter(p=>{const active=$(".filters button.active")?.dataset.filter||"all";return active==="all"||p.cat===active}));renderWishlist();toast(wishlist.includes(id)?"Saved to wishlist ✓":"Removed from wishlist");updateDetailWishlist(id);
}
function renderWishlist(){const el=$("#wishlistItems");if(!el)return;const items=products.filter(p=>wishlist.includes(p.id));el.innerHTML=items.length?items.map(p=>`<article class="wish-item"><div style="background-image:url('${p.img}')"></div><section><b>${p.name}</b><span>${money(p.price)}</span><button onclick="openProduct(${p.id})">VIEW ↗</button><button onclick="toggleWishlist(${p.id})">REMOVE</button></section></article>`).join(""):`<div class="empty-wishlist">Nothing saved yet.<br><small>Tap the heart on any piece you like.</small></div>`}

function updateCart(){
 const count=$("#bagCount");if(count)count.textContent=cart.length;
 const items=$("#cartItems");
 if(items)items.innerHTML=cart.length?cart.map((p,i)=>`
   <div class="cart-item"><div class="mini" style="background:url('${p.img}') center/cover"></div>
   <div><b>${p.name}</b><div>${money(p.price)}</div><small onclick="removeCart(${i})" style="color:#777;cursor:pointer">Remove</small></div></div>`).join("")
   :"<p style='color:#666'>Your bag is empty.</p>";
 const total=cart.reduce((a,p)=>a+p.price,0);
 if($("#total"))$("#total").textContent=money(total);
}

function removeCart(i){cart.splice(i,1);updateCart();toast("Removed from bag")}

function addToCart(id){
 const p=products.find(x=>x.id===id);if(!p)return;
 cart.push(p);updateCart();toast(p.name+" added to bag");
 const badge=$("#bagCount"),bag=$("#bagBtn");
 if(badge){badge.classList.remove("bag-bounce");void badge.offsetWidth;badge.classList.add("bag-bounce")}
 const source=document.querySelector(`[data-product-id="${p.id}"] .product-img`);
 if(source&&bag){
   const a=source.getBoundingClientRect(),b=bag.getBoundingClientRect();
   const fly=document.createElement("div");
   fly.className="fly-item";
   fly.style.backgroundImage=`url('${p.img}')`;
   fly.style.left=(a.left+a.width/2-46)+"px";
   fly.style.top=(a.top+a.height/2-46)+"px";
   fly.style.width="92px";fly.style.height="92px";
   document.body.appendChild(fly);
   const dx=b.left+b.width/2-(a.left+a.width/2);
   const dy=b.top+b.height/2-(a.top+a.height/2);
   requestAnimationFrame(()=>{
     fly.animate([
       {transform:"translate3d(0,0,0) scale(.9) rotate(0deg)",opacity:1,offset:0},
       {transform:`translate3d(${dx*.52}px,${dy*.36-35}px,0) scale(.62) rotate(-5deg)`,opacity:.96,offset:.52},
       {transform:`translate3d(${dx}px,${dy}px,0) scale(.16) rotate(10deg)`,opacity:0,offset:1}
     ],{duration:760,easing:"cubic-bezier(.16,1,.3,1)",fill:"forwards"});
   });
   setTimeout(()=>{fly.remove();bag.classList.remove("bag-impact");void bag.offsetWidth;bag.classList.add("bag-impact")},760);
 }
}

function initTheme(){
 const btn=$("#themeBtn"),saved=storageGet("backkdrop-theme");
 if(saved==="light")document.body.classList.add("light");
 const sync=()=>{if(btn)btn.textContent=document.body.classList.contains("light")?"☾":"☼"};
 sync();if(btn)btn.onclick=()=>{document.body.classList.toggle("light");storageSet("backkdrop-theme",document.body.classList.contains("light")?"light":"dark");sync();toast(document.body.classList.contains("light")?"Light mode enabled":"Dark mode enabled")};
}

function initSearch(){
 const panel=$("#searchPanel"),input=$("#searchInput"),results=$("#searchResults");
 if(!panel)return;
 $("#searchBtn")?.addEventListener("click",()=>{panel.classList.add("open");setTimeout(()=>input?.focus(),100)});
 panel.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>panel.classList.remove("open")));
 input?.addEventListener("input",e=>{
  const q=e.target.value.toLowerCase().trim(),list=products.filter(p=>(p.name+" "+p.cat+" "+p.desc).toLowerCase().includes(q));
  if(results)results.innerHTML=list.slice(0,8).map(p=>`<button class="search-result" type="button" onclick="openProduct(${p.id});document.getElementById('searchPanel').classList.remove('open')"><span>${p.name}</span><b>${money(p.price)}</b></button>`).join("") || `<div class="search-empty">No pieces found.</div>`;
 });
}

function initFilters(){
 $$(".filters button").forEach(b=>b.onclick=()=>{$$(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter==="all"?products:products.filter(p=>p.cat===b.dataset.filter))});
}

function initAnimations(){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.08});
 $$(".reveal").forEach(x=>io.observe(x));
}

function closeAllOverlays(){
  ["wishlistPanel","cart","mobileMenu","searchPanel","productModal","authModal","profileModal","checkoutModal"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.classList.remove("open");
  });
  const chat=document.getElementById("chat");
  if(chat){chat.classList.remove("open");chat.setAttribute("aria-hidden","true");}
  document.body.classList.remove("modal-open");
}

function initProductDetail(){
  $("#productClose")?.addEventListener("click",closeProduct);
  $$(".size").forEach(b=>b.addEventListener("click",()=>{$$(".size").forEach(x=>x.classList.remove("active"));b.classList.add("active")}));
  $("#productModal")?.addEventListener("click",e=>{if(e.target.id==="productModal")closeProduct()});
  $("#wishlistPanel")?.addEventListener("click",e=>{if(e.target.id==="wishlistPanel")closeWishlist()});
  $("#cart")?.addEventListener("click",e=>{if(e.target.id==="cart")closeCart()});
  $("#searchPanel")?.addEventListener("click",e=>{if(e.target.id==="searchPanel")$("#searchPanel")?.classList.remove("open")});
}
function closeWishlist(){const p=$("#wishlistPanel");if(p){p.classList.remove("open");p.setAttribute("aria-hidden","true")}}
function closeCart(){$("#cart")?.classList.remove("open")}

function initCart(){
  $("#bagBtn")?.addEventListener("click",()=>{$("#cart")?.classList.add("open")});
  $("#wishlistBtn")?.addEventListener("click",()=>{const p=$("#wishlistPanel");if(p){p.classList.add("open");p.setAttribute("aria-hidden","false");renderWishlist()}});
  $("#wishlistClose")?.addEventListener("click",closeWishlist);
  $("#cartClose")?.addEventListener("click",closeCart);
  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    closeProduct();closeWishlist();closeCart();$("#mobileMenu")?.classList.remove("open");$("#searchPanel")?.classList.remove("open");
    $("#authModal")?.classList.remove("open");$("#profileModal")?.classList.remove("open");$("#checkoutModal")?.classList.remove("open");
    const chat=$("#chat");chat?.classList.remove("open");chat?.setAttribute("aria-hidden","true");
    document.body.classList.remove("modal-open");
  });
}

function initDropTimer(){
 const timer=$("#timer");if(!timer)return;
 let end=Date.now()+7*60*60*1000+12*60*1000+44*1000;
 setInterval(()=>{let x=Math.max(0,end-Date.now()),h=Math.floor(x/36e5),m=Math.floor(x/6e4)%60,s=Math.floor(x/1e3)%60;timer.textContent=[h,m,s].map(v=>String(v).padStart(2,"0")).join(":")},1000);
}

function initStyleFinder(){
 const map={street:["shoes","accessories"],minimal:["watches","apparel"],luxury:["watches","apparel"],sport:["shoes"]};
 const copy={street:"Your backdrop: sharp sneakers, utility accessories and movement-ready layers.",minimal:"Your backdrop: quiet watches, clean essentials and timeless proportions.",luxury:"Your backdrop: statement watches and refined silhouettes with less noise.",sport:"Your backdrop: lightweight sneakers and pieces built around movement."};
 $$(".style-buttons button").forEach(b=>b.onclick=()=>{const style=b.dataset.style;renderProducts(products.filter(p=>map[style].includes(p.cat)));if($("#styleResult"))$("#styleResult").textContent=copy[style];toast("Backdrop built: "+style.toUpperCase());$("#shop")?.scrollIntoView({behavior:"smooth"})});
}

function initChat(){
 const chat=$("#chat");if(!chat)return;
 const open=()=>{chat.classList.add("open");chat.setAttribute("aria-hidden","false")};
 const close=()=>{chat.classList.remove("open");chat.setAttribute("aria-hidden","true")};
 $("#chatOpen")?.addEventListener("click",open);
 $("#chatClose")?.addEventListener("click",close);
 $("#chatBackdrop")?.addEventListener("click",close);
 document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 function reply(q){q=q.toLowerCase();if(/shoe|sneaker/.test(q))return"Try Noir Runner X or Shadow 01. Tell me your usual size and style for a more specific pick.";if(q.includes("watch"))return"Mono Chrono 02 is a clean everyday option; Arc Automatic is the statement piece.";if(/cheap|budget|price/.test(q))return"Our collection starts at ₹999. Try Accessories or use the category filters.";if(q.includes("shipping"))return"Demo mode: connect your courier backend before production.";return"Tell me what you want: shoes, watches, apparel, accessories, budget, or style."}
 function send(){const input=$("#chatInput"),q=input?.value.trim();if(!q)return;const m=$("#messages");m.innerHTML+=`<div class="user">${q}</div>`;input.value="";setTimeout(()=>{m.innerHTML+=`<div class="bot">${reply(q)}</div>`;m.scrollTop=m.scrollHeight},350)}
 $("#sendChat")?.addEventListener("click",send);$("#chatInput")?.addEventListener("keydown",e=>{if(e.key==="Enter")send()});
}

function initAuth(){
 const modal=$("#authModal"),account=$("#accountBtn"),profile=$("#profileModal");if(!modal)return;
 const switchAuth=tab=>{$$(".auth-tab").forEach(x=>x.classList.toggle("active",x.dataset.auth===tab));$("#loginForm")?.classList.toggle("hidden",tab!=="login");$("#signupForm")?.classList.toggle("hidden",tab!=="signup");$("#authSuccess")?.classList.add("hidden")};
 const close=()=>{modal.classList.remove("open");document.body.classList.remove("modal-open")};
 const open=tab=>{modal.classList.add("open");document.body.classList.add("modal-open");switchAuth(tab)};
 let user=null;try{user=JSON.parse(storageGet("backkdrop-user","null")||"null")}catch(e){}
 const sync=()=>{if(account){account.textContent=user?user.name.split(" ")[0]:"Account";account.classList.toggle("logged",!!user)}};
 const openProfile=()=>{if(!user)return open("login");$("#profileName").value=user.name||"";$("#profileEmail").value=user.email||"";$("#profilePhone").value=user.phone||"";$("#profileAvatar").textContent=(user.name||"BK").split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase();profile?.classList.add("open");document.body.classList.add("modal-open")};
 sync();account?.addEventListener("click",openProfile);
 $$("[data-auth]").forEach(b=>b.onclick=()=>switchAuth(b.dataset.auth));
 $$("[data-close-auth]").forEach(b=>b.onclick=close);
 $$(".show-pass").forEach(b=>b.onclick=()=>{const i=$("#"+b.dataset.target);i.type=i.type==="password"?"text":"password";b.textContent=i.type==="password"?"Show":"Hide"});
 const valid=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
 $("#loginSubmit")?.addEventListener("click",()=>{const e=$("#loginEmail").value.trim(),p=$("#loginPassword").value;if(!valid(e)||p.length<4)return toast("Enter a valid email and 4+ character password");const b=$("#loginSubmit");b.disabled=true;b.textContent="SIGNING IN…";setTimeout(()=>{user={name:e.split("@")[0],email:e,phone:""};storageSet("backkdrop-user",JSON.stringify(user));sync();$("#loginForm").classList.add("hidden");$("#authSuccess").classList.remove("hidden");b.disabled=false;b.textContent="LOGIN ↗"},650)});
 $("#signupSubmit")?.addEventListener("click",()=>{const n=$("#signupName").value.trim(),e=$("#signupEmail").value.trim(),p=$("#signupPassword").value;if(n.length<2||!valid(e)||p.length<6)return toast("Add name, valid email and 6+ character password");const b=$("#signupSubmit");b.disabled=true;b.textContent="CREATING…";setTimeout(()=>{user={name:n,email:e,phone:""};storageSet("backkdrop-user",JSON.stringify(user));sync();$("#signupForm").classList.add("hidden");$("#authSuccess").classList.remove("hidden");b.disabled=false;b.textContent="CREATE ACCOUNT ↗"},750)});
 $("#profileClose")?.addEventListener("click",()=>{profile.classList.remove("open");document.body.classList.remove("modal-open")});
 $("#profileForm")?.addEventListener("submit",e=>{e.preventDefault();if(!user)return;user={...user,name:$("#profileName").value.trim(),email:$("#profileEmail").value.trim(),phone:$("#profilePhone").value.trim()};if(user.name.length<2||!valid(user.email))return toast("Enter a valid name and email");storageSet("backkdrop-user",JSON.stringify(user));sync();$("#profileAvatar").textContent=user.name.split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase();toast("Profile updated ✓")});
 $("#logoutBtn")?.addEventListener("click",()=>{user=null;storageRemove("backkdrop-user");sync();profile?.classList.remove("open");document.body.classList.remove("modal-open");toast("Logged out ✓")});
}

function initCheckout(){
 const modal=$("#checkoutModal");if(!modal)return;
 let step=1;
 const show=n=>{$$(".checkout-step").forEach(x=>x.classList.toggle("active",Number(x.dataset.step)===n));$$(".step-dot").forEach((x,i)=>x.classList.toggle("active",i<n));step=n};
 $("#checkoutBtn")?.addEventListener("click",()=>{
  if(!cart.length)return toast("Your bag is empty");
  $("#cart")?.classList.remove("open");modal.classList.add("open");document.body.classList.add("modal-open");show(1);
  $("#checkoutSummary").innerHTML=cart.map(p=>`<div class="summary-row"><span>${p.name}</span><b>${money(p.price)}</b></div>`).join("");
  $("#checkoutTotal").textContent=money(cart.reduce((a,p)=>a+p.price,0));
 });
 $("#checkoutClose")?.addEventListener("click",()=>{modal.classList.remove("open");document.body.classList.remove("modal-open")});
 $$(".next-step").forEach((b,i)=>b.onclick=()=>show(i+2));
 $$(".payment-option").forEach(b=>b.onclick=()=>{$$(".payment-option").forEach(x=>x.classList.remove("active"));b.classList.add("active")});
 $("#placeOrder")?.addEventListener("click",()=>{const b=$("#placeOrder");b.disabled=true;b.innerHTML='<span class="spinner"></span> PROCESSING…';setTimeout(()=>{$$(".checkout-step").forEach(x=>x.classList.remove("active"));$(".order-success")?.classList.remove("hidden");$("#orderNumber").textContent="BK"+Math.floor(100000+Math.random()*899999);cart=[];updateCart();b.disabled=false},1000)});
 $("#finishCheckout")?.addEventListener("click",()=>{modal.classList.remove("open");document.body.classList.remove("modal-open");$(".order-success")?.classList.add("hidden");show(1)});
}


function initOpening(){
 const nodes=$$("body > *:not(.noise)");nodes.forEach((el,i)=>{el.animate([{filter:"blur(9px)",opacity:.35},{filter:"blur(0)",opacity:1}],{duration:700,delay:Math.min(i*25,180),easing:"cubic-bezier(.2,.8,.2,1)",fill:"both"})});document.body.classList.remove("starting");
}

function initMobile(){
 const menu=$("#mobileMenu");if(!menu)return;
 $("#menuBtn")?.addEventListener("click",()=>menu.classList.add("open"));$("#mobileClose")?.addEventListener("click",()=>menu.classList.remove("open"));menu.addEventListener("click",e=>{if(e.target===menu)menu.classList.remove("open")});
 menu.querySelectorAll("a").forEach(a=>a.onclick=()=>menu.classList.remove("open"));
 $("#mobileAccount")?.addEventListener("click",()=>{$("#mobileAccount").blur();menu.classList.remove("open");$("#accountBtn")?.click()});
 $("#mobileWishlist")?.addEventListener("click",()=>{menu.classList.remove("open");const p=$("#wishlistPanel");if(p){p.classList.add("open");p.setAttribute("aria-hidden","false");renderWishlist()}});
}

function boot(){
 renderProducts();updateCart();if($("#wishlistCount"))$("#wishlistCount").textContent=wishlist.length;renderWishlist();initTheme();initProductDetail();initSearch();initFilters();initAnimations();initCart();initDropTimer();initStyleFinder();initChat();initAuth();initCheckout();initMobile();initOpening();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
