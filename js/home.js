document.addEventListener('DOMContentLoaded', () => {
    
    const cartIcons = document.querySelectorAll('.cart-icon');

    cartIcons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const image = card.querySelector('img').getAttribute('src');
            const name = card.querySelector('p').textContent;
            const price = card.querySelector('h3').textContent;

            const newItem = { image, name, price };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
          
            cart.push(newItem);
 
            localStorage.setItem('cart', JSON.stringify(cart));

            
            alert("!succfully");
        });
    });

    //cart العرض في ال  
    if (window.location.href.includes('cart.html')) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const tbody = document.getElementById('cart-items');
        
        if (!tbody) {
            console.error("لم يتم العثور على العنصر cart-items!");
            return;
        }

        tbody.innerHTML = '';

        cart.forEach((item, index) => {
            const row = `<tr>
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button class="delete-btn" data-index="${index}">✖</button></td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });

        // حدث الحذف
        tbody.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                e.target.closest('tr').remove();
            }
        });
    }
});
