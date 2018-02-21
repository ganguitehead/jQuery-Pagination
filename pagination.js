  $.fn.extend({
        setPagination: function (totalNumPages) {
            var numOfPages = Cookies.get("unitDisplayNumPages");// Have this value as the default cookie value for the total number of page numbers

            if (totalNumPages) {
                // If there is a parameter passed for the total number of page numbebers 
                numOfPages = totalNumPages;
            }

            var PaginationDiv = $(this);

            $(PaginationDiv).find(".custom-pagination-page-numbers").empty();

            var pageIndex = 1;

            if (numOfPages <= 3) {
                var totalPagesInLoop = numOfPages;
            } else {
                var totalPagesInLoop = 3;
            }

            while (pageIndex <= totalPagesInLoop) {
                var className = "pagination-navigation-page ";
                if (pageIndex == 1) {
                    className += "custom-pagination-navigation-disabled";
                }

                var paginationNumberLink = $("<a></a>")
                        .attr("href", "#")
                        .addClass(className)
                        .attr("data-custom-pagination-page-number", pageIndex)
                        .html(pageIndex);

                // Append the page numbers 
                $(PaginationDiv)
                        .find(".custom-pagination-page-numbers")
                        .append(paginationNumberLink);

                pageIndex++;
            }



            // Set the data last page number to the last pagination link 
            $(PaginationDiv)
                    .find(".custom-pagination-navigation-last")
                    .attr("data-custom-pagination-page-number", numOfPages);

            // Set the data next page number to the next pagination link 
            $(PaginationDiv)
                    .find(".custom-pagination-navigation-next")
                    .attr("data-custom-pagination-page-number", 2);


            // Set the data next page number to the next pagination link 
            $(PaginationDiv)
                    .find(".custom-pagination-navigation-previous")
                    .attr("data-custom-pagination-page-number", 0);

        },

        goToNextPagefunction: function (callBack) {
            // Get the data attribute of the next page number    
            var disabledClassName = "custom-pagination-navigation-disabled";

            var nextPageNum = parseInt($(this)
                    .find(".custom-pagination-navigation-next")
                    .attr("data-custom-pagination-page-number"));

            // Check if the next page number is valid and exists -  and not greater than the last page number
            var lastPageNum = parseInt($(this)
                    .find(".custom-pagination-navigation-last")
                    .attr("data-custom-pagination-page-number"));

            /**
             * 1. If the Next page number is not the last page in the list 
             * 2. Assign the new page value to the next pagination button data attribute
             * Re-assign values to the existing page numbers - change their data attribute values
             * Remove the class from the current page number and move it to the next page number
             * If the new page number is the last child in the pagination numbers : re assign all the 3 values for the pagination.
             */
            if (nextPageNum !== lastPageNum) {                
                // Remove the class from current selected page
                var currentPageSelected = $(this)
                        .find(".custom-pagination-page-numbers")
                        .find(".custom-pagination-navigation-disabled");

                var nextPageNumber = nextPageNum + 1; // This is the currently selected page + 2 page becasue "nextPageNum" is already the "currentPage + 1"

                // If "0" : the three page numbers present in the page numbers div
                // are to be changed and new page numbers are to be put until the last page number is reached
                if ($(currentPageSelected).nextAll().length === 0) {
                    var pageNumbersElements = $(currentPageSelected).parent().children();

                    var pageIndex = nextPageNum;

                    $(pageNumbersElements).each(function (index, value) {
                        var pageNumberToShow = pageIndex + index;
                        $(value).attr("data-custom-pagination-page-number", pageNumberToShow).html(pageNumberToShow);
                    });

                    // Set the page highlight class to the first child among the three page number divs
                    $(pageNumbersElements).first().addClass(disabledClassName);
                    $(pageNumbersElements).last().removeClass(disabledClassName);

                } else {

                    // There are siblings after the current page number : hence move the highlight className to the
                    // next page number in the list 
                    $(currentPageSelected).next().addClass(disabledClassName);
                    $(currentPageSelected).removeClass(disabledClassName);

                }

                // Change the next page navigation data value                                                                                             
                $(this)
                        .find(".custom-pagination-navigation-next")
                        .attr("data-custom-pagination-page-number", nextPageNumber);

                // Change the previous page number to the correct value 
                // if the new page number is greater than 1
                if (nextPageNum > 1) {
                    $(this)
                            .find(".custom-pagination-navigation-previous")
                            .attr("data-custom-pagination-page-number", nextPageNum - 1);
                }

                if (callBack) // Calling the callback function passed as reference 
                {
                    callBack();
                }
            }
        },

        goToPreviousPagefunction: function (callBack) {
            // Move to Previous page from the current page - this function will only
            // handle the attribute level and html level changes of the buttons and not the page content
            // Page content updation has to be taken care by the callback function sent to this function                           
            var disabledClassName = "custom-pagination-navigation-disabled";

            var previousPageNum = parseInt($(this)
                    .find(".custom-pagination-navigation-previous")
                    .attr("data-custom-pagination-page-number"));

            // Check if the previous page number is valid and exists -  and not less than the first page number
            var firstPageNum = parseInt($(this)
                    .find(".custom-pagination-navigation-first")
                    .attr("data-custom-pagination-page-number"));

            // Check if the previous page number is less than 0                 
            if (previousPageNum > 0) {
                // Remove the class from current selected page
                var currentPageSelected = $(this)
                        .find(".custom-pagination-page-numbers")
                        .find(".custom-pagination-navigation-disabled");

                var nextPreviousPageNumber = previousPageNum - 1; // This value is equal to the "currently selected page + 2"  page because "prevPageNum" is already the "currentPage - 1"

                // If "0" : the three page numbers present in the page numbers div
                // are to be changed and new page numbers are to be put until the last page number is reached
                if ($(currentPageSelected).prevAll().length === 0) {
                    var pageNumbersElements = $(currentPageSelected).parent().children();

                    var pageIndex = previousPageNum;

                    $(pageNumbersElements.get().reverse()).each(function (index, value) {
                        var pageNumberToShow = pageIndex - index;
                        $(value).attr("data-custom-pagination-page-number", pageNumberToShow).html(pageNumberToShow);
                    });
//                                
//                                 // Set the page highlight class to the first child among the three page number divs
                    $(pageNumbersElements).last().addClass(disabledClassName);
                    $(pageNumbersElements).first().removeClass(disabledClassName);

                } else {
                    // There are siblings before the current page number : hence move the highlight className to the
                    // previous page number in the list                                  
                    $(currentPageSelected).prev().addClass(disabledClassName);
                    $(currentPageSelected).removeClass(disabledClassName);
                }


                // Change the next page navigation data value                                                                                             
                $(this)
                        .find(".custom-pagination-navigation-next")
                        .attr("data-custom-pagination-page-number", previousPageNum + 1);

                // Change the previous page number to the correct value 
                // if the new page number is greater than 1                            
                $(this)
                        .find(".custom-pagination-navigation-previous")
                        .attr("data-custom-pagination-page-number", nextPreviousPageNumber);


                if (callBack) // Calling the callback function passed as reference 
                {
                    callBack();
                }
            } else {
                console.log("Cant go beyond the wall!");
            }

            if (callBack) // Calling the callback function passed as reference 
            {
                callBack();
            }

        },

        goToPagefunction: function (targetPageNumber, callBack) {
            // Move to the page that's specified 
            // Validate that the page number is valid and exists
            var currentPageSelected = $(this)
                    .find(".custom-pagination-page-numbers")
                    .find(".custom-pagination-navigation-disabled");

            var disabledClassName = "custom-pagination-navigation-disabled";
            var lastPageNumber = parseInt($(this)
                    .find(".custom-pagination-navigation-last")
                    .attr("data-custom-pagination-page-number"));

            var targetPageNumber = parseInt(targetPageNumber);

            // Check if the target page number is valid.
            if (targetPageNumber <= lastPageNumber && targetPageNumber > 0) {
                // Change the highlist class and change the previous and next page numbers 
                // Change the next page navigation data value                                                                                             
                $(this)
                        .find(".custom-pagination-navigation-next")
                        .attr("data-custom-pagination-page-number", targetPageNumber + 1);

                // Change the previous page number to the correct value 
                // if the new page number is greater than 1                            
                $(this)
                        .find(".custom-pagination-navigation-previous")
                        .attr("data-custom-pagination-page-number", targetPageNumber - 1);

                // Add highlight class to the target page number div
                // Calculation to get the three numbers to show in the page numbers div : 
                // If the target number is a multiple of "3" :-
                // the target number and its lower 3 digits are the page numbers to be shown
                // If the target number is not a multiple of "3" :-
                // Find the closest upper multiple of the target number and show the lower 3 digits as the page numbers;
                $(currentPageSelected).removeClass(disabledClassName);

                var pageNumbersDiv = $(this)
                        .find(".custom-pagination-page-numbers")
                        .children();

                if (targetPageNumber % 3 === 0) {
                    // change the page numbers to : targetPageNumber , targetPagenumber - 1, targetPagenumber - 2
                    $(pageNumbersDiv.get().reverse()).each(function (index, value) {
                        var pageNumberToShow = targetPageNumber - index;
                        $(value).attr("data-custom-pagination-page-number", pageNumberToShow).html(pageNumberToShow);
                    });
                    $(pageNumbersDiv).last().addClass(disabledClassName);
                } else {
                    // If the target page number is not a multiple of 3 
                    var closestPageNumberMultiple = Math.ceil(targetPageNumber / 3.0) * 3;
                    $(pageNumbersDiv.get().reverse()).each(function (index, value) {
                        var pageNumberToShow = closestPageNumberMultiple - index;
                        $(value).attr("data-custom-pagination-page-number", pageNumberToShow).html(pageNumberToShow);
                        if (targetPageNumber == pageNumberToShow) {
                            $(value).addClass(disabledClassName);
                        }
                    });
                }
            }
            if (callBack) // Calling the callback function passed as reference 
            {
                callBack();
            }
        }
    });
