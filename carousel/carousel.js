function CarouselController($http) {
    var vm = this

    var noticia = {
        author: '',
        title: '',
        img: '',
        url: ''
    }

    vm.loading = true

    vm.noticias = []

    for (let i = 0; i < 3; i++) {
        vm.noticias[i] = {... noticia}
    }

    carregarCarousel()

    function carregarCarousel() {
        $http.get('https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=4d924b0582a14cf199fc22e4613b4a0e')
            .then(function(data) {
                for (let i = 0; i < 3; i++) {
                    vm.noticias[i].author = data.data.articles[i].author == null ? 'Autor Desconhecido' : data.data.articles[i].author
                    vm.noticias[i].title = data.data.articles[i].title
                    vm.noticias[i].img = data.data.articles[i].urlToImage
                    vm.noticias[i].url = data.data.articles[i].url
                }
                vm.loading = false
            })
            .catch(function(error) {
        });
    }
}

angular.module('HackerNews').component('carousel', {
  templateUrl: 'carousel/carousel.html',
  controller: CarouselController
});