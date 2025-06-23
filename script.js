// Amazon Clone JS

// Sample categories and products
const categories = [
  { name: 'Home Decor', img: 'images/Home-Decor.jpg' },
  { name: 'Kitchen', img: 'images/kitchen-and-dining.jpg' },
  { name: 'Gaming', img: 'images/gaming.jpg' },
  { name: 'Shoes', img: 'images/shoes.jpg' },
  { name: 'Toys', img: 'images/stuff-toys.jpg' },
  { name: 'Bedding', img: 'images/Bedding.jpg' },
];

const products = [
  { title: 'Coffee Maker', price: 49.99, img: 'images/coffee.jpg', category: 'Kitchen' },
  { title: 'Gaming Mouse', price: 29.99, img: 'images/Mouse.jpg', category: 'Gaming' },
  { title: 'Home Storage Box', price: 19.99, img: 'images/Home-Storage.jpg', category: 'Home Decor' },
  { title: 'Headsets', price: 59.99, img: 'images/Headsets.jpg', category: 'Gaming' },
  { title: 'Bedding Set', price: 39.99, img: 'images/bedding-and-bath.jpg', category: 'Bedding' },
  { title: 'Stylish Shoes', price: 44.99, img: 'images/shoes.jpg', category: 'Shoes' },
  { title: 'Stuffed Toy', price: 14.99, img: 'images/stuff-toys.jpg', category: 'Toys' },
  { title: 'Decor Vase', price: 24.99, img: 'images/decor.jpg', category: 'Home Decor' },
];

let cart = [];

// Render categories
document.getElementById('categories').innerHTML = categories.map(cat => `
  <div class="category-card" data-category="${cat.name}">
    <img src="${cat.img}" alt="${cat.name}">
    <div>${cat.name}</div>
  </div>
`).join('');

// Render products
function renderProducts(filter = '') {
  const filtered = filter && filter !== 'All'
    ? products.filter(p => p.category === filter || p.title.toLowerCase().includes(filter.toLowerCase()))
    : products;
  document.getElementById('products').innerHTML = filtered.length ? filtered.map(prod => `
    <div class="product-card">
      <img src="${prod.img}" alt="${prod.title}">
      <div class="product-title">${prod.title}</div>
      <div class="product-price">$${prod.price.toFixed(2)}</div>
      <button class="add-to-cart" data-title="${prod.title}">Add to Cart</button>
    </div>
  `).join('') : '<div style="grid-column: 1/-1; text-align:center;">No products found.</div>';
}
renderProducts();

// Category click
document.getElementById('categories').addEventListener('click', e => {
  const card = e.target.closest('.category-card');
  if (card) {
    renderProducts(card.dataset.category);
  }
});

// Search
const searchInput = document.getElementById('searchInput');
document.getElementById('searchBtn').onclick = () => {
  renderProducts(searchInput.value);
};
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') renderProducts(searchInput.value);
});

// Add to cart
document.getElementById('products').addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    const title = e.target.dataset.title;
    cart.push(title);
    document.getElementById('cartCount').textContent = cart.length;
  }
});

// Hamburger/mobile nav
document.getElementById('hamburger').onclick = () => {
  document.getElementById('mobileNav').classList.toggle('show');
};

document.getElementById('mobileNav').addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    document.getElementById('mobileNav').classList.remove('show');
  }
});

// Responsive mobile nav CSS toggle
const style = document.createElement('style');
style.innerHTML = `.mobile-nav.show { display: flex !important; }`;
document.head.appendChild(style);

const heroImages = [
  'dresses.jpg',
  'hero-section.jpg',
  'bedding-and-bath.jpg'
];
let heroIndex = 0;
const heroImg = document.querySelector('.hero-img');
const leftBtn = document.querySelector('.hero-arrow.left');
const rightBtn = document.querySelector('.hero-arrow.right');

function updateHero() {
  heroImg.src = heroImages[heroIndex];
}
if (leftBtn && rightBtn && heroImg) {
  leftBtn.onclick = () => {
    heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
    updateHero();
  };
  rightBtn.onclick = () => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    updateHero();
  };
}

// Account dropdown toggle
const accountBtn = document.getElementById('accountBtn');
const accountDropdown = document.getElementById('accountDropdown');
if (accountBtn && accountDropdown) {
  accountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    accountDropdown.classList.toggle('show');
    accountBtn.setAttribute('aria-expanded', accountDropdown.classList.contains('show'));
  });
  document.addEventListener('click', (e) => {
    if (!accountDropdown.contains(e.target) && !accountBtn.contains(e.target)) {
      accountDropdown.classList.remove('show');
      accountBtn.setAttribute('aria-expanded', 'false');
    }
  });
} 