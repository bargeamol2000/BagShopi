function onPassCheck(obj) {
    if($(obj).is(":checked")){
        $("#pass").removeAttr("disabled");
        $("#cpass").removeAttr("disabled");
    }else{
        $("#pass").attr('disabled','disabled');
        $("#cpass").attr('disabled','disabled');
    }
    
  }