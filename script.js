$(document).ready(() => {
    var now = moment();
    var startFrom = 9;
    var endAt = 18;

    //Set the current day at the top of the screen
    $('#currentDay').text(now.format('dddd') + ", " + now.format('MMMM') + ' ' + now.format('Do'));

    //For each hour we want to display (startFrom to endAt)
    var tempDay = moment();
    for(var i = startFrom; i <= endAt; i++)
    {
        tempDay.set('hour', i);
        currentHour = parseInt(now.format('H'));

        //Set this to past present or future
        var hourFormat = "future";
        if(i < currentHour)
            hourFormat = "past";
        else if(i === currentHour)
            hourFormat = "present";

        //Create the object passing in the hour, value, and formatting
        var rowData = {
            hour: tempDay.format('hA'),
            value: localStorage.getItem('hour-' + tempDay.format('hA')) || '',
            format: hourFormat
        };        

        //Call the actual build row function
        buildRow(rowData);
    }

    function buildRow(data) {
        //Build a row with three columns: time slot, input box, button
        var row = $('<div class="row">');

        //First hour section
        row.append($('<div class="col-sm-1 hour">').text(data.hour));

        //Input div
        var inputDiv = $('<div class="col-sm-10 ' + data.format + ' pl-0">');
        inputDiv.append($('<textarea>').val(data.value).attr('class', data.hour));
        row.append(inputDiv);

        //Save button with hacky centering...
        var rowButton = $('<div class="col-sm-1 saveBtn">').attr('data-hour', data.hour).attr('style', 'padding: 26px;');
        rowButton.append('<i class="fa fa-save align-middle">');
        row.append(rowButton);

        //Add the row to the page
        $('.time-block').append(row);
    }

    function saveItem(item) {
        //If there is a value in the input... PS. don't forget to trim
        //Save it to localStorage with the key being "hour-10" and the "input for that hour"'s value as the value
        var key = $(this).data('hour');
        var inputVal = $("." + key).val();

        if(!inputVal)
            return;

        inputVal = inputVal.trim();
        localStorage.setItem("hour-" + key, inputVal);
    }

    //Save button click
    $('.saveBtn').on('click', saveItem);

});