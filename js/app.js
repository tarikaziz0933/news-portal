const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    categoryItems(data.data.news_category);
}
const categoryItems = (items) => {
    const categoryContainer = document.getElementById('category-items');
    items.forEach(item => {
        const itemField = document.createElement('div');
        itemField.innerHTML = `
        <h4 onclick="loadItems()" class="btn text-primary">${item.category_name}</h4>
        `;
        categoryContainer.appendChild(itemField);
    });

}
loadCategory();
function loadItems() {
    console.log('onclick');
}