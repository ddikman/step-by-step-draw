
function processData(data, callback){
  data = data.split('\n').filter(function(n) { return n.length > 0; })
  console.log(data);
  data = data.map(function(name, index){
    name = name.trim();
    initials = name.split(' ').reduce(function(final, curr){
      return final + curr[0].toUpperCase()
    }, '');
    return {
      masked: initials,
      unmasked: name,
      id: index
    };
  });

  console.log('got ' + data.length + ' items.');
  callback(data);
}

function loadData(callback) {
  $.ajax({
      url : "names.txt",
      dataType: "text",
      success : function (data) {
          processData(data, callback)
      }
  });
}
