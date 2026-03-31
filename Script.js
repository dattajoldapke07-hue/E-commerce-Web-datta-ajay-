// --- LOGIN ---
function login(){
  const u=document.getElementById("username").value.trim();
  const p=document.getElementById("password").value.trim();
  if(u==="admin" && p==="1234"){
    localStorage.setItem("loggedInUser","admin");
    document.getElementById("loginOverlay").style.display="none";
    showStore();
  } else {
    document.getElementById("loginError").style.display="block";
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  if(localStorage.getItem("loggedInUser")) showStore();
});

// --- STORE ---
const products = [
  {id:1,name:"T-Shirt",price:500,image:"https://www.freeiconspng.com/uploads/blank-t-shirt-png-16.jpg"},
  {id:2,name:"Shoes",price:1500,image:"https://www.pngall.com/wp-content/uploads/5/Men-Shoes-PNG-Image-File.png"},
  {id:3,name:"Watch",price:2000,image:"https://i.postimg.cc/66k6BKX7/1805QM04-1.jpg"},
  {id:4,name:"Backpack",price:800,image:"https://images.unsplash.com/photo-1509762774605-f07235a08f1f"},
  {id:5,name:"Premium Cotton Shirt",price:699,image:"https://i.postimg.cc/mD7ZKp5t/IMG-20260228-WA0050.jpg"},
  {id:6,name:"Round Sunglass",price:450,image:"https://i.postimg.cc/9FKSqXMf/IMG-20260228-WA0071.jpg"},
  {id:7,name:"White Shirt",price:299,image:"https://i.postimg.cc/L5bHPdY2/IMG-20260328-WA0044.jpg"},
  {id:8,name:"Silk Saree",price:1499,image:"https://i.postimg.cc/jqGQHDzF/IMG-20260325-WA0001.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function showStore(){
  document.getElementById("mainHeader").classList.remove("hidden");
  document.getElementById("products").classList.remove("hidden");
  updateCartCount();
  const container=document.getElementById("products");
  container.innerHTML="";
  products.forEach(p=>{
    const div=document.createElement("div");
    div.classList.add("product");
    div.innerHTML=`
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
    `;
    container.appendChild(div);
  });
}

// --- CART ---
function addToCart(id){
  let item=products.find(p=>p.id===id);
  let exist=cart.find(c=>c.id===id);
  if(exist) exist.qty+=1; else { item.qty=1; cart.push(item);}
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
  alert("Added to Cart ✅");
}
function updateCartCount(){ document.getElementById("cartCount").innerText=cart.length; }

// --- WISHLIST ---
function addToWishlist(id){
  let item=products.find(p=>p.id===id);
  if(!wishlist.find(w=>w.id===id)) wishlist.push(item);
  localStorage.setItem("wishlist",JSON.stringify(wishlist));
  alert("Added to Wishlist ❤️");
}

// --- DARK MODE ---
function toggleDark(){ document.body.classList.toggle("dark"); }
