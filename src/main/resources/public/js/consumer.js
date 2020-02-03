// $(document).ready(function(){
//     $("#cep").focusout(function(){
//         var cep = $("#cep").val();
//         cep = cep.replace("-", "");
//
//         var urlStr = "https://viacep.com.br/ws/"+ cep +"/json/";
//
//         $.ajax({
//             url : urlStr,
//             type : "get",
//             dataType : "json",
//             success : function(data){
//                 console.log(data);
//
//                 let logradouro = document.getElementById("logradouro");
//                 let complemento = document.getElementById("complemento");
//                 let bairro = document.getElementById("bairro");
//                 let localidade = document.getElementById("localidade");
//                 let uf = document.getElementById("uf");
//                 let unidade = document.getElementById("unidade");
//                 let ibge = document.getElementById("ibge");
//                 let gia = document.getElementById("gia");
//
//
//                 logradouro.value = data.logradouro;
//                 complemento.value = data.complemento;
//                 bairro.value = data.bairro;
//                 localidade.value = data.localidade;
//                 uf.value = data.uf;
//                 unidade.value = data.unidade;
//                 ibge.value = data.ibge;
//                 gia.value = data.gia;
//
//                 logradouro.dispatchEvent(new Event('input'));
//                 complemento.dispatchEvent(new Event('input'));
//                 bairro.dispatchEvent(new Event('input'));
//                 localidade.dispatchEvent(new Event('input'));
//                 uf.dispatchEvent(new Event('input'));
//                 unidade.dispatchEvent(new Event('input'));
//                 ibge.dispatchEvent(new Event('input'));
//                 gia.dispatchEvent(new Event('input'));
//
//             },
//             error : function(erro){
//                 console.log(erro);
//             }
//         });
//     });
// });


