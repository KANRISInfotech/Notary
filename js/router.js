$(document).ready(function() {
    var url = window.location.href;
    openpage(url);
})

function openpage(url) {
    var x = false;
    if (url.search("add_record") !== -1) {
        $("#info_tab").click();
        x = true;
    }
    if (url.search("add_document") !== -1) {
        $("#add_rec_tab").click();
        x = true;
    }
    if (url.search("view_document") !== -1) {
        $("#view_rec_tab").click();
        x = true;
    }
    if (x == false) {
        $("#page_body").append('<div id="not_found"><p>the page ur requesting is not found</p></div>')
    } else {
        $("#not_found").hide();
    }
}