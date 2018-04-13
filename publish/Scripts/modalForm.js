$(function () {
    $.ajaxSetup({ cache: false });
    $("a[data-modal]").on("click", function (e) {
        $("#MyModalContent").load(this.href, function () {
            $("#MyModal").modal({
                //backdrop: 'static',
                keyboard: false
            }, 'show');
            bindForm(this);
        });
        return false;
    });
});

function bindForm(dialog) {
    $('form', dialog).submit(function () {
        var data = new FormData(this.form);
        $.ajax({
            url: this.action,
            type: this.method,
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (result) {
                debugger
                if (result.success) {
                    $("#MyModal").modal('hide');
                    toastr.success(result.message);
                    //table.draw();
                    window.location.href = result.Url;
                    location.reload();
                }
                else {
                    //$("#MyModalContent").html(result);
                    $("#MyModal").modal('show');
                    toastr.error(result.ErrorMessage);
                    bindForm(dialog);
                    //location.reload();
                }
            },
            error: function (xml, message, text) {
                toastr.error("Msg: " + message + ", Text: " + text);
            }
        });
        return false;
    });
}