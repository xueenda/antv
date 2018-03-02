import $ from 'jquery';
import _ from 'lodash';
import getQueryVariable from './utils/get-query-variable';
import './gallery.less';

const sortBy = getQueryVariable('sort');
const $sortByRecommended = $('#btn-sort-by-recommended');
const $sortByLatest = $('#btn-sort-by-latest');
const $galleryContainer = $('#gallery-container');

if (sortBy === 'latest') {
  $sortByRecommended.removeClass('disabled');
  $sortByLatest.addClass('disabled');
  const $galleryCases = $galleryContainer.children('.gallery-case');
  $galleryCases.sort((a, b) => {
    const aDate = a.getAttribute('data-date').replace(/-/g, '');
    const bDate = b.getAttribute('data-date').replace(/-/g, '');
    return bDate - aDate;
  });
  $galleryCases.detach().appendTo($galleryContainer);
} else {
  $sortByRecommended.addClass('disabled');
  $sortByLatest.removeClass('disabled');
  const $galleryCases = $galleryContainer.children('.gallery-case');
  $galleryCases.sort((a, b) => {
    const aIndex = a.getAttribute('data-index');
    const bIndex = b.getAttribute('data-index');
    return aIndex - bIndex;
  });
  $galleryCases.detach().appendTo($galleryContainer);
}

// headroom behavior
$('header').headroom({
    offset: 0,
    tolerance: 0,
    classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
    },
    onPin() {
    },
    onUnpin() {
    }
});

$('.lazyload').lazyload();

const $galleryFiltering = $('#gallery-filtering-query');
$galleryFiltering.on('input', _.debounce(() => {
  const str = $galleryFiltering.val();
  if (!str) {
    $('#gallery-container .gallery-case').show();
  } else {
    $('#gallery-container .gallery-case').each(function () {
      const $case = $(this);
      const title = $case.data('title');
      if (title.indexOf(str) === -1) {
        $case.hide();
      } else {
        $case.show();
      }
    });
  }
}));
