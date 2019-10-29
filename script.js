$(() => {
  const $paginations = $('.pagination');
  const totalPages = $paginations.data('total-pages');
  const visiblePageCount = 5;

  const updatePagination = (page) => {
    $paginations.each((index, pagination) => {
      const $pagination = $(pagination);
      const $closestButtons = $pagination.find('.page');

      $pagination.data('current-page', page);
      $closestButtons
        .removeClass('active')
        .filter(`[data-page="${page}"]`)
        .addClass('active');

      const $activeButton = $closestButtons.filter('.active');
      const $visibleButtons = $closestButtons.filter(':not(.hidden)');

      if ($visibleButtons.eq(0).hasClass('active') && page > 1) {
        $visibleButtons.eq($visibleButtons.length - 1).addClass('hidden');
        $activeButton.prev().removeClass('hidden');
      } else if ($visibleButtons.eq(visiblePageCount - 1).hasClass('active') && page !== totalPages) {
        $visibleButtons.eq(0).addClass('hidden');
        $activeButton.next().removeClass('hidden');
      }
    });
  };

  const loadPage = (page) => {
    console.log(`Page: ${page}`);
    $('#content').text(`Page: ${page}`);
  };

  $paginations.each((index, pagination) => {
    const $pagination = $(pagination);

    $pagination.find('.prev-page, .next-page').on('click', (event) => {
      const currentPage = $pagination.data('current-page');
      let page;

      $(event.currentTarget).hasClass('prev-page')
      ? page = currentPage - 1
      : page = currentPage + 1;

      if (page === 0 || page > totalPages) {
        return;
      }

      updatePagination(page);
      loadPage(page);
    });

    $pagination.find('.page').on('click', (event) => {
      const $target = $(event.currentTarget);
      const page = $target.data('page');

      if ($target.hasClass('active')) {
        return;
      }

      updatePagination(page);
      loadPage(page);
    });
  });
});