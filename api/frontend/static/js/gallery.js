document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://images-api.nasa.gov/search?q=mars&media_type=image";
    const galleryContainer = document.getElementById("gallery-container");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.getElementById("close-lightbox");
    const loadingText = document.getElementById("loading-text");

    const loadPhotos = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.collection && data.collection.items) {
                const items = data.collection.items;
                if (items.length === 0) {
                    galleryContainer.innerHTML = "<p>Brak wyników związanych z Marsem.</p>";
                    return;
                }

                loadingText.style.display = "none"; 
                galleryContainer.innerHTML = ""; 

                items.forEach(item => {
                    if (item.links && item.links[0]) {
                        const mediaUrl = item.links[0].href;
                        const mediaTitle = item.data[0].title || "Unknown Title";

                        const imgElement = document.createElement("div");
                        imgElement.classList.add("gallery-item");
                        imgElement.style.backgroundImage = `url('${mediaUrl}')`;
                        imgElement.title = mediaTitle;

                        imgElement.addEventListener("click", () => {
                            lightboxImg.src = mediaUrl;
                            lightboxImg.alt = mediaTitle;
                            lightbox.classList.remove("hidden");
                        });

                        galleryContainer.appendChild(imgElement);
                    }
                });
            } else {
                galleryContainer.innerHTML = "<p>Brak wyników związanych z Marsem.</p>";
            }
        } catch (error) {
            console.error("Error loading photos:", error);
            galleryContainer.innerHTML = "<p>Błąd wczytywania danych.</p>";
        }
    };

    loadPhotos();

    closeLightbox.addEventListener("click", () => {
        lightbox.classList.add("hidden");
        lightboxImg.src = ""; 
    });
});
