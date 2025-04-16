// DOM Elements
const addBtn = document.getElementById('addProductBtn');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close');
const productForm = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');

// Show Modal
addBtn.onclick = () => modal.style.display = 'flex';
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

// Load products from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts() {
  tableBody.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${product.name}</td>
    <td>${product.price} MAD</td>
    <td>${product.category}</td>
    <td>
      <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
    </td>
    <td>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent('product:' + index)}" alt="QR Code">
    </td>
  `;
  



    tableBody.appendChild(row);
  });
}

productForm.onsubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const category = document.getElementById('productCategory').value;

  products.push({ name, price, category });
  localStorage.setItem('products', JSON.stringify(products));
  productForm.reset();
  modal.style.display = 'none';
  renderProducts();
  importQRCodeData(name, price, category).then(qrDataUrl => {
    products.push({ name, price, category, qr: qrDataUrl });
    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    modal.style.display = 'none';
    renderProducts();
  });
  
};

function deleteProduct(index) {
  if (confirm('Are you sure you want to delete this product?')) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
  }
}

function editProduct(index) {
  const product = products[index];
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productCategory').value = product.category;

  modal.style.display = 'flex';
  products.splice(index, 1);
}

window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

function importQRCodeData(name, price, category) {
    const qrContent = `Name: ${name}\nPrice: ${price} MAD\nCategory: ${category}`;
    return QRCode.toDataURL(qrContent);
  }
  
  const scanQrBtn = document.getElementById('scanQrBtn');
const scannerModal = document.getElementById('scannerModal');
const closeScanner = document.getElementById('closeScanner');
let html5QrCode;

scanQRBtn.onclick = () => {
    qrScannerModal.style.display = 'flex';
  
    const qrReader = new Html5Qrcode("qr-reader");
    qrReader.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText, decodedResult) => {
        if (decodedText.startsWith('product:')) {
          const productIndex = decodedText.split(':')[1]; // Extract the product index from QR code
          showProductDetails(productIndex); // Show product details based on the scanned product index
          qrReader.stop().then(() => {
            document.getElementById('qr-reader').innerHTML = '';
            qrScannerModal.style.display = 'none';
          });
        }
      },
      (error) => {
        // Ignore scan errors silently
      }
    ).catch(err => {
      console.error(err);
    });
  };
  
  function showProductDetails(index) {
    const product = products[index];
    if (product) {
      const productDetails = `
        <h2>Product Details</h2>
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ${product.price} MAD</p>
        <p><strong>Category:</strong> ${product.category}</p>
      `;
      
      // Display product details in a modal or in a dedicated section on your page
      const productDetailModal = document.createElement('div');
      productDetailModal.innerHTML = `
        <div class="product-detail-modal">
          <span class="close-detail-modal">&times;</span>
          ${productDetails}
        </div>
      `;
      
      document.body.appendChild(productDetailModal);
      
      // Close modal when 'X' is clicked
      productDetailModal.querySelector('.close-detail-modal').onclick = () => {
        document.body.removeChild(productDetailModal);
      };
    }
  }
  
  closeQrScanner.onclick = () => {
    qrScannerModal.style.display = 'none';
    document.getElementById('qr-reader').innerHTML = '';
  };
  

closeScanner.onclick = () => {
  html5QrCode.stop().then(() => {
    scannerModal.style.display = 'none';
  });
};

window.onclick = e => {
  if (e.target === scannerModal) {
    html5QrCode.stop().then(() => {
      scannerModal.style.display = 'none';
    });
  }
};

const scanQRBtn = document.getElementById('scanQRBtn');
const qrScannerModal = document.getElementById('qrScannerModal');
const closeQrScanner = document.getElementById('closeQrScanner');

scanQRBtn.onclick = () => {
  qrScannerModal.style.display = 'flex';

  const qrReader = new Html5Qrcode("qr-reader");
  qrReader.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      alert("QR Code scanned:\n" + decodedText);
      qrReader.stop().then(() => {
        document.getElementById('qr-reader').innerHTML = '';
        qrScannerModal.style.display = 'none';
      });
    },
    (error) => {
      // Ignore scan errors silently
    }
  ).catch(err => {
    console.error(err);
  });
};

closeQrScanner.onclick = () => {
  qrScannerModal.style.display = 'none';
  document.getElementById('qr-reader').innerHTML = '';
};

// Init
renderProducts();
