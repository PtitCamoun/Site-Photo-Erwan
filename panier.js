document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Rafraîchir les montants en haut (sur toutes les pages)
    function actualiserBarreNavigation() {
        const badge = document.querySelector('.cart-badge');
        const priceSpan = document.querySelector('.cart-btn-fixed span');
        const quantite = localStorage.getItem('panierQuantite') || 0;
        const total = parseFloat(localStorage.getItem('panierTotal') || 0).toFixed(2);
        
        if (badge) badge.textContent = quantite;
        if (priceSpan) priceSpan.textContent = total.replace('.', ',') + ' €';
    }

    // 2. Gestion du bouton d'ajout sur les fiches produits
    const formBtn = document.querySelector('.btn-submit-cart');
    if (formBtn) {
        formBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const selectSize = document.querySelector('.select-size');
            const qtyInput = document.querySelector('.input-qty');
            
            if (selectSize && selectSize.value === "") {
                alert("Veuillez choisir une option de taille.");
                return;
            }
            
            let itemPrice = 20.00;
            const optionText = selectSize.options[selectSize.selectedIndex].text;
            if (optionText.includes('35,00')) { itemPrice = 35.00; }
            else if (optionText.includes('50,00')) { itemPrice = 50.00; }
            
            const qty = qtyInput ? parseInt(qtyInput.value) : 1;
            let currentQty = parseInt(localStorage.getItem('panierQuantite') || 0);
            let currentTotal = parseFloat(localStorage.getItem('panierTotal') || 0);
            
            localStorage.setItem('panierQuantite', currentQty + qty);
            localStorage.setItem('panierTotal', (currentTotal + (itemPrice * qty)).toFixed(2));
            
            formBtn.style.background = '#22c55e';
            formBtn.style.color = '#fff';
            formBtn.style.borderColor = '#22c55e';
            formBtn.textContent = 'Ajouté ! ✓';
            
            setTimeout(() => {
                formBtn.style.background = 'transparent';
                formBtn.style.color = '#57534e';
                formBtn.style.borderColor = '#d6d3d1';
                formBtn.textContent = 'Ajouter Au Panier';
            }, 1500);
            
            actualiserBarreNavigation();
        });
    }

    // 3. Gestion spécifique de la page panier.html
    const itemsArea = document.getElementById('dynamic-items');
    if (itemsArea) {
        function chargerPanierReel() {
            var qty = parseInt(localStorage.getItem('panierQuantite') || 0);
            var total = parseFloat(localStorage.getItem('panierTotal') || 0).toFixed(2);
            var totalFormate = total.replace('.', ',') + ' €';
            
            const subtotalDisp = document.getElementById('subtotal-display');
            const totalDisp = document.getElementById('total-display');
            if (subtotalDisp) subtotalDisp.textContent = totalFormate;
            if (totalDisp) totalDisp.textContent = totalFormate;
            
            if (qty === 0) {
                itemsArea.innerHTML = '<p style="font-size:13px;color:#78716c;">Votre panier est actuellement vide.</p>';
                return;
            }
            
            var htmlContent = '<div class="cart-item"><div class="item-details"><span class="item-name">Sélection de Tirages d Art</span><span class="item-meta">Quantité totale d œuvres : ' + qty + '</span><button class="btn-remove" id="btn-clear">Vider le panier</button></div><div class="item-price">' + totalFormate + '</div></div>';
            itemsArea.innerHTML = htmlContent;
            
            document.getElementById('btn-clear').addEventListener('click', function() {
                localStorage.removeItem('panierQuantite');
                localStorage.removeItem('panierTotal');
                chargerPanierReel();
                actualiserBarreNavigation();
            });
        }

        const btnOrder = document.getElementById('btn-order');
        if (btnOrder) {
            btnOrder.addEventListener('click', function(e) {
                e.preventDefault();
                var qty = parseInt(localStorage.getItem('panierQuantite') || 0);
                if(qty === 0) {
                    alert("Votre panier est vide.");
                    return;
                }
                alert("Commande simulée avec succès !");
            });
        }
        chargerPanierReel();
    }

    actualiserBarreNavigation();
});
