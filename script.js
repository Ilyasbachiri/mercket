const products = JSON.parse(localStorage.getItem('products')) || {};
const invoice = [];
let total = 0;

function addProduct() {
  const barcode = document.getElementById('barcode').value;
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);

  if (barcode && name && price > 0) {
    products[barcode] = { name, price };
    localStorage.setItem('products', JSON.stringify(products));
    alert("تمت إضافة المنتج بنجاح!");
    document.getElementById('barcode').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
  } else {
    alert("يرجى ملء كل الحقول.");
  }
}

function addToInvoice() {
  const barcode = document.getElementById('scan-barcode').value;
  const product = products[barcode];

  if (product) {
    invoice.push({...product, barcode}); // إضافة الباركود للمنتج في الفاتورة
    total += product.price;
    updateInvoice();
    document.getElementById('scan-barcode').value = '';
  } else {
    alert("لم يتم العثور على المنتج.");
  }
}

function updateInvoice() {
  const tbody = document.getElementById('invoice-body');
  tbody.innerHTML = '';
  invoice.forEach((item, index) => {
    const row = `<tr>
      <td>${item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td><button onclick="removeFromInvoice(${index})" style="background-color: #f44336;">إزالة</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
  document.getElementById('total').textContent = total.toFixed(2);
}

function removeFromInvoice(index) {
  total -= invoice[index].price;
  invoice.splice(index, 1);
  updateInvoice();
}