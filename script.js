copyrightElement.innerHTML = `
    <p style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        DMM創業者動能模型由「<a href="https://kim.com.tw/" target="_blank" style="color: #666; text-decoration: underline;">阿金！人生進化中</a>」設計，這個網頁是 Soking 所製作 © 2025 All Rights Reserved.
    </p>
`;

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