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
            .then(data => {
                displaySearch11(data.numFound);
                displaySearch(data.docs)
            }
            );


    }


}

const displaySearch11 = item => {
    document.getElementById("find-message").innerText = `Total book Found  ${item}`
}
const displaySearch = books => {
    const searchResult = document.getElementById('search-result');
    if (searchResult == null) {
        displayError();
    }
    else {
        searchResult.textContent = "";
        books.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `            
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : "N/A"}-M.jpg" class="card-img-top bg-white" alt="Images is not Available">
            <div class="card-body">
                <h4 class="card-title">Book Title:${book.title}</h4>
                <h5><small>Author:${book.author_name}</small></h5>
                <small>First published On:${book.first_publish_year}</small>
                
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