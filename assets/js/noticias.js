
const API_KEY = '5e8543eaed144748b72c29a391942e8a';
const container = document.getElementById('noticias-internacionais');

fetch(`https://newsapi.org/v2/top-headlines?language=pt&category=general&pageSize=4`, {
    headers: { 'X-Api-Key': API_KEY }
})
    .then(response => response.json())
    .then(data => {
        data.articles.forEach((noticia, index) => {
            const modalId = `modal-brasil-${index}`;
            const card = `
        <div class="col-md-3 mb-4">
            <div class="card">
                <img src="${noticia.urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${noticia.title}">
                <div class="card-body">
                    <h5 class="card-title">${noticia.title}</h5>
                    <p class="card-text">${noticia.description || ''}</p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">Ler mais</button>
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(noticia.title + ' ' + noticia.url)}" target="_blank" class="btn btn-success mt-2">
                        Compartilhar <i class="bi bi-whatsapp"></i>
                    </a>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${noticia.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${noticia.urlToImage || 'https://via.placeholder.com/800x400'}" class="img-fluid mb-3">
                        <p>${noticia.content || noticia.description || 'Leia mais no site oficial.'}</p>
                        <a href="${noticia.url}" target="_blank" class="btn btn-secondary">Ver notícia completa</a>
                    </div>
                </div>
            </div>
        </div>
        `;
            container.innerHTML += card;
        });
    })
    .catch(err => {
        container.innerHTML = '<p>Erro ao carregar notícias. Tente novamente mais tarde.</p>';
        console.error(err);
    });
