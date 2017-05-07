
function getdata(fordate){
    $.ajax({
        type: "POST",
        url: "https://c95y7sybe4.execute-api.us-west-2.amazonaws.com/prod/PasteBinTrends",
        data: '{"report_date":"'+fordate+'"}',
        success: function(data){
            out = JSON.parse(data)
            if (out.Item == "NONE")
            {
                $("#msg").show()
                $("#msg").html("Sorry we don't have any data for "+fordate)
                $("#trends").hide()
            }
            else
            {
                var tb = ""
                $("#msg").hide()
                $("#trends").show()
                for (x=0;x<out.Item.Data.length;x++){
                    tb = tb + "<tr><td>"+out.Item.Data[x].paste_title+"</td><td>"+out.Item.Data[x].paste_hits+"</td><td>"+out.Item.Data[x].paste_size+"</td><td><a class='lk' href='"+out.Item.Data[x].paste_url+"'>Link</a></td></tr>"
                }
                $("#output").html(tb)
            }
        }
    });
}

$(document).ready(function()
{
    $("#msg").hide()
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var formatted = $.datepicker.formatDate("mm/dd/yy", d);
    $("#datepicker").val(formatted)
    getdata($.datepicker.formatDate("mm-dd-yy", d))
    
    $("#datepicker").datepicker({
        onSelect: function(dateText) {
            var fm = $.datepicker.formatDate("mm-dd-yy", new Date(dateText));
            getdata(fm)
            console.log("Selected date: " + fm);
        }
    });
});