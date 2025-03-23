// ... 现有代码 ...

calculateBtn.addEventListener('click', function() {
    // ... 其他代码 ...

    // 添加或更新版權宣告
    let copyrightElement = document.querySelector('.copyright'); // 添加变量声明
    if (!copyrightElement) {
        copyrightElement = document.createElement('div');
        copyrightElement.className = 'copyright';
        resultsSection.appendChild(copyrightElement);
    }
    copyrightElement.innerHTML = `
        <p style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            DMM創業者動能模型由「<a href="https://kim.com.tw/" target="_blank" style="color: #666; text-decoration: underline;">阿金！人生進化中</a>」設計，這個網頁是 Soking 所製作 © 2025 All Rights Reserved.
        </p>
    `;

    // ... 后续代码 ...
});