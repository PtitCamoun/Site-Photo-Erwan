// panier.js - Synchronisation dynamique sans aucun bug
document.addEventListener("DOMContentLoaded", function() {
    
    // Fonction globale pour rafraîchir les montants en haut de l'écran
    function actualiserBarreNavigation() {
        const badge = document.querySelector('.cart-badge');
        const priceSpan = document.querySelector('.cart-btn-fixed span');
        
        const quantite = localStorage.getItem('panierQuantite') || 0;
        const total = parseFloat(localStorage.getItem('panierTotal') || 0).toFixed(2);
        
        if (badge) badge.textContent = quantite;
        if (priceSpan) priceSpan.textContent = total.replace('.', ',') + ' €';
    }

    // Gestion du clic sur le bouton "Ajouter au panier"
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
            
            // Détermination du prix exact selon l'option choisie
            let itemPrice = 20.00;
            const optionText = selectSize.options[selectSize.selectedIndex].text;
            
            if (optionText.includes('35,00')) {
                itemPrice = 35.00;
            } else if (optionText.includes('50,00')) {
                itemPrice = 50.00;
            }
            
            const qty = qtyInput ? parseInt(qtyInput.value) : 1;
            
            // Lecture et calcul des totaux stockés
            let currentQty = parseInt(localStorage.getItem('panierQuantite') || 0);
            let currentTotal = parseFloat(localStorage.getItem('panierTotal') || 0);
            
            localStorage.setItem('panierQuantite', currentQty + qty);
            localStorage.setItem('panierTotal', (currentTotal + (itemPrice * qty)).toFixed(2));
            
            // ANIMATION VISUELLE : Le bouton passe au vert
            formBtn.style.background = '#22c55e';
            formBtn.style.color = '#fff';
            formBtn.style.borderColor = '#22c55e';
            formBtn.textContent = 'Ajouté ! ✓';
            
            // Effet de rebond léger sur le bouton panier de la navbar
            const headerCart = document.querySelector('.cart-btn-fixed');
            if (headerCart) {
                headerCart.style.transform = 'scale(1.08)';
                headerCart.style.transition = 'transform 0.15s ease';
                setTimeout(() => { headerCart.style.transform = 'scale(1)'; }, 150);
            }
            
            // Remet le bouton à son état initial après 1,5 seconde
            setTimeout(() => {
                formBtn.style.background = 'transparent';
                formBtn.style.color = '#57534e';
                formBtn.style.borderColor = '#d6d3d1';
                formBtn.textContent = 'Ajouter Au Panier';
            }, 1500);
            
            actualiserBarreNavigation();
        });
    }

    // Met à jour la barre dès l'ouverture de la page
    actualiserBarreNavigation();
});
