const form = document.getElementById("RegistForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;

     if(nama === "" || email === "") {
        alert (`Nama dan email wajib diisi yaa`);
     } else {
        alert (`Terimakasih ${nama} sudah mendaftar. Untuk Info selanjutnya akan kami hubungi via email yaa`);
        form.reset();
     }
});

   const button = document.getElementById("random-book-btn");
   button.addEventListener("click", fetchRandomBook);

async function fetchRandomBook() {
    try {
        const response = await fetch(
            "https://openlibrary.org/search.json?q=fiction"
        );

        const data = await response.json();

        const books = data.docs;

        const randomBook = books[Math.floor(Math.random() * books.length)];

        const title = randomBook.title || "Unknown Title";

        const author = randomBook.author_name
                ? randomBook.author_name[0]
                : "Unknown Author";

        const coverId = randomBook.cover_i;

        const image = coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                : "img/trending book.jpg";

        document.getElementById("book-title").textContent = title;
        document.getElementById("book-author").textContent = "Penulis: " + author;
        document.getElementById("book-image").src = image;

        const workKey = randomBook.key;
        document.getElementById("book-link").href = "https://openlibrary.org" + workKey;

        document.getElementById("title-trending").style.display = "none";
        document.getElementById("book-year").style.display = "none";
        document.getElementById("book-read").style.display = "none";

    } catch (error) {
        console.log(error);
        alert("Gagal mengambil data buku.");
    }
}