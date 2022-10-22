const loadCategorys = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        categoryItems(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
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


const loadItems = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayAllItems(data.data);
    }
    catch (error) {
        console.log(error);
    }

    // console.log(data.data);
}

const displayAllItems = (categories) => {
    const displayCategoriesField = document.getElementById('display-categories');
    displayCategoriesField.textContent = '';
    categories.forEach(category => {
        console.log(category);
        const displayCategoryItem = document.createElement('div');
        displayCategoryItem.classList.add('col');
        displayCategoryItem.innerHTML = `
        <div class="card">
                <img class="img-fluid" src="${category.image_url}" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${category.title}</h5>
                    <p class="card-text">${category.details.slice(0, 300) + '...'}</p>
                </div >
                
                <div class="d-flex justify-content-between">
                    
                        <img class="img-fluid rounded-circle w-25" src="${category.author.img}" alt="">
                        <span class="mt-2 fs-6 fw-bold">${category.author.name ? category.author.name : 'No name available'}</span>
                    
                        <i class="fa-regular fa-eye mt-5"><span>${category.total_view ? category.total_view : 'Notseen'}</span></i>
                    
                        <button type="button" onclick="loadSingleCategory('${category._id}')" class="btn btn-primary mt-4 h-50" data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</button> 
                </div>           
        </div >
    `;
        displayCategoriesField.appendChild(displayCategoryItem);
    });
}

const loadSingleCategory = async (categoryId) => {
    console.log(categoryId);

    const url = `https://openapi.programming-hero.com/api/news/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data[0]);
    displayDetail(data.data[0]);

}


const displayDetail = (categoryItemId) => {

    console.log(categoryItemId);
    const modalList = document.getElementById('exampleModalLabel');
    modalList.innerText = categoryItemId.title;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img class="img-fluid" src="${categoryItemId.image_url}" alt="...">
    <h4>AuthorName: ${categoryItemId.author.name}</h4>
    <p>Published Date: ${categoryItemId.author.published_date}</p>
    <p class="card-text">${categoryItemId.details}</p>

    <div class="d-flex justify-content-between">
                    
                        <img class="img-fluid rounded-circle w-25" src="${categoryItemId.author.img}" alt="">
                        <span class="mt-2 fs-6 fw-bold">${categoryItemId.author.name ? categoryItemId.author.name : 'No name available'}</span>
                    
                        <i class="fa-regular fa-eye mt-5"><span>${categoryItemId.total_view ? categoryItemId.total_view : 'Notseen'}</span></i> 
                </div>
    `;

}

loadCategorys();