document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Met à jour les compteurs de la navbar (somme et badge) sur TOUTES les pages
    function actualiserBarreNavigation() {
        const badge = document.querySelector('.cart-badge');
        const priceSpan = document.querySelector('.cart-btn-fixed span');
        
        let articles = JSON.parse(localStorage.getItem('listeArticles') || "[]");
        let quantiteTotale = 0;
        let prixTotal = 0;
        
        articles.forEach(item => {
            quantiteTotale += item.quantite;
            prixTotal += item.prix * item.quantite;
        });
        
        if (badge) badge.textContent = quantiteTotale;
        if (priceSpan) priceSpan.textContent = prixTotal.toFixed(2).replace('.', ',') + ' €';
    }

    // 2. Logique d'ajout au panier (sur les fiches produits)
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
            
            // Détection automatique du nom du produit et de son image
            const nomProduit = document.querySelector('.product-title-main').textContent.trim();
            const srcImage = document.querySelector('.product-image-side img').getAttribute('src');
            
            // Détermination du prix exact selon l'option choisie
            let itemPrice = 20.00;
            const optionText = selectSize.options[selectSize.selectedIndex].text;
            // Récupère proprement la taille (ex: "20x30 cm")
            const optionTaille = optionText.split('—')[0].trim(); 
            
            if (optionText.includes('35,00')) { itemPrice = 35.00; }
            else if (optionText.includes('50,00')) { itemPrice = 50.00; }
            
            const qty = qtyInput ? parseInt(qtyInput.value) : 1;
            
            // Sauvegarde dans la liste des articles
            let articles = JSON.parse(localStorage.getItem('listeArticles') || "[]");
            
            // Si l'article avec la même taille existe déjà, on augmente sa quantité
            const articleExistant = articles.find(item => item.nom === nomProduit && item.taille === optionTaille);
            if (articleExistant) {
                articleExistant.quantite += qty;
            } else {
                articles.push({
                    nom: nomProduit,
                    image: srcImage,
                    taille: optionTaille,
                    prix: itemPrice,
                    quantite: qty
                });
            }
            
            localStorage.setItem('listeArticles', JSON.stringify(articles));
            
            // Animation du bouton en vert
            formBtn.style.background = '#22c55e';
            formBtn.style.color = '#fff';
            formBtn.style.borderColor = '#22c55e';
            formBtn.textContent = 'Ajouté ! ✓';
            
            // Effet sur la navbar
            const headerCart = document.querySelector('.cart-btn-fixed');
            if (headerCart) {
                headerCart.style.transform = 'scale(1.08)';
                headerCart.style.transition = 'transform 0.15s ease';
                setTimeout(() => { headerCart.style.transform = 'scale(1)'; }, 150);
            }
            
            setTimeout(() => {
                formBtn.style.background = 'transparent';
                formBtn.style.color = '#57534e';
                formBtn.style.borderColor = '#d6d3d1';
                formBtn.textContent = 'Ajouter Au Panier';
            }, 1500);
            
            actualiserBarreNavigation();
        });
    }

    // 3. Logique d'affichage réel de la page panier.html
    const itemsArea = document.getElementById('dynamic-items');
    if (itemsArea) {
        function chargerPanierReel() {
            let articles = JSON.parse(localStorage.getItem('listeArticles') || "[]");
            
            const subtotalDisp = document.getElementById('subtotal-display');
            const totalDisp = document.getElementById('total-display');
            
            if (articles.length === 0) {
                itemsArea.innerHTML = '<p style="font-size:13px;color:#78716c;padding:20px 0;">Votre panier est actuellement vide.</p>';
                if (subtotalDisp) subtotalDisp.textContent = '0,00 €';
                if (totalDisp) totalDisp.textContent = '0,00 €';
                return;
            }
            
            var htmlContent = '';
            var prixCalculéTotal = 0;
            
            // Boucle pour construire le HTML de CHAQUE vrai produit ajouté
            articles.forEach((item, index) => {
                var sousTotalItem = item.prix * item.quantite;
                prixCalculéTotal += sousTotalItem;
                
                htmlContent += '<div class="cart-item">';
                htmlContent += '<div class="item-image" style="width:90px;margin-right:20px;"><img src="' + item.image + '" style="width:100%;display:block;border:1px solid #e7e5e4;"></div>';
                htmlContent += '<div class="item-details">';
                htmlContent += '<span class="item-name" style="font-size:14px;font-weight:500;display:block;margin-bottom:4px;">' + item.nom + '</span>';
                htmlContent += '<span class="item-meta" style="font-size:11px;color:#78716c;display:block;margin-bottom:8px;">Taille : ' + item.taille + ' (x' + item.quantite + ')</span>';
                htmlContent += '<button class="btn-remove" data-index="' + index + '" style="background:transparent;border:none;color:#a8a29e;font-size:11px;cursor:pointer;text-decoration:underline;">Supprimer</button>';
                htmlContent += '</div>';
                htmlContent += '<div class="item-price" style="font-size:14px;font-weight:600;">' + sousTotalItem.toFixed(2).replace('.', ',') + ' €</div>';
                htmlContent += '</div>';
            });
            
            itemsArea.innerHTML = htmlContent;
            
            var totalFormate = prixCalculéTotal.toFixed(2).replace('.', ',') + ' €';
            if (subtotalDisp) subtotalDisp.textContent = totalFormate;
            if (totalDisp) totalDisp.textContent = totalFormate;
            
            // Rendre fonctionnels les boutons individuels "Supprimer"
            const removeButtons = itemsArea.querySelectorAll('.btn-remove');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const idx = parseInt(this.getAttribute('data-index'));
                    articles.splice(idx, 1); // Retire l'élément de la liste
                    localStorage.setItem('listeArticles', JSON.stringify(articles));
                    chargerPanierReel();
                    actualiserBarreNavigation();
                });
            });
        }

        const btnOrder = document.getElementById('btn-order');
        if (btnOrder) {
            btnOrder.addEventListener('click', function(e) {
                e.preventDefault();
                let articles = JSON.parse(localStorage.getItem('listeArticles') || "[]");
                if(articles.length === 0) {
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
