// ... 现有代码 ...

// 獲取所有輸入值
const demand = parseInt(document.getElementById('demand').value);
const price = parseInt(document.getElementById('price').value);
const quantity = parseInt(document.getElementById('quantity').value);
const frequency = parseInt(document.getElementById('frequency').value);
const time = parseInt(document.getElementById('time').value);

const love = parseInt(document.getElementById('love').value);
const good = parseInt(document.getElementById('good').value);
const profit = parseInt(document.getElementById('profit').value);
const need = parseInt(document.getElementById('need').value);

// 計算分數
const marketFactor = (demand * price * quantity * frequency) / time;
const ikigaiFactor = (love + good + profit + need) / 4;
const score = marketFactor * ikigaiFactor;

// ... 后续代码 ...