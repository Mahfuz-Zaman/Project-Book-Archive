document.getElementById('error-message').style.display = "none";

const searchBook = () => {
    const searchBookInput = document.getElementById('search-field');
    const searchText = searchBookInput.value;
    searchBookInput.value = "";

    if (searchText == "") {
        displayError()
    }

    else {
        document.getElementById('error-message').style.display = "none";
        //const proxy = "https://cors-anywhere.herokuapp.com/"
        const url = `http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.docs));

    }


}

const displaySearch = books => {
    const searchResult = document.getElementById('search-result');
    if (searchResult == undefined) {
        displayError();
    }
    else {
        searchResult.textContent = "";
        document.getElementById("find-message").innerText = `Total book Found  ${books.length}`

        books.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `            
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : "N/A"}-M.jpg" class="card-img-top bg-white" alt="Images is not Available">
            <div class="card-body">
                <h5 class="card-title">Book Title:${book.title}</h5>
                <h5 class="card-title">Author:${book.author_name}</h5>
                <h6 class="card-title"> First published On:${book.first_publish_year}</h6>
            </div>
        </div>`;
            searchResult.appendChild(div);
        })
    }

}



const displayError = () => {
    document.getElementById('error-message').style.display = "block";
    document.getElementById('search-result').textContent = "";
    document.getElementById("find-message").innerText = "";
}