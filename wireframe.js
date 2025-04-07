document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navLinks = document.querySelectorAll('.wireframe-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active class to clicked link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to the linked section (smooth scroll)
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dashboard sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active class to clicked link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to the linked section (smooth scroll)
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Chart tabs functionality
    const chartTabs = document.querySelectorAll('.chart-tab');
    if (chartTabs.length) {
        chartTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                chartTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                const tabType = this.getAttribute('data-tab');
                const contentPanels = document.querySelectorAll('.chart-details-content');
                contentPanels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.display = 'none';
                });
                
                const activePanel = document.getElementById(`${tabType}-details`);
                if (activePanel) {
                    activePanel.classList.add('active');
                    activePanel.style.display = 'block';
                }
            });
        });
    }

    // Balance tabs functionality
    const balanceTabs = document.querySelectorAll('.balance-tab');
    if (balanceTabs.length) {
        balanceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                balanceTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                const tabType = this.getAttribute('data-tab');
                const contentPanels = document.querySelectorAll('.balance-content');
                contentPanels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.display = 'none';
                });
                
                const activePanel = document.getElementById(`${tabType}-balance`);
                if (activePanel) {
                    activePanel.classList.add('active');
                    activePanel.style.display = 'block';
                }
            });
        });
        
        // Initialize first tab
        const firstTab = balanceTabs[0];
        if (firstTab) {
            const tabType = firstTab.getAttribute('data-tab');
            const activePanel = document.getElementById(`${tabType}-balance`);
            if (activePanel) {
                activePanel.classList.add('active');
                activePanel.style.display = 'block';
            }
        }
    }

    // Show/Hide sections for tab navigation
    function setupTabs(tabsSelector, contentsSelector) {
        const tabs = document.querySelectorAll(tabsSelector);
        if (!tabs.length) return;
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content if exists
                const contents = document.querySelectorAll(contentsSelector);
                if (contents && contents.length > index) {
                    contents.forEach(c => c.style.display = 'none');
                    contents[index].style.display = 'block';
                }
            });
        });
    }

    // Setup all tab navigation components
    setupTabs('.deposit-tabs .tab', '.deposit-content-panel');
    setupTabs('.withdrawal-tabs .tab', '.withdrawal-content-panel');
    setupTabs('.message-tabs .tab', '.message-content-panel');
    setupTabs('.settings-tabs .tab', '.settings-content-panel');

    // Registration flow navigation
    const registrationSteps = document.querySelectorAll('.registration-step');
    const registrationProgress = document.querySelectorAll('.registration-progress .step');
    
    function showRegistrationStep(stepIndex) {
        registrationSteps.forEach(step => step.style.display = 'none');
        if (registrationSteps[stepIndex]) {
            registrationSteps[stepIndex].style.display = 'block';
        }
        
        // Update progress indicator
        registrationProgress.forEach((step, idx) => {
            if (idx <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Initialize first step
    if (registrationSteps.length) {
        showRegistrationStep(0);
    }
    
    // Registration next buttons
    document.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.registration-step');
            const currentIndex = Array.from(registrationSteps).indexOf(currentStep);
            if (currentIndex < registrationSteps.length - 1) {
                showRegistrationStep(currentIndex + 1);
            } else {
                // Last step completed, redirect to dashboard
                scrollToSection('dashboard');
            }
        });
    });
    
    // Registration back buttons
    document.querySelectorAll('.btn-back').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.registration-step');
            const currentIndex = Array.from(registrationSteps).indexOf(currentStep);
            if (currentIndex > 0) {
                showRegistrationStep(currentIndex - 1);
            }
        });
    });

    // Helper function to scroll to a section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Update nav link if applicable
            const navLink = document.querySelector(`.wireframe-nav a[href="#${sectionId}"]`);
            if (navLink) {
                navLinks.forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
            
            // Update sidebar link if applicable
            const sidebarLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
            if (sidebarLink) {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                sidebarLink.classList.add('active');
            }
            
            // Scroll to section
            window.scrollTo({
                top: section.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    }

    // Login button redirects to dashboard
    document.querySelectorAll('.btn-login').forEach(button => {
        button.addEventListener('click', function() {
            // Mark user as authenticated
            localStorage.setItem('isAuthenticated', 'true');
            
            // Set up authenticated UI
            setupAuthenticatedUI();
            
            // Scroll to dashboard
            scrollToSection('dashboard');
        });
    });

    // Signup button redirects to registration
    document.querySelectorAll('.btn-signup').forEach(button => {
        button.addEventListener('click', function() {
            scrollToSection('registration');
        });
    });

    // Dashboard quick action buttons
    document.querySelectorAll('#dashboard .quick-actions .btn-action').forEach((button, index) => {
        button.addEventListener('click', function() {
            const sections = ['deposit', 'withdrawal', 'conversion'];
            if (sections[index]) {
                scrollToSection(sections[index]);
            }
        });
    });

    // Homepage get started button
    document.querySelector('.hero .btn-cta').addEventListener('click', function() {
        scrollToSection('registration');
    });

    // Submit verification button
    document.querySelector('#kyc .btn-submit').addEventListener('click', function() {
        const statusProgress = document.querySelector('#kyc .status-progress');
        const statusText = document.querySelector('#kyc .status-indicator p:nth-child(2)');
        
        statusProgress.style.width = '100%';
        statusText.textContent = 'Status: Approved';
        
        alert('Verification submitted successfully! Your account is now fully verified.');
        
        // Mark user as verified
        localStorage.setItem('isVerified', 'true');
        
        // Update UI if not already set up
        if (localStorage.getItem('isAuthenticated') === 'true') {
            setupAuthenticatedUI();
        }
    });

    // Cryptocurrency deposit handler
    const cryptoSelect = document.getElementById('crypto-select');
    const networkSelect = document.getElementById('network-select');
    const networkContainer = document.getElementById('network-select-container');
    const walletAddressContainer = document.getElementById('wallet-address-container');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const depositInfoContainer = document.getElementById('deposit-info-container');
    const selectedCryptoSpan = document.getElementById('selected-crypto');
    const minDepositSpan = document.getElementById('min-deposit');
    const cryptoTickerSpan = document.getElementById('crypto-ticker');
    const processingTimeSpan = document.getElementById('processing-time');
    const walletAddressDisplay = document.getElementById('wallet-address');
    
    if (cryptoSelect && networkSelect) {
        // Network options for different cryptocurrencies
        const networkOptions = {
            'USDT': [
                { value: 'TRX', label: 'TRC20 (TRON)' },
                { value: 'ERC', label: 'ERC20 (Ethereum)' },
                { value: 'SOL', label: 'SPL (Solana)' },
                { value: 'BSC', label: 'BSC (Binance Smart Chain)' }
            ],
            'USDC': [{ value: 'native', label: 'Native Network' }],
            'BTC': [{ value: 'native', label: 'Bitcoin Network' }],
            'ETH': [{ value: 'native', label: 'Ethereum Network' }],
            'BNB': [{ value: 'native', label: 'Binance Chain' }],
            'SOL': [{ value: 'native', label: 'Solana Network' }],
            'XRP': [{ value: 'native', label: 'XRP Ledger' }],
            'TRX': [{ value: 'native', label: 'TRON Network' }]
        };
        
        // Minimum deposit amounts for each cryptocurrency
        const minDeposits = {
            'USDT': '10',
            'USDC': '10',
            'BTC': '0.001',
            'ETH': '0.01',
            'BNB': '0.1',
            'SOL': '1',
            'XRP': '20',
            'TRX': '100'
        };
        
        // Processing times for each network
        const processingTimes = {
            'TRX': '1-2 minutes',
            'ERC': '5-30 minutes (depends on gas fee)',
            'SOL': '~10 seconds',
            'BSC': '~5 minutes',
            'native': {
                'BTC': '10-60 minutes (1-6 confirmations)',
                'ETH': '5-30 minutes (depends on gas fee)',
                'BNB': '~5 minutes',
                'SOL': '~10 seconds',
                'XRP': '3-5 seconds',
                'TRX': '1-2 minutes',
                'USDC': '5-30 minutes (depends on gas fee)'
            }
        };
        
        // Wallet addresses (demo addresses for wireframe)
        const walletAddresses = {
            'USDT': {
                'TRX': 'TW9S76Qj243GK3UgfpHj8ecWBz45fQV7L6',
                'ERC': '0x8B2AB2191d3B1eD4a2c6D79B5f333208E3d5B952',
                'SOL': 'DRKQkvCeKi9JZdpAyRMJkQa7g98gQHvDCCgFMkXRoRbu',
                'BSC': '0x8B2AB2191d3B1eD4a2c6D79B5f333208E3d5B952'
            },
            'BTC': { 'native': 'bc1q84nz5z5d8z5g2xvz5g2c7c2c7xz5g5z7x5z7x' },
            'ETH': { 'native': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
            'BNB': { 'native': 'bnb1g5p04snezgpky203fq6da9qyjsy2k9kzs4y2ex' },
            'SOL': { 'native': 'ERvmrhkkHcctKHmX49aN3Db5JPnSXXEQWHLEiBJ3Buhm' },
            'XRP': { 'native': 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh' },
            'USDC': { 'native': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
            'TRX': { 'native': 'TW9S76Qj243GK3UgfpHj8ecWBz45fQV7L6' }
        };
        
        // Handle crypto selection change
        cryptoSelect.addEventListener('change', function() {
            const selectedCrypto = this.value;
            
            // Clear network select
            networkSelect.innerHTML = '';
            
            if (selectedCrypto) {
                // Show network selection for the selected crypto
                networkContainer.style.display = 'block';
                
                // Populate network options
                if (networkOptions[selectedCrypto]) {
                    networkOptions[selectedCrypto].forEach(option => {
                        const optElement = document.createElement('option');
                        optElement.value = option.value;
                        optElement.textContent = option.label;
                        networkSelect.appendChild(optElement);
                    });
                    
                    // Trigger network change to update address
                    const event = new Event('change');
                    networkSelect.dispatchEvent(event);
                }
            } else {
                // Hide network selection if no crypto selected
                networkContainer.style.display = 'none';
                walletAddressContainer.style.display = 'none';
                qrCodeContainer.style.display = 'none';
                depositInfoContainer.style.display = 'none';
            }
        });
        
        // Handle network selection change
        networkSelect.addEventListener('change', function() {
            const selectedCrypto = cryptoSelect.value;
            const selectedNetwork = this.value;
            
            if (selectedCrypto && selectedNetwork) {
                // Show wallet address and other info
                walletAddressContainer.style.display = 'block';
                qrCodeContainer.style.display = 'block';
                depositInfoContainer.style.display = 'block';
                
                // Update selected crypto text
                selectedCryptoSpan.textContent = cryptoSelect.options[cryptoSelect.selectedIndex].text;
                
                // Update minimum deposit
                minDepositSpan.textContent = minDeposits[selectedCrypto] || '0.001';
                cryptoTickerSpan.textContent = selectedCrypto;
                
                // Update processing time
                if (selectedNetwork === 'native') {
                    processingTimeSpan.textContent = processingTimes['native'][selectedCrypto] || 'Varies by network';
                } else {
                    processingTimeSpan.textContent = processingTimes[selectedNetwork] || 'Varies by network';
                }
                
                // Update wallet address
                if (walletAddresses[selectedCrypto] && walletAddresses[selectedCrypto][selectedNetwork]) {
                    walletAddressDisplay.textContent = walletAddresses[selectedCrypto][selectedNetwork];
                } else {
                    walletAddressDisplay.textContent = 'Address unavailable - please contact support';
                }
            }
        });
    }

    // Deposit button action (update to handle different cryptocurrencies)
    document.querySelector('#deposit .btn-copy').addEventListener('click', function() {
        const selectedCrypto = document.getElementById('crypto-select').value;
        if (selectedCrypto) {
            alert(`${selectedCrypto} wallet address copied to clipboard!`);
        } else {
            alert('Wallet address copied to clipboard!');
        }
    });

    // Internal transfer button
    document.querySelector('#internal-transfer .btn-transfer').addEventListener('click', function() {
        alert('Transfer successful! Funds have been sent to the recipient.');
        
        // Add a new transaction in the history
        const transactionList = document.querySelector('#history .transaction-table');
        const newRow = document.createElement('div');
        newRow.className = 'table-row';
        
        const today = new Date();
        const formattedDate = `${today.toLocaleString('default', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`;
        
        newRow.innerHTML = `
            <div class="cell">${formattedDate}</div>
            <div class="cell">Internal Transfer</div>
            <div class="cell">-$100.00</div>
            <div class="cell">Completed</div>
            <div class="cell"><button class="btn-details">View</button></div>
        `;
        
        transactionList.appendChild(newRow);
    });

    // Savings and Staking functionality
    const savingsProducts = document.querySelectorAll('#savings .product');
    if (savingsProducts.length > 0) {
        savingsProducts.forEach(product => {
            product.addEventListener('click', function() {
                // Get product information
                const productName = this.querySelector('h3').textContent;
                const apyText = this.querySelector('.interest-rate').textContent;
                const apy = apyText.replace('APY: ', '');
                const termText = this.querySelector('p:nth-of-type(1)').textContent;
                const term = termText.replace('Term: ', '');
                const minText = this.querySelector('p:nth-of-type(2)').textContent;
                const min = minText.replace('Minimum: ', '');
                
                // Extract currency code
                const currencyCode = min.split(' ')[1]; // e.g., "BTC", "ETH", "USDT"
                
                // Available balances for demo (would come from API in a real application)
                const availableBalances = {
                    'BTC': 0.42,
                    'ETH': 3.75,
                    'USDT': 5000,
                    'USDC': 2500,
                    'SOL': 78.5
                };
                
                // Create investment form container if it doesn't exist
                let investmentForm = document.querySelector('.investment-form');
                if (!investmentForm) {
                    investmentForm = document.createElement('div');
                    investmentForm.className = 'investment-form';
                    document.querySelector('#savings .products-listing').insertAdjacentElement('afterend', investmentForm);
                }
                
                // Calculate default investment amount (50% of available balance)
                const availableBalance = availableBalances[currencyCode] || 0;
                const minAmount = parseFloat(min.split(' ')[0]);
                const defaultAmount = Math.max(minAmount, availableBalance * 0.5).toFixed(4);
                
                // Calculate daily and monthly earnings
                const apyValue = parseFloat(apy) / 100;
                const dailyReturn = (apyValue / 365) * defaultAmount;
                const monthlyReturn = (apyValue / 12) * defaultAmount;
                
                // Update investment form content
                investmentForm.innerHTML = `
                    <h3>
                        <span>${productName}</span>
                        <span style="color: #28a745;">${apy} APY</span>
                    </h3>
                    
                    <div style="background-color: #f0f9ff; padding: 12px 15px; border-radius: 6px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                        <span>Available Balance:</span>
                        <span style="font-weight: 700;">${availableBalance} ${currencyCode}</span>
                    </div>
                    
                    <div style="position: relative; margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Investment Amount</label>
                        <input type="text" id="investment-amount" placeholder="0.00" value="${defaultAmount}" style="width: 100%; padding: 12px 80px 12px 15px; border: 1px solid #ced4da; border-radius: 6px; font-size: 1rem;">
                        <span style="position: absolute; right: 15px; top: 38px; color: #6c757d; font-weight: 500;">${currencyCode}</span>
                    </div>
                    
                    <div style="margin: 15px 0 25px;">
                        <input type="range" id="amount-slider" min="${minAmount}" max="${availableBalance}" value="${defaultAmount}" style="width: 100%;">
                        <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                            <span style="font-size: 0.85rem; color: #6c757d;">Min: ${minAmount} ${currencyCode}</span>
                            <span style="font-size: 0.85rem; color: #6c757d;">Max: ${availableBalance} ${currencyCode}</span>
                        </div>
                    </div>
                    
                    <div style="background-color: #f0f9ff; border-left: 4px solid #3498db; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Investment Amount:</span>
                            <span>${defaultAmount} ${currencyCode}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Term:</span>
                            <span>${term}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Interest Rate:</span>
                            <span>${apy}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span>Estimated Daily Earnings:</span>
                            <span>${dailyReturn.toFixed(6)} ${currencyCode}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0; padding-top: 8px; border-top: 1px dashed #d1e7ff; font-weight: 700;">
                            <span>Estimated Monthly Earnings:</span>
                            <span>${monthlyReturn.toFixed(5)} ${currencyCode}</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 25px;">
                        <button class="btn-cancel" style="background-color: transparent; border: 1px solid #ced4da; color: #6c757d; padding: 10px 20px; border-radius: 6px; font-weight: 500; cursor: pointer;">Cancel</button>
                        <button class="btn-invest" style="background-color: #28a745; color: white; padding: 12px 24px; border-radius: 6px; font-weight: 600; border: none; cursor: pointer; box-shadow: 0 2px 5px rgba(40, 167, 69, 0.3);">Invest Now</button>
                    </div>
                `;
                
                // Show the investment form
                investmentForm.style.display = 'block';
                
                // Scroll to investment form
                setTimeout(() => {
                    investmentForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
                
                // Handle slider input
                const amountSlider = document.getElementById('amount-slider');
                const amountInput = document.getElementById('investment-amount');
                
                if (amountSlider && amountInput) {
                    // Update input when slider changes
                    amountSlider.addEventListener('input', function() {
                        const sliderValue = parseFloat(this.value);
                        amountInput.value = sliderValue.toFixed(4);
                        updateInvestmentSummary(sliderValue, currencyCode, apy);
                    });
                    
                    // Update slider when input changes
                    amountInput.addEventListener('input', function() {
                        const inputValue = parseFloat(this.value) || 0;
                        // Clamp value between min and max
                        const clampedValue = Math.max(minAmount, Math.min(availableBalance, inputValue));
                        
                        // Update slider
                        amountSlider.value = clampedValue;
                        
                        // Update investment summary
                        updateInvestmentSummary(clampedValue, currencyCode, apy);
                    });
                }
                
                // Handle cancel button
                const cancelButton = investmentForm.querySelector('.btn-cancel');
                if (cancelButton) {
                    cancelButton.addEventListener('click', function() {
                        investmentForm.style.display = 'none';
                    });
                }
                
                // Handle invest button
                const investButton = investmentForm.querySelector('.btn-invest');
                if (investButton) {
                    investButton.addEventListener('click', function() {
                        const amount = parseFloat(amountInput.value) || 0;
                        
                        if (amount < minAmount) {
                            alert(`Minimum investment amount is ${minAmount} ${currencyCode}`);
                            return;
                        }
                        
                        if (amount > availableBalance) {
                            alert(`You don't have enough ${currencyCode}. Maximum available is ${availableBalance} ${currencyCode}`);
                            return;
                        }
                        
                        // Show success message
                        alert(`Successfully invested ${amount.toFixed(4)} ${currencyCode} in ${productName}!`);
                        
                        // Hide investment form
                        investmentForm.style.display = 'none';
                        
                        // Update subscribe button to show as subscribed
                        const subscribeButton = product.querySelector('.btn-subscribe');
                        if (subscribeButton) {
                            subscribeButton.textContent = 'Subscribed';
                            subscribeButton.disabled = true;
                            subscribeButton.style.backgroundColor = '#6c757d';
                            subscribeButton.style.cursor = 'default';
                        }
                    });
                }
            });
        });
        
        // Separate event listener for subscribe buttons
        document.querySelectorAll('#savings .btn-subscribe').forEach(button => {
            button.addEventListener('click', function(e) {
                // Stop event propagation to prevent the product click event
                e.stopPropagation();
                
                // Get product information from parent element
                const product = this.closest('.product');
                
                // Trigger the click event on the parent product
                product.click();
            });
        });
    }

    // Helper function to update investment summary
    function updateInvestmentSummary(amount, currency, apy) {
        // Get summary elements
        const summaryAmount = document.querySelector('.investment-form .summary-row:first-child span:last-child');
        const dailyEarnings = document.querySelector('.investment-form .summary-row:nth-child(4) span:last-child');
        const monthlyEarnings = document.querySelector('.investment-form .summary-row:last-child span:last-child');
        
        if (summaryAmount && dailyEarnings && monthlyEarnings) {
            // Update amount
            summaryAmount.textContent = `${amount.toFixed(4)} ${currency}`;
            
            // Calculate and update earnings
            const apyValue = parseFloat(apy) / 100;
            const dailyReturn = (apyValue / 365) * amount;
            const monthlyReturn = (apyValue / 12) * amount;
            
            dailyEarnings.textContent = `${dailyReturn.toFixed(6)} ${currency}`;
            monthlyEarnings.textContent = `${monthlyReturn.toFixed(5)} ${currency}`;
        }
    }

    // Conversion button
    document.querySelector('#conversion .btn-convert').addEventListener('click', function() {
        const fromAmount = document.querySelector('#conversion .form-group:first-child input').value;
        const fromCurrency = document.querySelector('#conversion .form-group:first-child select').value;
        const toCurrency = document.querySelector('#conversion .form-group:nth-child(3) select').value;
        
        if (fromAmount) {
            alert(`Conversion successful! Converted ${fromAmount} ${fromCurrency} to ${toCurrency}.`);
            
            // Add a new transaction in the history
            const transactionList = document.querySelector('#history .transaction-table');
            const newRow = document.createElement('div');
            newRow.className = 'table-row';
            
            const today = new Date();
            const formattedDate = `${today.toLocaleString('default', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`;
            
            newRow.innerHTML = `
                <div class="cell">${formattedDate}</div>
                <div class="cell">Conversion</div>
                <div class="cell">${fromCurrency} → ${toCurrency}</div>
                <div class="cell">Completed</div>
                <div class="cell"><button class="btn-details">View</button></div>
            `;
            
            transactionList.appendChild(newRow);
        } else {
            alert('Please enter an amount to convert');
        }
    });

    // Referral copy buttons
    document.querySelectorAll('#referral .btn-copy').forEach(button => {
        button.addEventListener('click', function() {
            alert('Copied to clipboard!');
        });
    });

    // Account settings save button
    document.querySelector('#account-settings .btn-save').addEventListener('click', function() {
        alert('Your personal information has been updated successfully!');
    });

    // Initial highlight of the first navigation item
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    // Cryptocurrency withdrawal handler
    const withdrawalCryptoSelect = document.getElementById('withdrawal-crypto-select');
    const withdrawalNetworkSelect = document.getElementById('withdrawal-network-select');
    const withdrawalNetworkContainer = document.getElementById('withdrawal-network-container');
    const networkWarning = document.getElementById('network-warning');
    const withdrawalAmount = document.getElementById('withdrawal-amount');
    const withdrawalAvailableBalance = document.getElementById('withdrawal-available-balance');
    const withdrawalFee = document.getElementById('withdrawal-fee');
    const withdrawalReceive = document.getElementById('withdrawal-receive');

    if (withdrawalCryptoSelect && withdrawalNetworkSelect) {
        // Available balances for each cryptocurrency (demo data)
        const availableBalances = {
            'USDT': '125.50',
            'USDC': '350.00',
            'BTC': '0.15',
            'ETH': '1.25',
            'BNB': '5.75',
            'SOL': '20.30',
            'XRP': '150.00',
            'TRX': '5000.00'
        };
        
        // Network fees for each crypto/network
        const networkFees = {
            'USDT': {
                'TRX': '1 USDT',
                'ERC': '10-25 USDT',
                'SOL': '0.01 USDT',
                'BSC': '0.5 USDT'
            },
            'USDC': { 'native': '10-25 USDC' },
            'BTC': { 'native': '0.0001 BTC' },
            'ETH': { 'native': '0.002-0.005 ETH' },
            'BNB': { 'native': '0.0005 BNB' },
            'SOL': { 'native': '0.01 SOL' },
            'XRP': { 'native': '0.1 XRP' },
            'TRX': { 'native': '1 TRX' }
        };
        
        // Handle withdrawal crypto selection change
        withdrawalCryptoSelect.addEventListener('change', function() {
            const selectedCrypto = this.value;
            
            // Clear network select
            withdrawalNetworkSelect.innerHTML = '';
            
            if (selectedCrypto) {
                // Show network selection for the selected crypto
                withdrawalNetworkContainer.style.display = 'block';
                
                // Update available balance
                withdrawalAvailableBalance.textContent = `Available: ${availableBalances[selectedCrypto] || '0.00'} ${selectedCrypto}`;
                
                // Populate network options (reuse the same network options as deposit)
                if (networkOptions[selectedCrypto]) {
                    networkOptions[selectedCrypto].forEach(option => {
                        const optElement = document.createElement('option');
                        optElement.value = option.value;
                        optElement.textContent = option.label;
                        withdrawalNetworkSelect.appendChild(optElement);
                    });
                    
                    // Trigger network change to update fees
                    const event = new Event('change');
                    withdrawalNetworkSelect.dispatchEvent(event);
                }
            } else {
                // Hide network selection if no crypto selected
                withdrawalNetworkContainer.style.display = 'none';
                withdrawalAvailableBalance.textContent = 'Available: 0.00';
                withdrawalFee.textContent = '0.0000';
                withdrawalReceive.textContent = '0.0000';
            }
        });
        
        // Handle withdrawal network selection change
        withdrawalNetworkSelect.addEventListener('change', function() {
            const selectedCrypto = withdrawalCryptoSelect.value;
            const selectedNetwork = this.value;
            
            if (selectedCrypto && selectedNetwork) {
                // Show network warning for USDT
                if (selectedCrypto === 'USDT') {
                    networkWarning.style.display = 'block';
                } else {
                    networkWarning.style.display = 'none';
                }
                
                // Update network fee
                if (networkFees[selectedCrypto] && networkFees[selectedCrypto][selectedNetwork]) {
                    withdrawalFee.textContent = networkFees[selectedCrypto][selectedNetwork];
                } else if (selectedNetwork === 'native' && networkFees[selectedCrypto] && networkFees[selectedCrypto]['native']) {
                    withdrawalFee.textContent = networkFees[selectedCrypto]['native'];
                } else {
                    withdrawalFee.textContent = 'Varies based on network congestion';
                }
                
                // Update amount calculation
                updateWithdrawalCalculation();
            }
        });
        
        // Handle withdrawal amount input change
        if (withdrawalAmount) {
            withdrawalAmount.addEventListener('input', updateWithdrawalCalculation);
            
            // MAX button functionality
            document.querySelector('#withdrawal .btn-max').addEventListener('click', function() {
                const selectedCrypto = withdrawalCryptoSelect.value;
                if (selectedCrypto && availableBalances[selectedCrypto]) {
                    withdrawalAmount.value = availableBalances[selectedCrypto];
                    updateWithdrawalCalculation();
                }
            });
        }
        
        // Function to update the withdrawal calculation
        function updateWithdrawalCalculation() {
            const selectedCrypto = withdrawalCryptoSelect.value;
            const amountValue = parseFloat(withdrawalAmount.value) || 0;
            
            if (selectedCrypto && amountValue > 0) {
                // Simple calculation for wireframe purposes
                // In a real system, you would use actual fee calculations
                let estimatedFee = 0;
                
                switch(selectedCrypto) {
                    case 'BTC': estimatedFee = 0.0001; break;
                    case 'ETH': estimatedFee = 0.005; break;
                    case 'USDT': estimatedFee = 5; break;
                    case 'USDC': estimatedFee = 5; break;
                    case 'BNB': estimatedFee = 0.0005; break;
                    case 'SOL': estimatedFee = 0.01; break;
                    case 'XRP': estimatedFee = 0.1; break;
                    case 'TRX': estimatedFee = 1; break;
                    default: estimatedFee = 0;
                }
                
                const receiveAmount = Math.max(0, amountValue - estimatedFee);
                withdrawalReceive.textContent = `${receiveAmount.toFixed(4)} ${selectedCrypto}`;
            } else {
                withdrawalReceive.textContent = `0.0000 ${selectedCrypto || 'BTC'}`;
            }
        }
    }

    // Withdrawal button action
    document.querySelector('#withdrawal .btn-withdraw').addEventListener('click', function() {
        const selectedCrypto = document.getElementById('withdrawal-crypto-select').value;
        const selectedNetwork = document.getElementById('withdrawal-network-select').value;
        const withdrawalAmount = document.getElementById('withdrawal-amount').value;
        
        if (!selectedCrypto) {
            alert('Please select a cryptocurrency');
            return;
        }
        
        if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
            alert('Please enter a valid withdrawal amount');
            return;
        }
        
        alert(`${withdrawalAmount} ${selectedCrypto} withdrawal has been initiated! Transaction has been sent for processing.`);
        
        // Add a new transaction in the history
        const transactionList = document.querySelector('#history .transaction-table');
        const newRow = document.createElement('div');
        newRow.className = 'table-row';
        
        const today = new Date();
        const formattedDate = `${today.toLocaleString('default', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`;
        
        newRow.innerHTML = `
            <div class="cell">${formattedDate}</div>
            <div class="cell">Withdrawal</div>
            <div class="cell">-${withdrawalAmount} ${selectedCrypto}</div>
            <div class="cell">Processing</div>
            <div class="cell"><button class="btn-details">View</button></div>
        `;
        
        transactionList.appendChild(newRow);
    });

    // Function to add transaction to history with cryptocurrency and network information
    function addTransactionToHistory(type, amount, currency, status = 'Completed') {
        const table = document.querySelector('.transaction-table');
        if (!table) return;
        
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        const newRow = document.createElement('div');
        newRow.className = 'table-row';
        
        newRow.innerHTML = `
            <div class="cell" data-label="Date">${formattedDate}</div>
            <div class="cell" data-label="Type">${type}</div>
            <div class="cell" data-label="Amount">${amount}</div>
            <div class="cell" data-label="Currency">${currency}</div>
            <div class="cell" data-label="Status">${status}</div>
            <div class="cell" data-label="Details"><button class="btn-details">View</button></div>
        `;
        
        // Insert the new row at the top of the table
        const existingRows = table.querySelectorAll('.table-row');
        if (existingRows.length > 0) {
            table.insertBefore(newRow, existingRows[0]);
        } else {
            table.appendChild(newRow);
        }
    }

    // Update deposit button to include crypto and network info
    document.querySelector('#deposit .btn-notify').addEventListener('click', function() {
        const selectedCrypto = document.getElementById('crypto-select').value;
        const selectedNetwork = document.getElementById('network-select').value;
        const amount = document.querySelector('#deposit input[type="text"]').value || '100.00';

        if (!selectedCrypto) {
            alert('Please select a cryptocurrency');
            return;
        }
        
        alert(`Deposit notification received! We'll credit your account once the deposit is confirmed.`);
        
        let networkDisplay = '';
        if (selectedNetwork === 'native') {
            if (selectedCrypto === 'BTC') networkDisplay = 'Bitcoin';
            else if (selectedCrypto === 'ETH') networkDisplay = 'Ethereum';
            else if (selectedCrypto === 'BNB') networkDisplay = 'Binance Chain';
            else if (selectedCrypto === 'SOL') networkDisplay = 'Solana';
            else if (selectedCrypto === 'XRP') networkDisplay = 'XRP Ledger';
            else if (selectedCrypto === 'TRX') networkDisplay = 'TRON';
            else if (selectedCrypto === 'USDC') networkDisplay = 'Ethereum';
        } else if (selectedNetwork === 'TRX') {
            networkDisplay = 'TRC20';
        } else if (selectedNetwork === 'ERC') {
            networkDisplay = 'ERC20';
        } else if (selectedNetwork === 'SOL') {
            networkDisplay = 'SPL';
        } else if (selectedNetwork === 'BSC') {
            networkDisplay = 'BSC';
        }
        
        addTransactionToHistory('Deposit', `+${amount}`, networkDisplay);
    });

    // Withdrawal button action updated to include network info
    document.querySelector('#withdrawal .btn-withdraw').addEventListener('click', function() {
        const selectedCrypto = document.getElementById('withdrawal-crypto-select').value;
        const selectedNetwork = document.getElementById('withdrawal-network-select').value;
        const withdrawalAmount = document.getElementById('withdrawal-amount').value;
        
        if (!selectedCrypto) {
            alert('Please select a cryptocurrency');
            return;
        }
        
        if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
            alert('Please enter a valid withdrawal amount');
            return;
        }
        
        alert(`${withdrawalAmount} ${selectedCrypto} withdrawal has been initiated! Transaction has been sent for processing.`);
        
        let networkDisplay = '';
        if (selectedNetwork === 'native') {
            if (selectedCrypto === 'BTC') networkDisplay = 'Bitcoin';
            else if (selectedCrypto === 'ETH') networkDisplay = 'Ethereum';
            else if (selectedCrypto === 'BNB') networkDisplay = 'Binance Chain';
            else if (selectedCrypto === 'SOL') networkDisplay = 'Solana';
            else if (selectedCrypto === 'XRP') networkDisplay = 'XRP Ledger';
            else if (selectedCrypto === 'TRX') networkDisplay = 'TRON';
            else if (selectedCrypto === 'USDC') networkDisplay = 'Ethereum';
        } else if (selectedNetwork === 'TRX') {
            networkDisplay = 'TRC20';
        } else if (selectedNetwork === 'ERC') {
            networkDisplay = 'ERC20';
        } else if (selectedNetwork === 'SOL') {
            networkDisplay = 'SPL';
        } else if (selectedNetwork === 'BSC') {
            networkDisplay = 'BSC';
        }
        
        addTransactionToHistory('Withdrawal', `-${withdrawalAmount}`, networkDisplay);
    });

    // Conversion button updated to include crypto info
    document.querySelector('#conversion .btn-convert').addEventListener('click', function() {
        const fromAmount = document.querySelector('#conversion .form-group:first-child input').value;
        const fromCurrency = document.querySelector('#conversion .form-group:first-child select').value;
        const toCurrency = document.querySelector('#conversion .form-group:nth-child(3) select').value;
        
        if (fromAmount) {
            alert(`Conversion successful! Converted ${fromAmount} ${fromCurrency} to ${toCurrency}.`);
            addTransactionToHistory('Conversion', `${fromAmount}`, `${fromCurrency} → ${toCurrency}`);
        } else {
            alert('Please enter an amount to convert');
        }
    });

    // Internal transfer button updated to include crypto info
    document.querySelector('#internal-transfer .btn-transfer').addEventListener('click', function() {
        const transferAmount = document.querySelector('#internal-transfer .form-group:nth-child(3) input').value || '100.00';
        const transferAsset = document.querySelector('#internal-transfer .form-group:nth-child(2) select').value || 'USD';
        
        alert('Transfer successful! Funds have been sent to the recipient.');
        
        if (transferAsset === 'USD') {
            addTransactionToHistory('Internal Transfer', `-${transferAmount}`, 'USD');
        } else {
            addTransactionToHistory('Internal Transfer', `-${transferAmount}`, transferAsset);
        }
    });

    // Update Notify Us of Transfer button in the Bank Transfer tab
    document.querySelector('#deposit .btn-notify').addEventListener('click', function() {
        const amount = document.querySelector('#deposit input[placeholder="Enter transfer amount"]')?.value || '500.00';
        alert('Transfer notification received! We\'ll credit your account once the transfer is confirmed.');
        
        addTransactionToHistory('Bank Deposit', `+${amount}`, 'USD');
    });

    // Add event listeners for Customer Service buttons
    document.querySelectorAll('.btn-customer-service').forEach(button => {
        button.addEventListener('click', function() {
            alert('Connecting to customer service... A support agent will assist you shortly.');
        });
    });

    // Add event listeners for deposit submission
    document.querySelectorAll('.deposit-content-panel .btn-submit-transaction').forEach(button => {
        button.addEventListener('click', function() {
            const panel = this.closest('.deposit-content-panel');
            const depositType = panel.querySelector('h3').textContent;
            
            // Show processing overlay
            showProcessingOverlay('Processing Deposit');
            
            // Simulate processing time
            setTimeout(() => {
                hideProcessingOverlay();
                alert(`${depositType} submitted successfully! Your deposit will be credited to your account shortly.`);
                
                // Add transaction to history
                addTransactionToHistory('Deposit', '+$500.00', 'USD');
            }, 2000);
        });
    });

    // Add event listeners for withdrawal submission
    document.querySelectorAll('.withdrawal-content-panel .btn-submit-transaction').forEach(button => {
        button.addEventListener('click', function() {
            const panel = this.closest('.withdrawal-content-panel');
            const withdrawalType = panel.querySelector('h3').textContent;
            
            // Show processing overlay
            showProcessingOverlay('Processing Withdrawal');
            
            // Simulate processing time
            setTimeout(() => {
                hideProcessingOverlay();
                alert(`${withdrawalType} request submitted successfully! Your withdrawal is being processed.`);
                
                // Add transaction to history
                if (withdrawalType.includes('Cryptocurrency')) {
                    const cryptoType = document.getElementById('withdrawal-crypto-select').value || 'BTC';
                    const amount = document.getElementById('withdrawal-amount').value || '0.1';
                    addTransactionToHistory('Withdrawal', `-${amount}`, cryptoType);
                } else {
                    addTransactionToHistory('Withdrawal', '-$500.00', 'USD');
                }
            }, 2000);
        });
    });

    // Processing overlay functions
    function showProcessingOverlay(message = 'Processing Transaction') {
        let overlay = document.getElementById('processingOverlay');
        
        // Create overlay if it doesn't exist
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'processingOverlay';
            overlay.className = 'processing-overlay';
            
            overlay.innerHTML = `
                <div class="processing-container">
                    <div class="spinner-border">
                        <div class="spinner"></div>
                    </div>
                    <p class="processing-message">${message}</p>
                    <p class="processing-subtext">Please wait while we complete your request</p>
                </div>
            `;
            
            document.body.appendChild(overlay);
            
            // Add styles if not already in CSS
            if (!document.getElementById('processing-styles')) {
                const style = document.createElement('style');
                style.id = 'processing-styles';
                style.textContent = `
                    .processing-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                    }
                    
                    .processing-container {
                        background-color: white;
                        padding: 30px;
                        border-radius: 8px;
                        text-align: center;
                        max-width: 400px;
                        width: 80%;
                    }
                    
                    .spinner {
                        width: 50px;
                        height: 50px;
                        border: 5px solid #f3f3f3;
                        border-top: 5px solid #3498db;
                        border-radius: 50%;
                        margin: 0 auto 20px;
                        animation: spin 1s linear infinite;
                    }
                    
                    .processing-message {
                        font-size: 1.2rem;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    
                    .processing-subtext {
                        color: #6c757d;
                    }
                    
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            overlay.querySelector('.processing-message').textContent = message;
        }
        
        overlay.style.display = 'flex';
    }

    function hideProcessingOverlay() {
        const overlay = document.getElementById('processingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    // Transaction History enhancements
    function setupTransactionHistory() {
        // Add status color classes for transaction status
        document.querySelectorAll('.cell[data-label="Status"]').forEach(cell => {
            const status = cell.textContent.trim();
            if (status === 'Completed') {
                cell.classList.add('status-completed');
            } else if (status === 'Processing') {
                cell.classList.add('status-processing');
            } else if (status === 'Failed') {
                cell.classList.add('status-failed');
            }
        });
        
        // Handle pagination clicks
        const paginationButtons = document.querySelectorAll('.pagination .btn-page:not(.prev):not(.next)');
        const prevButton = document.querySelector('.pagination .btn-page.prev');
        const nextButton = document.querySelector('.pagination .btn-page.next');
        
        if (paginationButtons.length) {
            paginationButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Update active state
                    paginationButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Enable/disable prev/next buttons based on current page
                    const currentPage = parseInt(this.textContent);
                    if (prevButton) {
                        prevButton.disabled = currentPage === 1;
                    }
                    if (nextButton) {
                        nextButton.disabled = currentPage === paginationButtons.length;
                    }
                    
                    // In a real app, we would load the appropriate page data here
                    // For the wireframe, we'll just show an alert
                    alert(`Loading transaction page ${currentPage}`);
                });
            });
        }
        
        // Handle prev/next pagination
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                if (this.disabled) return;
                
                const activeButton = document.querySelector('.pagination .btn-page.active');
                if (activeButton) {
                    const currentPage = parseInt(activeButton.textContent);
                    if (currentPage > 1) {
                        const prevPage = document.querySelector(`.pagination .btn-page:not(.prev):not(.next):nth-child(${currentPage - 1})`);
                        if (prevPage) {
                            prevPage.click();
                        }
                    }
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                if (this.disabled) return;
                
                const activeButton = document.querySelector('.pagination .btn-page.active');
                if (activeButton) {
                    const currentPage = parseInt(activeButton.textContent);
                    const nextPage = document.querySelector(`.pagination .btn-page:not(.prev):not(.next):nth-child(${currentPage + 1})`);
                    if (nextPage) {
                        nextPage.click();
                    }
                }
            });
        }
        
        // Handle transaction details view
        document.querySelectorAll('.btn-details').forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('.table-row');
                const date = row.querySelector('.cell[data-label="Date"]').textContent;
                const type = row.querySelector('.cell[data-label="Type"]').textContent;
                const amount = row.querySelector('.cell[data-label="Amount"]').textContent;
                const currency = row.querySelector('.cell[data-label="Currency"]').textContent;
                const status = row.querySelector('.cell[data-label="Status"]').textContent;
                
                // Create a transaction ID (would normally come from the database)
                const transactionId = 'TX' + Math.random().toString(36).substring(2, 10).toUpperCase();
                
                // Show modal or alert with transaction details
                const details = `
Transaction Details:
-------------------
Date: ${date}
Type: ${type}
Amount: ${amount}
Currency: ${currency}
Status: ${status}
Transaction ID: ${transactionId}
`;
                alert(details);
            });
        });
        
        // Handle export button
        const exportButton = document.querySelector('.btn-export');
        if (exportButton) {
            exportButton.addEventListener('click', function() {
                alert('Exporting transaction data as CSV...');
                // In a real app, this would trigger a download
            });
        }
        
        // Handle filters
        const filterButton = document.querySelector('.btn-filter');
        if (filterButton) {
            filterButton.addEventListener('click', function() {
                const dateRange = document.querySelector('.history-filters select:nth-child(1)').value;
                const transactionType = document.querySelector('.history-filters select:nth-child(2)').value;
                const currency = document.querySelector('#history-currency-filter').value;
                const status = document.querySelector('.history-filters select:nth-child(4)').value;
                
                alert(`Applying filters: 
Date Range: ${dateRange}
Transaction Type: ${transactionType || 'All'}
Currency: ${currency || 'All'}
Status: ${status || 'All'}`);
                
                // In a real app, this would fetch filtered data from the server
            });
        }
    }

    // Initialize transaction history enhancements
    setupTransactionHistory();

    // Add a function to handle authentication-based UI changes
    function setupAuthenticatedUI() {
        // Create a sidebar for authenticated pages if it doesn't exist
        function createDashboardSidebar() {
            // Check if sidebar already exists
            if (document.querySelector('.dashboard-sidebar')) return;
            
            // Create sidebar element
            const sidebar = document.createElement('div');
            sidebar.className = 'dashboard-sidebar';
            sidebar.innerHTML = `
                <div class="sidebar-profile">
                    <div class="profile-avatar">JD</div>
                    <div class="profile-name">John Doe</div>
                    <div class="verification-status">Verified</div>
                </div>
                
                <ul class="sidebar-nav">
                    <li><a href="#dashboard" class="active"><span class="icon">📊</span> Dashboard</a></li>
                    <li><a href="#deposit"><span class="icon">💰</span> Deposit</a></li>
                    <li><a href="#withdrawal"><span class="icon">📤</span> Withdrawal</a></li>
                    <li><a href="#conversion"><span class="icon">🔄</span> Convert</a></li>
                    <li><a href="#internal-transfer"><span class="icon">↔️</span> Transfer</a></li>
                    <li><a href="#savings"><span class="icon">📈</span> Investments</a></li>
                    <li><a href="#history"><span class="icon">📜</span> History</a></li>
                    <li><a href="#message-center"><span class="icon">✉️</span> Messages</a></li>
                    <li><a href="#referral"><span class="icon">👥</span> Referrals</a></li>
                    <li><a href="#account-settings"><span class="icon">⚙️</span> Settings</a></li>
                </ul>
            `;
            
            return sidebar;
        }
        
        // Function to add sidebar to a specific page
        function addSidebarToPage(pageId) {
            const page = document.getElementById(pageId);
            if (!page) return;
            
            // Check if this page already has a container with sidebar
            if (page.querySelector('.dashboard-container')) return;
            
            // Create container
            const container = document.createElement('div');
            container.className = 'dashboard-container';
            
            // Create sidebar
            const sidebar = createDashboardSidebar();
            
            // Move all existing content to a main content div
            const mainContent = document.createElement('div');
            mainContent.className = 'dashboard-main';
            
            // Clone all children to the main content div
            while (page.children.length > 1) { // Keep the h2 title
                mainContent.appendChild(page.children[1]);
            }
            
            // Add sidebar and main content to container
            container.appendChild(sidebar);
            container.appendChild(mainContent);
            
            // Add container after the h2 title
            page.appendChild(container);
            
            // Set up sidebar navigation
            const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Add active class to clicked link
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Scroll to the linked section (smooth scroll)
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 20,
                            behavior: 'smooth'
                        });
                    }
                    
                    // For mobile: Hide sidebar if screen is small
                    if (window.innerWidth < 992) {
                        const sidebarElement = this.closest('.dashboard-sidebar');
                        if (sidebarElement) {
                            sidebarElement.style.display = 'none';
                            setTimeout(() => {
                                sidebarElement.style.display = '';
                            }, 500);
                        }
                    }
                });
            });
            
            // Update active sidebar link based on current page
            const activeLink = sidebar.querySelector(`.sidebar-nav a[href="#${pageId}"]`);
            if (activeLink) {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                activeLink.classList.add('active');
            }
            
            // Additional code to update the portfolio data for the dashboard page
            if (pageId === 'dashboard') {
                // Use setTimeout to ensure DOM elements are fully created
                setTimeout(updatePortfolioData, 100);
            }
        }
        
        // List of authenticated pages
        const authenticatedPages = [
            'dashboard', 'deposit', 'withdrawal', 'conversion', 
            'internal-transfer', 'savings', 'history', 
            'message-center', 'referral', 'account-settings', 'kyc'
        ];
        
        // Add sidebar to all authenticated pages
        authenticatedPages.forEach(pageId => {
            addSidebarToPage(pageId);
        });
        
        // Add a function to update the portfolio data
        function updatePortfolioData() {
            // Portfolio overview data
            const portfolioData = {
                totalBalance: '$24,395',
                fiatPercentage: '35%',
                cryptoPercentage: '65%',
                fiatBalance: '$8,554.68',
                cryptoBalance: '$15,840.32',
                cryptoAssets: [
                    { 
                        symbol: 'BTC', 
                        name: 'Bitcoin', 
                        icon: '₿', 
                        available: '0.12', 
                        locked: '0.03', 
                        total: '0.15', 
                        availableUsd: '$6,996.00', 
                        lockedUsd: '$1,749.00', 
                        totalUsd: '$8,745.00',
                        earnings: '$125.30',
                        earningsPercent: '+2.8%'
                    },
                    { 
                        symbol: 'ETH', 
                        name: 'Ethereum', 
                        icon: 'Ξ', 
                        available: '1.1', 
                        locked: '0.15', 
                        total: '1.25', 
                        availableUsd: '$2,739.00', 
                        lockedUsd: '$373.50', 
                        totalUsd: '$3,112.50',
                        earnings: '$78.45',
                        earningsPercent: '+3.1%'
                    },
                    { 
                        symbol: 'USDT', 
                        name: 'USDT', 
                        icon: '₮', 
                        available: '2,000.00', 
                        locked: '500.00', 
                        total: '2,500.00', 
                        availableUsd: '$2,000.00', 
                        lockedUsd: '$500.00', 
                        totalUsd: '$2,500.00',
                        earnings: '$43.75',
                        earningsPercent: '+1.8%'
                    },
                    { 
                        symbol: 'USDC', 
                        name: 'USDC', 
                        icon: 'U', 
                        available: '900.00', 
                        locked: '0.00', 
                        total: '900.00', 
                        availableUsd: '$900.00', 
                        lockedUsd: '$0.00', 
                        totalUsd: '$900.00',
                        earnings: '$15.30',
                        earningsPercent: '+1.7%'
                    },
                    { 
                        symbol: 'SOL', 
                        name: 'Solana', 
                        icon: '◎', 
                        available: '2.45', 
                        locked: '0.30', 
                        total: '2.75', 
                        availableUsd: '$519.40', 
                        lockedUsd: '$63.42', 
                        totalUsd: '$582.82',
                        earnings: '$28.65',
                        earningsPercent: '+5.2%'
                    }
                ],
                fiatAssets: [
                    { 
                        symbol: 'USD', 
                        name: 'USD', 
                        icon: '$', 
                        available: '$3,250.00', 
                        locked: '$0.00', 
                        total: '$3,250.00',
                        earnings: '$32.50',
                        earningsPercent: '+1.0%'
                    },
                    { 
                        symbol: 'RMB', 
                        name: 'RMB', 
                        icon: '¥', 
                        available: '¥20,000.00', 
                        locked: '¥5,000.00', 
                        total: '¥25,000.00', 
                        availableUsd: '$2,804.68', 
                        lockedUsd: '$701.17', 
                        totalUsd: '$3,505.85',
                        earnings: '$12.45',
                        earningsPercent: '+0.4%'
                    },
                    { 
                        symbol: 'HKD', 
                        name: 'HKD', 
                        icon: 'HK$', 
                        available: 'HK$12,000.00', 
                        locked: 'HK$2,080.00', 
                        total: 'HK$14,080.00', 
                        availableUsd: '$1,532.66', 
                        lockedUsd: '$266.17', 
                        totalUsd: '$1,798.83',
                        earnings: '$5.80',
                        earningsPercent: '+0.3%'
                    }
                ]
            };
            
            // Get portfolio sections in dashboard
            const dashboard = document.getElementById('dashboard');
            if (!dashboard) return;
            
            // Update donut chart hole value
            const donutValue = dashboard.querySelector('.donut-value');
            if (donutValue) {
                donutValue.textContent = portfolioData.totalBalance;
            }
            
            // Update donut chart segments
            const donutChart = dashboard.querySelector('.donut-chart');
            if (donutChart) {
                donutChart.style.background = `conic-gradient(
                    #5C6BC0 0% ${portfolioData.cryptoPercentage},
                    #4DB6AC ${portfolioData.cryptoPercentage} 100%
                )`;
            }
            
            // Update legend percentages
            const legendItems = dashboard.querySelectorAll('.legend-item');
            if (legendItems.length >= 2) {
                const fiatLegendValue = legendItems[0].querySelector('.legend-value');
                const cryptoLegendValue = legendItems[1].querySelector('.legend-value');
                
                if (fiatLegendValue) {
                    fiatLegendValue.textContent = `${portfolioData.fiatPercentage} (${portfolioData.fiatBalance})`;
                }
                
                if (cryptoLegendValue) {
                    cryptoLegendValue.textContent = `${portfolioData.cryptoPercentage} (${portfolioData.cryptoBalance})`;
                }
            }
            
            // Update balance amounts
            const cryptoBalanceAmount = dashboard.querySelector('#crypto-balance .balance-amount');
            const fiatBalanceAmount = dashboard.querySelector('#fiat-balance .balance-amount');
            
            if (cryptoBalanceAmount) {
                cryptoBalanceAmount.textContent = portfolioData.cryptoBalance;
            }
            
            if (fiatBalanceAmount) {
                fiatBalanceAmount.textContent = portfolioData.fiatBalance;
            }
            
            // Update asset tables
            updateAssetTable(
                dashboard.querySelector('#crypto-balance .asset-table tbody'),
                portfolioData.cryptoAssets
            );
            
            updateAssetTable(
                dashboard.querySelector('#fiat-balance .asset-table tbody'),
                portfolioData.fiatAssets
            );
        }
        
        // Updated helper function to update asset tables with earnings data
        function updateAssetTable(tableBody, assets) {
            if (!tableBody || !assets || !assets.length) return;
            
            // Clear existing rows
            tableBody.innerHTML = '';
            
            // Create new rows
            assets.forEach(asset => {
                const row = document.createElement('tr');
                
                // Asset info cell
                const assetCell = document.createElement('td');
                assetCell.innerHTML = `
                    <div class="asset-info">
                        <div class="asset-icon ${asset.symbol.toLowerCase()}-icon">${asset.icon}</div>
                        <div>
                            <div class="asset-name">${asset.name}</div>
                        </div>
                    </div>
                `;
                
                // Available cell
                const availableCell = document.createElement('td');
                availableCell.innerHTML = `
                    ${asset.available} ${asset.symbol !== 'USD' ? asset.symbol : ''}
                    ${asset.availableUsd ? `<br><span class="usd-value">${asset.availableUsd}</span>` : ''}
                `;
                
                // Locked cell
                const lockedCell = document.createElement('td');
                lockedCell.innerHTML = `
                    ${asset.locked} ${asset.symbol !== 'USD' ? asset.symbol : ''}
                    ${asset.lockedUsd ? `<br><span class="usd-value">${asset.lockedUsd}</span>` : ''}
                `;
                
                // Earnings cell (new)
                const earningsCell = document.createElement('td');
                earningsCell.innerHTML = `
                    <div class="earnings-cell">
                        <span class="earnings-amount">${asset.earnings}</span>
                        <span class="earnings-percent ${asset.earningsPercent.startsWith('+') ? 'positive' : 'negative'}">${asset.earningsPercent}</span>
                    </div>
                `;
                
                // Total cell
                const totalCell = document.createElement('td');
                totalCell.innerHTML = `
                    ${asset.total} ${asset.symbol !== 'USD' ? asset.symbol : ''}
                    ${asset.totalUsd ? `<br><span class="usd-value">${asset.totalUsd}</span>` : ''}
                `;
                
                // Add cells to row
                row.appendChild(assetCell);
                row.appendChild(availableCell);
                row.appendChild(lockedCell);
                row.appendChild(earningsCell);
                row.appendChild(totalCell);
                
                // Add row to table
                tableBody.appendChild(row);
            });
        }
    }

    // Update signup completion to handle authentication
    document.addEventListener('DOMContentLoaded', function() {
        // Registration flow - update last step to set up authenticated UI
        const lastNextButton = document.querySelector('.registration-step:last-child .btn-next');
        if (lastNextButton) {
            lastNextButton.addEventListener('click', function() {
                // Mark user as authenticated
                localStorage.setItem('isAuthenticated', 'true');
                
                // Set up authenticated UI
                setupAuthenticatedUI();
            });
        }
        
        // KYC verification completion
        const kycSubmitButton = document.querySelector('#kyc .btn-submit');
        if (kycSubmitButton) {
            kycSubmitButton.addEventListener('click', function() {
                // Mark user as verified
                localStorage.setItem('isVerified', 'true');
                
                // Update UI if not already set up
                if (localStorage.getItem('isAuthenticated') === 'true') {
                    setupAuthenticatedUI();
                }
            });
        }
        
        // Check if user is already authenticated (e.g., on page refresh)
        if (localStorage.getItem('isAuthenticated') === 'true') {
            setupAuthenticatedUI();
        }
    });

    // Add Portfolio refresh button functionality
    const refreshButton = document.querySelector('.portfolio-overview .refresh-btn');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            // Show spinner in the button
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner-small"></span> Refreshing...';
            this.disabled = true;
            
            // Simulate refresh delay
            setTimeout(() => {
                // Restore button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Update portfolio data
                updatePortfolioData();
                
                // Show success message
                alert('Portfolio data refreshed successfully!');
            }, 1500);
        });
    }

    // Handle earnings period selector
    const periodOptions = document.querySelectorAll('.earnings-period-selector .period-option');
    if (periodOptions.length) {
        periodOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Update active period
                periodOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Update earnings data based on selected period
                updateEarningsData(this.textContent.trim());
            });
        });
    }
    
    // Function to update earnings data based on period
    function updateEarningsData(period) {
        // Sample data for different periods (in a real app, this would come from an API)
        const earningsData = {
            'Week': {
                total: '$342.15',
                change: '+2.1%',
                staking: '$185.42',
                stakingChange: '+3.4%',
                interest: '$143.50',
                interestChange: '+1.2%',
                referral: '$13.23',
                referralChange: '-0.5%',
                chartData: [10, 15, 12, 18, 22, 20, 25]
            },
            'Month': {
                total: '$1,256.80',
                change: '+4.3%',
                staking: '$680.25',
                stakingChange: '+5.2%',
                interest: '$542.30',
                interestChange: '+3.7%',
                referral: '$34.25',
                referralChange: '+2.1%',
                chartData: [40, 38, 45, 50, 48, 52, 60, 58, 55, 62, 65, 68, 70, 73, 71, 75, 80, 82, 85, 88, 90, 85, 92, 95, 98, 96, 94, 99, 100, 105]
            },
            'Quarter': {
                total: '$3,680.50',
                change: '+8.2%',
                staking: '$1,950.30',
                stakingChange: '+9.1%',
                interest: '$1,580.45',
                interestChange: '+7.5%',
                referral: '$149.75',
                referralChange: '+4.3%',
                chartData: [100, 120, 110, 130, 150, 155, 170, 165, 180, 200, 220, 240, 230]
            },
            'Year': {
                total: '$12,845.30',
                change: '+15.7%',
                staking: '$6,920.75',
                stakingChange: '+17.3%',
                interest: '$5,425.80',
                interestChange: '+14.2%',
                referral: '$498.75',
                referralChange: '+8.5%',
                chartData: [300, 320, 350, 370, 400, 420, 450, 470, 500, 520, 550, 580]
            },
            'All Time': {
                total: '$24,530.65',
                change: '+32.4%',
                staking: '$13,250.30',
                stakingChange: '+35.8%',
                interest: '$9,875.45',
                interestChange: '+28.7%',
                referral: '$1,404.90',
                referralChange: '+18.3%',
                chartData: [100, 150, 200, 250, 300, 400, 500, 600, 700, 850, 1000, 1200, 1400, 1600, 1800, 2000]
            }
        };
        
        // Get the data for the selected period
        const data = earningsData[period] || earningsData['Week'];
        
        // Update earnings values
        const earningItems = document.querySelectorAll('.earnings-item');
        if (earningItems.length >= 4) {
            // Total earnings
            updateEarningItem(earningItems[0], data.total, data.change);
            
            // Staking rewards
            updateEarningItem(earningItems[1], data.staking, data.stakingChange);
            
            // Interest
            updateEarningItem(earningItems[2], data.interest, data.interestChange);
            
            // Referral bonuses
            updateEarningItem(earningItems[3], data.referral, data.referralChange);
        }
        
        // In a real application, you would also update the chart with the new data
        updateEarningsChart(data.chartData);
    }
    
    // Helper function to update an earning item with new values
    function updateEarningItem(item, value, change) {
        if (!item) return;
        
        const valueElement = item.querySelector('.earnings-item-value');
        if (!valueElement) return;
        
        // Extract the current HTML structure
        const changeElement = valueElement.querySelector('.earnings-change');
        
        // Update value
        valueElement.childNodes[0].nodeValue = value + ' ';
        
        // Update change value and class
        if (changeElement) {
            changeElement.textContent = change;
            
            // Update class based on positive/negative change
            if (change.startsWith('+')) {
                changeElement.classList.remove('negative');
                changeElement.classList.add('positive');
            } else {
                changeElement.classList.remove('positive');
                changeElement.classList.add('negative');
            }
        }
    }
    
    // Simple function to simulate updating the earnings chart
    // In a real application, you would use a chart library like Chart.js
    function updateEarningsChart(chartData) {
        // This is just a placeholder for the wireframe
        // In a real app, you would update the chart with actual data
        const chartLine = document.querySelector('.earnings-chart .chart-line');
        if (chartLine) {
            // Simulate chart animation
            chartLine.style.opacity = '0';
            setTimeout(() => {
                chartLine.style.opacity = '1';
                
                // Change the background position slightly to simulate a different chart
                chartLine.style.backgroundPosition = `${Math.random() * 50}% 0`;
            }, 300);
        }
    }
    
    // Additional code to update the portfolio data for the dashboard page
    function updatePortfolioData() {
        // ... existing code ...
        
        // After updating portfolio data, also refresh earnings data
        const activePeriod = document.querySelector('.earnings-period-selector .period-option.active');
        if (activePeriod) {
            updateEarningsData(activePeriod.textContent.trim());
        }
    }
    
    // Initialize earnings data on page load
    function setupEarningsSection() {
        // Get the default (first) period option
        const defaultPeriod = document.querySelector('.earnings-period-selector .period-option.active');
        if (defaultPeriod) {
            updateEarningsData(defaultPeriod.textContent.trim());
        }
        
        // Add styles for the small spinner if not already in CSS
        if (!document.getElementById('spinner-small-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-small-styles';
            style.textContent = `
                .spinner-small {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: #fff;
                    animation: spin 1s linear infinite;
                    margin-right: 5px;
                    vertical-align: middle;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Call setup function when dashboard is initialized
    if (document.querySelector('.earnings-section')) {
        setupEarningsSection();
    }
    
    // Add earnings data initialization to authenticated UI setup
    const originalSetupAuthenticatedUI = setupAuthenticatedUI;
    setupAuthenticatedUI = function() {
        // Call the original function first
        originalSetupAuthenticatedUI();
        
        // Then initialize earnings data
        setTimeout(setupEarningsSection, 200);
    };
}); 