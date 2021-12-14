$('#first_name_TextBox').focus();
function validate() {
    if ($('#T_and_C_CheckBox').prop('checked')) {
        return true;
    }
    else {
        if ($(location).attr('href').toUpperCase().indexOf('/AR/') > 0) {
            alert('يجب الموافقة على الشروط والأحكام لإتمام التسجيل.');
        }
        else {
            alert('Accepting the terms & conditions is required.');
        }
        $('#T_and_C_CheckBox').focus();
        return false;
    }
}