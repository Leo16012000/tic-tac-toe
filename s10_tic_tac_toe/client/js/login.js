$(document).ready(function(){
    $('.modal-content').on('click', '.container button', function(e){
         e.preventDefault();
         
         let usr = document.getElementById('usr').value;
 
         let psw = document.getElementById('psw').value;
 
        
         $.post( "/login", { username: usr, password: psw}).done(function(isLogin){
 
             console.log(isLogin);
             
             if(isLogin == 'wrong'){
                 $('.note-error').html('Tên đăng nhập hoặc mật khẩu bạn nhập không đúng.');
                 console.log('oke');
             }
             else{
                window.location.href = "/";
             }
 
         });
    });
    
    $('#id01 .registerbtn').on('click', function(){
        $('.modal-content').html(`
         <div class="container">
         <label for="uname"><b>Tên đăng nhập</b></label>
         <input id="usr" type="text" placeholder="Nhập tên đăng nhập" name="uname" required>
     
         <label for="psw"><b>Mật khẩu</b></label>
         <input id="psw" type="password" placeholder="Nhập mật khẩu" name="psw" required>
             
         <button id="submitRegister" type="submit">Đăng ký</button>
         </div>
        `)
    })
 
    $('.modal').on('click', '#submitRegister', function(){
     e.preventDefault();
         
     let usr = document.getElementById('usr').value;
 
     let psw = document.getElementById('psw').value;
 
     $.post( "/signup", { username: usr, password: psw}).done(function(isRegister){
 
         console.log(isRegister);
         
         if(isRegister){
             console.log('oke');
         }
 
     });
    })
 });