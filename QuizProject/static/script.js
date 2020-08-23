$.ajax({
    url:'http://127.0.0.1:8000/api/exam/',
    dataType: 'json',
    success: (data)=> {
        for(i=0;i<data.length;i++)
        {
            $(".form-control").append(template(data[i].id,data[i].name));
        }
            }
    });

        var template=(id,name)=>{
        return `<option value=${id}>${name}</option>`;
    }


$('#submitform').submit((e)=>{
    e.preventDefault();
    $.ajax({
        url:'http://127.0.0.1:8000/api/examquestion/',
        data:{
            id:$('#exam_select').val(),
        },
        method:'GET',
        success:(response)=> {
            var i;
            data=[]
            for(i=0;i<response.length;i++){
                data.push(response[i]);
            }
            i=0;
            data2 = data;
            $('#start').on('click',()=>{
                $('#start').hide();
                $('#are').hide();
                if (data2.length == 0 ) {
                    $("#no-questions").show();
                    return;
                }
                else{
                    $("#question-display").show();
    
                    $(".question-place").html(data2[i].question);
                    $(".option1-place").html(data2[i].option1);
                    $(".option2-place").html(data2[i].option2);
                    $(".option3-place").html(data2[i].option3);
                    $(".option4-place").html(data2[i].option4);
                    test(data2,0);
                }
            })
        
            $('#submitform').remove();
            $('#wrapper').show();
        }
    });
});

//console.log(data)
var show_result=(count,total)=>{
$("#count").text(count);
$("#total").text(total);
$("#score").slideDown();
}

$(".exit-btn").click(()=>{
window.location.reload();
});

var test=(data,count)=>{
j = 1;
$(".select-option").click(function(){
    $(".glyphicon-ok").attr("class","glyphicon glyphicon-unchecked col-sm-offset-1");
    $(this).find(".glyphicon").attr("class","glyphicon glyphicon-ok col-sm-offset-1");
    $("#option-answer").val($(this).find(".option").text());
});

$("#after").click(()=>{
        $('#verify').css('background-color','white');
        $('#verify').css("color","black");
        $('#verify').html('Verify')
        $('#verify').prop('disabled', false);
        $('#subwrapper').hide();
    if($("#option-answer").val() == data[j-1].answer){
        count++;
    }
    if(j >= data.length)
    {
        $(".after").hide();
        $(".after-ok").hide();
        $(".after-not-ok").hide();
        $(".glyphicon-ok").attr("class","glyphicon glyphicon-unchecked col-sm-offset-1");
        $(".before").show();
        $("#question-display").hide();
        show_result(count,data.length);
        return;
    }
    $(".question-place").html(data[j].question);
    $(".option1-place").html(data[j].option1);
    $(".option2-place").html(data[j].option2);
    $(".option3-place").html(data[j].option3);
    $(".option4-place").html(data[j].option4);
    $(".after").hide();
    $(".after-ok").hide();
    $(".after-not-ok").hide();
    $(".glyphicon-ok").attr("class","glyphicon glyphicon-unchecked col-sm-offset-1");
    $(".before").show();
    j++;
});
}

$("#verify").click(function(){
     if($("#option-answer").val() == data[j-1].answer)
     {
       $('#verify').css('background-color','#00bc8c',"color","white");
       $('#verify').css("color","white");
       $('#verify').prop('disabled', true);
       $('#verify').html('Correct');
       $('#subwrapper').show();
       answeredCorrectly();
     }
     else{
        $('#verify').css('background-color','#da4328');
        $('#verify').html('Wrong');
        $('#verify').css("color","white");
        $('#subwrapper').show();
        answeredIncorrectly();

     }
 });
 
 answeredCorrectly= function(){
    $('#subwrapper').html('<h2> Correct!</h2>');

}
answeredIncorrectly=function(){
    $('#subwrapper').html('<h2> Incorrect!</h2>');
}