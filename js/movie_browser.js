// API Docs at:
// http://www.omdbapi.com
$(document).ready(function(){
  $("#submit").on("click", function(evt){
    evt.preventDefault()
    $('#movie-detail img').remove()
    $('#movie-detail').text("")
    $("#movie-select").css("visibility","visible")
    movie = $("#movie-search").val()
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "http://www.omdbapi.com/?s="+ movie +"&r=json"
    }).done(function(response){
      console.log(response["Search"])
      $('#movie-select').empty()
      $('#movie-select').append('<option value="">Movies matching '+movie+'...</option>')
      result = response["Search"]
      for(i=0; i<result.length; i++){
        $('#movie-select').append('<option value="'+result[i]["Title"]+'">'+result[i]["Title"]+'</option>')
      }



    }).fail(function(response){
      console.log("ajax failed")
    })

  })
  $('#movie-select').on("change",function(){

    value = $("#movie-select").children("option").filter(":selected").text()
    $('#movie-detail').text(value)
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "http://www.omdbapi.com/?t="+ value +"&r=json"
    }).done(function(response){
      console.log(response)
      $('#movie-detail').append("<img src='"+response["Poster"]+"'>")
    })
  })
})
