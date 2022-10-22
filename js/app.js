const loadCategorys = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    categoryItems(data.data.news_category);
    // console.log(data.data.news_category);
}
const categoryItems = (items) => {
    const categoryContainer = document.getElementById('category-items');
    items.forEach(item => {
        const itemField = document.createElement('div');
        itemField.classList.add('col');
        // itemField.classList.add('col-md-auto');
        // itemField.classList.add('justify-content-center');
        itemField.innerHTML = `
        <h4 onclick="loadItems('${item.category_id}')" class="btn text-primary">${item.category_name}</h4>
        `;
        categoryContainer.appendChild(itemField);
        // console.log(item);
    });

}
loadCategorys();

const loadItems = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllItems(data.data);
    console.log(data.data);
}

const displayAllItems = (categories) => {
    const displayCategoriesField = document.getElementById('display-categories');
    displayCategoriesField.textContent = '';
    categories.forEach(category => {
        console.log(category);
        const displayCategoryItem = document.createElement('div');
        displayCategoryItem.classList.add('col');
        displayCategoryItem.innerHTML = `
        <div class="card p-4">
            <img class="img-fluid" src="${category.image_url}" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${category.title}</h5>
                    <p class="card-text">${category.details.slice(0, 300) + '...'}</p>
                </div >
                
                <div class="d-flex justify-content-between border">
                    <div class="d-flex">
                        <img class="rounded-circle w-25 border p-3" src="${category.author.img}" alt="">
                        <h6 class="mt-4">${category.author.name ? category.author.name : 'No name available'}</h6>
                    </div>
                        <i class="fa-regular fa-eye mt-5"><span>111</span></i>
                    <div>
                        <button type="button" class="btn btn-primary mt-5 h-50">View Details</button>
                    </div>
                    
                    
                </div>
                    
                        
                    
                
        </div >
    `;
        displayCategoriesField.appendChild(displayCategoryItem);
    });
}