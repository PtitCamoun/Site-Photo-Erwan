// panier.js - Gestion dynamique globale
document.addEventListener("DOMContentLoaded", function() {
    // Écoute les clics sur les boutons d'ajout
    const formBtn = document.querySelector('.btn-submit-cart');
    if (formBtn) {
        formBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupère la taille et la quantité sélectionnées
            const selectSize = document.querySelector('.select-size');
            const qtyInput = document.querySelector('.input-qty');
            
            if (selectSize && selectSize.value === "") {
                alert("Veuillez choisir une option de taille.");
                return;
            }
            
            // Analyse le prix dans l'option textuelle (ex: "20,00 €")
            const optionText = selectSize.options[selectSize.selectedIndex].text;
            const priceMatch = optionText.match(/(\d+),(\d+)\s*€/);
            let itemPrice = 20.00;
            if (priceMatch) {
                itemPrice = parseFloat(priceMatch[1] + '.' + priceMatch[2]);
            }
            
            const qty = qtyInput ? parseInt(qtyInput.value) : 1;
            
            // Sauvegarde dans la mémoire locale
            let currentQty = parseInt(localStorage.getItem('panierQuantite') || 0);
            let currentTotal = parseFloat(localStorage.getItem('panierTotal') || 0);
            
            localStorage.setItem('panierQuantite', currentQty + qty);
            localStorage.setItem('panierTotal', (currentTotal + (itemPrice * qty)).toFixed(2));
            
            // LANCE L'ANIMATION VISUELLE FLASH
            formBtn.style.background = '#22c55e';
            formBtn.style.color = '#fff';
            formBtn.style.borderColor = '#22c55e';
            formBtn.textContent = 'Ajouté ! ✓';
            
            // Animation de secousse légère sur le panier haut
            const headerCart = document.querySelector('.cart-btn-fixed');
            if (headerCart) {
                headerCart.style.transform = 'scale(1.1)';
                headerCart.style.transition = 'transform 0.2s';
                setTimeout(() => { headerCart.style.transform = 'scale(1)'; }, 200);
            }
            
            // Réinitialise le bouton après 1.5 seconde
            setTimeout(() => {
                formBtn.style.background = 'transparent';
                formBtn.style.color = '#57534e';
                formBtn.style.borderColor = '#d6d3d1';
                formBtn.textContent = 'Ajouter Au Panier';
            }, 1500);
            
            // Actualise l'affichage haut
            actualiserBarreNavigation();
        });
    }

    // Fonction de synchronisation immédiate des montants
    function actualiserBarreNavigation() {
        const badge = document.querySelector('.cart-badge');
        const priceSpan = document.querySelector('.cart-btn-fixed span');
        
        const quantite = localStorage.getItem('panierQuantite') || 0;
        const total = parseFloat(localStorage.getItem('panierTotal') || 0).toFixed(2);
        
        if (badge) badge.textContent = quantite;
        if (priceSpan) priceSpan.textContent = total.replace('.', ',') + ' €';
    }

    // Lance la mise à jour globale au chargement
    actualiserBarreNavigation();
});
