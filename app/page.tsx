"use client";
import { useMemo, useState } from "react";
import { Search, ShoppingCart, Heart, Menu, X, Star, Truck, ShieldCheck, Headphones } from "lucide-react";
const products = [
 {id:1,name:"SoundBeat Wireless Headphones",cat:"Electronics",price:1499,old:2999,rating:4.6,emoji:"🎧",bg:"lavender",badge:"BESTSELLER"},
 {id:2,name:"Everyday Classic Sneakers",cat:"Fashion",price:1899,old:3499,rating:4.4,emoji:"👟",bg:"peach",badge:"HOT DEAL"},
 {id:3,name:"Minimal Ceramic Desk Lamp",cat:"Home",price:999,old:1599,rating:4.7,emoji:"💡",bg:"mint"},
 {id:4,name:"SmartFit Active Watch",cat:"Electronics",price:2299,old:4999,rating:4.3,emoji:"⌚",bg:"blue",badge:"TRENDING"},
 {id:5,name:"Daily Carry Backpack",cat:"Fashion",price:1199,old:2199,rating:4.5,emoji:"🎒",bg:"sand"},
 {id:6,name:"HydraSteel Water Bottle",cat:"Home",price:499,old:899,rating:4.2,emoji:"🥤",bg:"mint"},
 {id:7,name:"GlowCare Skincare Set",cat:"Beauty",price:799,old:1299,rating:4.6,emoji:"🧴",bg:"peach"},
 {id:8,name:"The Creative Journal Set",cat:"Books",price:349,old:599,rating:4.8,emoji:"📓",bg:"lavender"}
];
const cats=["All","Electronics","Fashion","Home","Beauty","Books"];
const money=(n:number)=>"₹"+n.toLocaleString("en-IN");
export default function Home(){
 const [q,Q]=useState(""); const [cat,C]=useState("All"); const [cart,S]=useState<number[]>([]);
 const [likes,L]=useState<number[]>([]); const [drawer,D]=useState(false); const [toast,T]=useState("");
 const list=useMemo(()=>products.filter(p=>(cat==="All"||p.cat===cat)&&p.name.toLowerCase().includes(q.toLowerCase())),[cat,q]);
 const count=cart.length; const total=cart.reduce((s,id)=>s+(products.find(p=>p.id===id)?.price||0),0);
 function notify(s:string){T(s);setTimeout(()=>T(""),1800)}
 return <main>
  <div className="topline">✨ Welcome to ShopX — little joys, great prices <span>Free delivery on orders over ₹999</span></div>
  <header><a className="brand" href="#"><b className="logo">S</b><span>Shop<span className="blue">X</span></span></a>
   <div className="search"><Search size={18}/><input value={q} onChange={e=>Q(e.target.value)} placeholder="Search for products, brands and more..."/></div>
   <button className="iconbtn" onClick={()=>notify("Account features are coming soon.")}>♙ <span>Account</span></button>
   <button className="iconbtn" onClick={()=>D(true)}><ShoppingCart size={20}/> <span>Cart</span><i>{count}</i></button>
  </header>
  <nav>{cats.map(c=><button className={cat===c?"active":""} key={c} onClick={()=>C(c)}>{c}</button>)}</nav>
  <section className="hero"><div><p className="eyebrow">THE EVERYDAY EDIT</p><h1>Good finds.<br/><em>Great feelings.</em></h1><p className="sub">Discover the things you’ll love — thoughtfully picked, easy on your pocket.</p><button className="primary" onClick={()=>document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}>Explore collection →</button><div className="hero-note">✦ Fresh picks added every week</div></div><div className="hero-art"><div className="orb">🛍️</div><span className="float f1">✨ Top picks</span><span className="float f2">♡ Made for you</span><span className="float f3">SALE · UP TO 50% OFF</span></div></section>
  <section className="benefits"><div><Truck/><span><b>Free delivery</b><small>On orders over ₹999</small></span></div><div><ShieldCheck/><span><b>Secure shopping</b><small>Your details stay safe</small></span></div><div><Headphones/><span><b>Here to help</b><small>Friendly customer support</small></span></div></section>
  <section id="products" className="products"><div className="section-head"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Today’s favourites</h2></div><span>{list.length} products</span></div>
   <div className="grid">{list.map(p=><article className="card" key={p.id}><div className={"product-art "+p.bg}>{p.badge&&<label>{p.badge}</label>}<button className={"heart "+(likes.includes(p.id)?"liked":"")} onClick={()=>L(a=>a.includes(p.id)?a.filter(x=>x!==p.id):[...a,p.id])}><Heart size={18} fill={likes.includes(p.id)?"currentColor":"none"}/></button><span>{p.emoji}</span></div><div className="details"><small>{p.cat}</small><h3>{p.name}</h3><div className="rating"><Star size={14} fill="currentColor"/> {p.rating} <span>· In stock</span></div><div className="price">{money(p.price)} <del>{money(p.old)}</del></div><button className="add" onClick={()=>{S(a=>[...a,p.id]);notify("Added to your cart")}}>Add to cart</button></div></article>)}</div>
   {list.length===0&&<p className="empty">No products found. Try another search.</p>}
  </section>
  <footer><a className="brand" href="#"><b className="logo">S</b><span>Shop<span className="blue">X</span></span></a><p>Good finds for everyday life.</p><small>© 2026 ShopX Marketplace. Demo storefront.</small></footer>
  {drawer&&<div className="shade" onClick={()=>D(false)}><aside onClick={e=>e.stopPropagation()}><div className="drawerhead"><h2>Your cart ({count})</h2><button onClick={()=>D(false)}><X/></button></div>{cart.length===0?<p className="empty">Your cart is waiting for something lovely.</p>:<>{cart.map((id,i)=>{const p=products.find(x=>x.id===id)!;return <div className="cartrow" key={i}><span>{p.emoji}</span><div><b>{p.name}</b><small>{money(p.price)}</small></div><button onClick={()=>S(a=>a.filter((_,j)=>j!==i))}>Remove</button></div>})}<div className="total"><b>Subtotal</b><b>{money(total)}</b></div><button className="primary full" onClick={()=>notify("Checkout will be added in a later update.")}>Continue to checkout</button></>}</aside></div>}
  {toast&&<div className="toast">{toast}</div>}
 </main>
}