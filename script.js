document.addEventListener('DOMContentLoaded', function() {
    // 設置標題字型
    const title = document.querySelector('h1');
    if (title) {
        title.style.cssText = `
            font-family: 'Noto Sans TC', 'PingFang TC', '微軟正黑體', sans-serif;
            font-weight: 700;
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        `;
    }

    const calculateBtn = document.getElementById('calculate-btn');
    const resultsSection = document.getElementById('results');
    
    // 初始化所有圖表
    let radarChart;
    let ikigaiChart;
    let gradeGauge;
    
    // 初始化儀表板
    initGradeGauge();
    
    // 添加滑塊值更新功能
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling.querySelector('span:nth-child(2)');
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
    });
    
    calculateBtn.addEventListener('click', function() {
        // 獲取用戶資訊並設置預設值
        const userName = document.getElementById('user-name').value || '老闆不知何許人';
        const userIndustry = document.getElementById('user-industry').value || '老闆沒說想幹嘛';
        
        // 更新用戶資訊顯示
        const userInfoElement = document.getElementById('user-info');
        userInfoElement.innerHTML = `
            <p>姓名：${userName}</p>
            <p>創業賽道：${userIndustry}</p>
            <p>分析日期：${new Date().toLocaleDateString()}</p>
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
        
        // 顯示分數
        document.getElementById('score-value').textContent = Math.round(score);
        
        // 確定市場等級和策略
        let grade, strategy;
        if (score >= 50000) {
            grade = "S";
            strategy = "全力投入，搶占市場";
        } else if (score >= 10000) {
            grade = "A";
            strategy = "積極佈局，建立競爭優勢";
        } else if (score >= 1000) {
            grade = "B";
            strategy = "找出市場差異化，深耕細分市場";
        } else if (score >= 100) {
            grade = "C";
            strategy = "謹慎投入，考慮是否值得長期投資";
        } else {
            grade = "D";
            strategy = "避免投入，或尋找新模式顛覆市場";
        }
        
        document.getElementById('grade-value').textContent = grade;
        document.getElementById('strategy-text').textContent = `建議策略: ${strategy}`;
        
        // 更新圖表
        updateRadarChart(demand, price, quantity, frequency, time);
        updateIkigaiChart(love, good, profit, need);
        updateGradeGauge(score); // 添加儀表板更新
        
        // 更新結果顯示
        document.getElementById('user-info').innerHTML = `
            <div class="user-details">
                <p>姓名：${userName}</p>
                <p>創業賽道：${userIndustry}</p>
                <p>分析日期：${new Date().toLocaleDateString()}</p>
            </div>
        `;
        
        // 添加或更新版權宣告
        let copyrightElement = document.querySelector('.copyright');
        if (!copyrightElement) {
            copyrightElement = document.createElement('div');
            copyrightElement.className = 'copyright';
            resultsSection.appendChild(copyrightElement);
        }
        copyrightElement.innerHTML = `
            <p style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                DMM創業者動能模型由「創業導師阿金」設計，這個網頁是 Soking 所製作 © 2025 All Rights Reserved.
            </p>
        `;
        
        // 顯示結果
        resultsSection.style.display = 'block';
    });
    
    function updateRadarChart(demand, price, quantity, frequency, time) {
        const canvas = document.getElementById('radar-chart');
        const ctx = canvas.getContext('2d');
        
        // 增加 canvas 尺寸
        const size = Math.min(canvas.parentElement.clientWidth, 400);
        canvas.width = size;
        canvas.height = size;
        
        if (radarChart) {
            radarChart.destroy();
        }
        
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['需求', '價格', '數量', '頻率', '時間'],
                datasets: [{
                    data: [demand, price, quantity, frequency, time],
                    backgroundColor: 'rgba(0, 102, 204, 0.2)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    pointBackgroundColor: 'rgba(0, 102, 204, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 102, 204, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 10,
                        ticks: {
                            stepSize: 2,
                            font: {
                                size: 14  // 增加字體大小
                            }
                        },
                        pointLabels: {
                            font: {
                                size: 16  // 增加標籤字體大小
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                maintainAspectRatio: false,
                responsive: true
            }
        });
    }
    
    function updateIkigaiChart(love, good, profit, need) {
        const canvas = document.getElementById('ikigai-chart');
        const ctx = canvas.getContext('2d');
        
        // 設置 canvas 尺寸
        const size = Math.min(canvas.parentElement.clientWidth, 400);
        canvas.width = size;
        canvas.height = size;
        
        if (ikigaiChart) {
            ikigaiChart.destroy();
        }
        
        ikigaiChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['熱愛', '擅長', '獲利', '社會價值'],
                datasets: [{
                    data: [love, good, profit, need],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 10,
                        ticks: {
                            stepSize: 2,
                            font: {
                                size: 14
                            }
                        },
                        pointLabels: {
                            font: {
                                size: 16
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                maintainAspectRatio: false,
                responsive: true
            }
        });
    }
    
    function initGradeGauge() {
        const ctx = document.getElementById('grade-gauge').getContext('2d');
        
        gradeGauge = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [20, 20, 20, 20, 20],
                    backgroundColor: [
                        '#FF4040',      // D級 - 紅色
                        '#FF8C40',      // C級 - 橙色
                        '#E8E8B0',      // B級 - 淺黃色
                        '#B0E8E8',      // A級 - 淺藍色
                        '#40B0FF'       // S級 - 藍色
                    ],
                    borderWidth: 0,
                    circumference: 180,
                    rotation: -90
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        document.getElementById('grade-value').textContent = '-';
    }
    
    function updateGradeGauge(score) {
        let grade, color;
        if (score >= 50000) {
            grade = 'S';
            color = '#40B0FF';
        } else if (score >= 10000) {
            grade = 'A';
            color = '#B0E8E8';
        } else if (score >= 1000) {
            grade = 'B';
            color = '#E8E8B0';
        } else if (score >= 100) {
            grade = 'C';
            color = '#FF8C40';
        } else {
            grade = 'D';
            color = '#FF4040';
        }
        
        document.getElementById('grade-value').textContent = grade;
        document.getElementById('grade-value').style.color = color;
    }
    
    // 下載功能
    document.getElementById('download-btn').addEventListener('click', async () => {
        try {
            const resultsElement = document.getElementById('results');
            const downloadBtn = document.getElementById('download-btn');
            
            // 暫時隱藏下載按鈕
            downloadBtn.style.display = 'none';
            
            // 截圖
            const canvas = await html2canvas(resultsElement, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true,
                allowTaint: true
            });
            
            // 恢復下載按鈕顯示
            downloadBtn.style.display = 'block';
            
            // 下載圖片
            const link = document.createElement('a');
            link.download = `DMM分析結果_${new Date().toLocaleDateString()}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('轉換圖片時發生錯誤:', error);
            alert('下載失敗，請稍後再試');
        }
    });
});