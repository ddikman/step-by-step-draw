function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var index = 0;
var root = Math.ceil(Math.sqrt(data.length));
var width = ($(window).width() / root) - 20;
var height = ($(window).height() / root) - 18;
console.log('drawing ' + data.length + ' items');
for(r = 0; r < root; ++r)
{
  row = $('<tr/>');
  for(c = 0; c < root; ++c)
  {
    if(index >= data.length)
      break;

    console.log('drawing item ' + index);
    attendeeNumber = data[index++];

    flipContainer = $('<div/>');
    flipContainer.addClass('flip-container');
    flipContainer.attr('id', 'item-' + parseInt(attendeeNumber));
    flipContainer.css({'width': width + 'px', 'height': height + 'px'})

    flipper = $('<div/>');
    flipper.addClass('flipper');
    flipContainer.append(flipper);

    front = $('<div><span class="text">' + attendeeNumber + '</span></div>');
    front.addClass('front');
    front.css({'width': width + 'px', 'height': height + 'px'})
    flipper.append(front);

    back = $('<div><span class="text">' + attendeeNumber + '</span></div>');
    back.addClass('back');
    back.css({'width': width + 'px', 'height': height + 'px'})
    flipper.append(back);

    var column = $('<td/>');
    column.append(flipContainer);
    row.append(column);
  }
  $('#table').append(row);
}

data = shuffle(data);
console.log('reshuffle stuff')

drawStep = 7;
draws = [1, 2, 3, 5, 10, 20, 30];
drawSpeed = [1000, 2500, 2500, 1500, 300, 200, 10];
//drawSpeed = [1, 1,1, 1,1,1,1,1,1,1]

function remove() {
  var item = Math.floor(Math.random()*data.length);
  console.log('removing ' + data[item] + '>' + item + ' of ' + data.length + ' items.');
  $('#item-' + data[item]).addClass('hover');
  data.splice(item, 1);

  if(data.length > draws[drawStep])
    setTimeout(function(){ remove() }, drawSpeed[drawStep]);
  if(data.length == 1)
    $('#item-' + data[0] + " .front").animate({'background-color': '#a8a8ff', 'border-color': '#a8a8ff'}, 1500);
};

$(document).keydown(function(){
  drawStep--;
  setTimeout(function(){ remove()}, drawSpeed[drawStep]);
});
