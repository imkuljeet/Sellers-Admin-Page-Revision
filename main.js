document.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/ffad334bea8f4ca0997b21fa66dae038/adminPage')
        .then((res) => {
            const products = res.data;
            products.forEach(product => {
                addProductToList(product);
            });

            document.body.addEventListener('click', function (event) {
                if (event.target.classList.contains('delete-btn')) {
                    const li = event.target.parentElement;
                    const id = li.getAttribute('data-id');
                    
                    axios.delete(`https://crudcrud.com/api/ffad334bea8f4ca0997b21fa66dae038/adminPage/${id}`)
                        .then(() => {
                            li.remove();
                        })
                        .catch(error => {
                            console.error("There was an error deleting the item!", error);
                        });
                }
            });
        })
        .catch(error => {
            console.error("There was an error fetching the data!", error);
        });
});

function sellersPage(event) {
    event.preventDefault();

    const sellingPrice = event.target.sellingPrice.value;
    const productName = event.target.productName.value;
    const category = event.target.category.value;

    const productDetails = {
        selling_price: sellingPrice,
        product_name: productName,
        categories: category
    };

    axios.post('https://crudcrud.com/api/ffad334bea8f4ca0997b21fa66dae038/adminPage', productDetails)
        .then(res => {
            addProductToList(res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

function addProductToList(product) {
    const itemHTML = `<li data-id="${product._id}">
                        ${product.selling_price} --- ${product.product_name} --- ${product.categories}
                        <button class="delete-btn">Delete</button>
                      </li>`;
    
    const categoryList = {
        "Electronics": 'elec',
        "Foods": 'food',
        "Skincare": 'skincare'
    };

    document.getElementById(categoryList[product.categories]).innerHTML += itemHTML;
}