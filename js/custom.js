$(document).ready(function() {
    $("#form-submit").click(function() {
        uploadToFunction();
    })
    $("#doc-submit").click(function() {
        newdoc();
    })
    $("#info_tab").click(function() {
        $("#info_tab").addClass("tab_active");
        $("#add_rec_tab").removeClass("tab_active");
        $("#view_rec_tab").removeClass("tab_active");
        $("#container1").show();
        $("#container2").hide();
        $("#container3").hide();
        $(".select2:first").width("100%");
        history.replaceState({}, null, "add_record");
        $("#not_found").hide();
    })
    $("#add_rec_tab").click(function() {
        $("#info_tab").removeClass("tab_active");
        $("#view_rec_tab").removeClass("tab_active");
        $("#add_rec_tab").addClass("tab_active");
        $("#container1").hide();
        $("#container2").show();
        $("#container3").hide();
        history.replaceState({}, null, "add_document");
        $("#not_found").hide();
    })
    $("#view_rec_tab").click(function() {
        $("#add_rec_tab").removeClass("tab_active");
        $("#info_tab").removeClass("tab_active");
        $("#view_rec_tab").addClass("tab_active");
        $("#container1").hide();
        $("#container2").hide();
        $("#container3").show();
        $(".select2:last").width("100%");
        history.replaceState({}, null, "view_document");
        $("#not_found").hide();
    })
    $("#viewdrop").change(function() {
        getDocumentdetails();
    })
    getdocumentlist('0');
})

function formSubmit(file_name) {
    var name = $('[name="name"]').val();
    var age = $('[name="age"]').val();
    var add = $('[name="address"]').val();
    var document_id = $("#listdrop").val();
    var error = false;
    if (name == null || name == "") {
        alert("Name can't be blank");
        error = true;
    }

    if (age.length == 0 || age.length > 3) {
        alert("invalid age");
        error = true;
    }
    if (add.length == 0) {
        error = true;
    }
    if (error == false) {
        $.ajax({
            url: "php/insertPerson.php",
            contentType: "JSON",
            type: "GET",
            data: { name: name, age: age, add: add, photo_id: file_name, document_id: document_id },
            timeout: 5000,
            error: function() {
                console.log("error");
            },
            success: function(result) {
                if (result == "success") {
                    $("#container1_alert").text("Record added Successfully");
                }
            }
        })
    } else {
        $("#container1_alert").text("plzz fill all the fields");
    }
}

function newdoc() {
    var docname = $('[name="docname"]').val();
    var error = false;
    if (docname.length == 0) {
        error = true;
    }
    if (error == false) {
        $.ajax({
            url: "php/newform.php",
            contentType: "JSON",
            type: "GET",
            data: { docname: docname },
            timeout: 2000,
            error: function() {
                console.log("error");
            },
            success: function(res) {
                console.log(res);
                getdocumentlist('1');
                $("#info_tab").click();
            }
        })
    } else {
        alert("documentation");
    }
}

function getdocumentlist(ifnew) {
    depopulatedoclist();
    $.ajax({
        url: "php/view.php",
        type: "GET",
        contentType: "JSON",
        success: function(result) {
            populatedocumentlist(result, ifnew);
        }
    });
}

function populatedocumentlist(doc, ifnew) {
    var viewelement = $("#viewdrop");
    var viewelement1 = $("#listdrop");
    var new_id = 0;
    $.each(doc, function(index, view) {
        var x = (view.name).search(' - ');
        var new_date = (new Date((view.name.slice(x + 2)) * 1000)).toString();
        new_date = new_date.slice(4, 21);
        var new_name = view.name.slice(0, x);
        new_id = view.id;
        var optionTag = $("#viewdrop option:first").clone();
        var optionTag1 = $("#listdrop option:first").clone();
        $(optionTag).html(new_name + ' - ' + new_date);
        $(optionTag).attr("value", view.id);
        $(optionTag1).html(new_name + ' - ' + new_date);
        $(optionTag1).attr("value", view.id);
        $(viewelement).append(optionTag);
        $(viewelement1).append(optionTag1);
    });
    if (ifnew == "0") {
        $("#viewdrop").select2();
        $("#listdrop").select2();
    } else {
        console.log(new_id);
        $("#viewdrop").trigger('change');
        $("#listdrop").trigger('change');
        $("#listdrop").val(new_id).trigger('change');
    }
}

function depopulatedoclist() {
    $.each($("#viewdrop option"), function(index, optionEle) {
        if (index > 0) {
            $(optionEle).remove();
        }
    });
    $.each($("#listdrop option"), function(index, optionEle) {
        if (index > 0) {
            $(optionEle).remove();
        }
    });
}

function getDocumentdetails() {
    depopulatedocs();
    var selected = $("#viewdrop").val();
    $.ajax({
        url: "php/showrecords.php",
        type: "GET",
        data: { docname: selected },
        contentType: "JSON",
        success: function(res) {
            showdocumentdetails(res);
        }
    });
}

function showdocumentdetails(showlist) {
    var listelement = $("#listid");
    $.each(showlist, function(index, list) {
        var optionTag = $(".single_element:first").clone();
        $(optionTag).attr('id', 'cloned_element');
        $(optionTag).find("#listname").html(list.person_name);
        $(optionTag).find("#listage").html(list.person_age);
        $(optionTag).find("#listaddress").html(list.person_address);
        $(optionTag).find("#get_photo").attr('src', "images/temp/" + list.person_photo + '.png');
        $(optionTag).show();
        /*  $(optionTag).find("#selector").attr("value", list.person_id) */
        $(listelement).append(optionTag);

    })
}

function depopulatedocs() {
    var listEle = $(".single_element");
    $.each(listEle, function(index, single) {
        if ($(single).attr('id') == 'cloned_element') {
            single.remove();
        }
    })
}