// Draw configuration
drawStep = 4;
draws = [1, 3, 5, 10];
drawSpeed = [2500, 1500, 1000, 500];
// drawSpeed = draws.map(function(i) { return 1; }); // minimum for all steps

if (draws.length != drawSpeed.length)
  throw 'Number of elements to leave each draw needs to match draw speed.';

function remove(data) {
  var removeIndex  = Math.floor(Math.random() * data.length);
  item = data[removeIndex]
  console.log('removing ' + item.id);
  $('#item-' + item.id).addClass('hover');
  data.splice(removeIndex, 1);

  console.log('drawsstep = ' + drawStep)
  if(data.length == 1)
  {
    last_item = data[0];
    $('#item-' + last_item.id + " .front").animate({'background-color': '#a8a8ff', 'border-color': '#a8a8ff'}, 1500);
    $('#item-' + last_item.id + ' span.text').text(last_item.unmasked);
  }
  else if(data.length > draws[drawStep])
  {
    console.log('running remove ' + (data.length - draws[drawStep]) + ' from ' + data.length + ' items in ' + drawSpeed[drawStep] + 's');
    setTimeout(function(){ remove(data) }, drawSpeed[drawStep]);
  }
};

function initialize(data){
  data = shuffle(data);
  console.log('shuffled data')

  // Calculate box size
  var root = Math.ceil(Math.sqrt(data.length));
  var width = ($(window).width() / root) - 20;
  var height = ($(window).height() / root) - 18;

  console.log('drawing ' + data.length + ' items');
  var index = 0;
  for(r = 0; r < root; ++r)
  {
    row = $('<tr/>');
    for(c = 0; c < root; ++c)
    {
      if(index >= data.length)
        break;

      item = data[index++]
      console.log('drawing ' + item.id + ', ' + item.masked + ', ' + item.unmasked)

      flipContainer = $('<div/>');
      flipContainer.addClass('flip-container');
      flipContainer.attr('id', 'item-' + item.id);
      flipContainer.css({'width': width + 'px', 'height': height + 'px'})
      flipContainer.attr('title', item.unmasked);

      flipper = $('<div/>');
      flipper.addClass('flipper');
      flipContainer.append(flipper);

      front = $('<div><span class="text">' + item.masked + '</span></div>');
      front.addClass('front');
      front.css({'width': width + 'px', 'height': height + 'px'})
      flipper.append(front);

      back = $('<div><span class="text">' + item.masked + '</span></div>');
      back.addClass('back');
      back.css({'width': width + 'px', 'height': height + 'px'})
      flipper.append(back);

      var column = $('<td/>');
      column.append(flipContainer);
      row.append(column);
    }
    $('#table').append(row);
  }

  $(document).keydown(function(){
    drawStep--;
    console.log('running remove ' + (data.length - draws[drawStep]) + ' from ' + data.length + ' items in ' + drawSpeed[drawStep] + 's');
    setTimeout(function(){ remove(data)}, drawSpeed[drawStep]);
  });
}

loadData(function(data){
  firstDraw = draws[drawStep - 1]
  if (data.length < firstDraw)
  {
    var error = $('<span class="error"/>')
    error.text('First draw is configured to leave ' + firstDraw + ' elements but \
  only ' + data.length + ' items were supplied.')
    $('body').append(error)
  }
  else
    initialize(data);
});
