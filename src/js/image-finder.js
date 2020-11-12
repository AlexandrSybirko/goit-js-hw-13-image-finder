import ImagesApiService from './fetchImages';
import getRefs from './gets-refs'


const refs = getRefs()



const imagesApiService = new ImagesApiService()


refs.searchForm.addEventListener('input', onSearch)


function onSearch(event) {
  event.preventDefault();

  try {
    noResultMessage.classList.add('is-hidden');
    const inputSearchValue = event.currentTarget.elements.query.value;
    imageApiService.query = inputSearchValue;

    loadMoreBtn.classList.add('is-hidden');

    imageApiService.resetPage();
    clearArticlesContainer();
    const response = await imageApiService.fetchImages();

    if (response.length === 0) {
      noResultMessage.classList.remove('is-hidden');
    } else if (response.length > 0) {
      appendArticlesMarkup(response);
      loadMoreBtn.classList.remove('is-hidden');
    }
    if (response.length < 12) {
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log('Ошибка');
  }
}


