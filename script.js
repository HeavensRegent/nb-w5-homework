$(document).ready(() => {
    var now = moment();
    var startFrom = 9;
    var endAt = 24;

    //Set the current day at the top of the screen
    $('#currentDay').text(now.format('dddd') + ", " + now.format('MMMM') + ' ' + now.format('Do'));

    //For each hour we want to display (startFrom to endAt)
    var tempDay = moment();
    for(var i = startFrom; i < endAt; i++)
    {
        var rowData = {
            hour: tempDay.set('hour', i).format('hA'),
            value: localStorage.getItem('hour-' + i) || ''
        };        

        buildRow(rowData);
    }

    function buildRow(data) {
        //Build a row with three columns: time slot, input box, button
        var row = $('<div class="row">');

        row.append($('<div class="col sm-1">').text(data.hour));
        row.append($('<div class="col sm-10">').text(data.value));

        var rowButton = $('<div class="col sm-1">');
        rowButton.append($('<button class="save">').attr('data-hour', data.hour))

        row.append(rowButton);

        $('.time-blocks').append(row);
    }

    function saveItem(item) {
        //If there is a value in the input... PS. don't forget to trim
        //Save it to localStorage with the key being "hour-10" and the "input for that hour"'s value as the value
    }

    $('.save').on('click', saveItem);

});