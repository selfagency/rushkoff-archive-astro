(function($) {

  var titles = [];
  var listSelector = '#search-list';
  var searchInputSelector = '.search-input-text';
  var searchButtonSelector = '.search-button';
  var publicationOptionSelector = '.search-input-publication';
  var categoryOptionSelector = '.search-input-category';
  
  function init() {
    $(searchInputSelector).on('input', onChange);
    $(publicationOptionSelector).on('change', onChange);
    $(categoryOptionSelector).on('change', onChange);
    $(searchButtonSelector).on('click', clearAll);
  }

  function onChange() {
    var searchText = $(searchInputSelector).val();
    var publication = $(publicationOptionSelector).val();
    var category = $(categoryOptionSelector).val();
    filter(simplify(searchText), publication, category);
  }

  function clearAll(e) {
    e.preventDefault();
    
    // console.log("clear"); // DEBUG
    $(searchInputSelector).val('');
    $(publicationOptionSelector).val('');
    $(categoryOptionSelector).val('');
    filter('');
  }
  
  function simplify(text) {
    if (!text) return '';
    return text.toLowerCase()
               .replace(/\s+/g, ' ')
               .replace(/[^\w ]+/g, '');
  }
  
  function filter(text, publicationId, categoryId) {
    // console.log("search:",text); // DEBUG
    var items = $(listSelector).children('li');
    items.each(function (ix) {
      var item = $(this);
      var itemTitle = $('.post-list-title', this).text();
      var itemSubTitle = $('.post-list-subtitle', this).text();
      var itemPublicationId = item.attr('_publication-id');
      var itemCategoryIds = item.attr('_category-ids');
      itemCategoryIds = itemCategoryIds? itemCategoryIds.split(' ').filter(nonBlank) : [];
      
      var isTitleMatching = !!simplify(itemTitle+' '+itemSubTitle).match(text);
      var isPublicationMatching = !itemPublicationId || !publicationId || itemPublicationId == publicationId;
      var isCategoryMatching = !categoryId || itemCategoryIds.includes(categoryId);
      
      // console.log("match title:", simplify(itemTitle+' '+itemSubTitle), isTitleMatching)
      // console.log("match publication:", itemPublicationId, isPublicationMatching)
      // console.log("match category:", itemCategoryIds, isCategoryMatching)
      $(this).toggle(isTitleMatching && isPublicationMatching && isCategoryMatching);

      function nonBlank(str) {
        return str !== null && str !== undefined && str !== "";
      }
    })
  }
  // run init on document ready
  $(document).ready(init);

})(jQuery);
