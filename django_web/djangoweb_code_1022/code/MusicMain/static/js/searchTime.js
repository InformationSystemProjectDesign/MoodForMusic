// $('#newTOold').click(function(){
//     let changeColor = document.getElementById('newTOold');
//     changeColor.style.background= '#808080';

//     $.ajax({
//         type:'POST',
//         url:'http://127.0.0.1:8000/pMailRecord/',
//         data:{
//             csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
//             action:'post'
//         },
//         success:function(){

//         },
//         error:function(xhr, errmsg, err){
//             console.log(xhr)
//             console.log(errmsg)
//             console.log(err)
//         }

//     });
// });



// function ChangeDisabled(value){ 
//     if(value=='1'){ // 當按下篩選
//       let changeColor = document.getElementById('newTOold');
//       changeColor.style.background= '#808080';
//     }else{
//       let changeColor = document.getElementById('newTOold');
//       changeColor.style.background= '#F0F0F0';
//     }
//   }