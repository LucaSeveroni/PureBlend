$(document).ready(function () {

    $("#btn-calculate").click(function () {
        calculate();
    });

    $("#btn-reset").click(function () {
        resetForm();
    });

    resetForm();
});


function resetForm() {
    $("#txt-med").val('37000');
    $("#txt-es").val('210000');
    $("#txt-fyk").val('500');
    $("#txt-ys").val('1.15');
    $("#txt-yc").val('1.5');
    $("#txt-fck").val('40');
    $("#txt-b").val('3368');
    $("#txt-h").val('1900');
    $("#txt-cover").val('50');
    $("#txt-links").val('12');
    $("#txt-bars-diameter-b").val('40');
    $("#txt-n-bars-b").val('78');
    $("#txt-as1").val('');
    $("#txt-h-b").val('');
    $("#txt-bars-diameter-t").val('40');
    $("#txt-n-bars-t").val('26');
    $("#txt-as2").val('');
    $("#txt-h-t").val('');
    $("#txt-fcd").val('');
    $("#txt-fyd").val('');
    $("#txt-ec").val('');
    $("#txt-es-bilanced-cracking").val('');
    $("#txt-y").val('');
    $("#txt-es-2").val('');
    $("#txt-es-2-perc").val('');
    $("#txt-es-3").val('');
    $("#txt-es-3-perc").val('');
    $("#txt-mrd").val('');
    $("#txt-mrd-med").val('');
    $("#txt-mrd-med-logic").val('');
}

function calculate() {
    var as1 = $("#txt-n-bars-b").val() * Math.PI * Math.pow($("#txt-bars-diameter-b").val(), 2) / 4;
    $("#txt-as1").val(as1.toFixed(2));

    var h_bottom = $("#txt-h").val() - $("#txt-cover").val() - $("#txt-links").val() - $("#txt-bars-diameter-b").val() / 2;
    $("#txt-h-b").val(h_bottom.toFixed(1));

    var as2 = $("#txt-n-bars-t").val() * Math.PI * Math.pow($("#txt-bars-diameter-t").val(), 2) / 4;
    $("#txt-as2").val(as2.toFixed(2));

    var h_top = parseFloat($("#txt-cover").val()) + parseFloat($("#txt-links").val()) + parseFloat($("#txt-bars-diameter-t").val()) / 2;
    $("#txt-h-t").val(h_top.toFixed(1));

    var fcd = 0.85 * $("#txt-fck").val() / $("#txt-yc").val();
    $("#txt-fcd").val(fcd.toFixed(2));

    var fyd = $("#txt-fyk").val() / $("#txt-ys").val();
    $("#txt-fyd").val(fyd.toFixed(2));

    $("#txt-ec").val(0.0035 * 1000);

    var es_bilanced_cracking = $("#txt-fyd").val() / $("#txt-es").val() * 1000;
    $("#txt-es-bilanced-cracking").val(es_bilanced_cracking.toFixed(3));

    var temp_a = 0.8 * fcd * $("#txt-b").val();
    var temp_b = (as2 * $("#txt-es").val() * ($("#txt-ec").val() / 1000)) - (as1 * fyd);
    var temp_c = 0- (as2 * $("#txt-es").val() * ($("#txt-ec").val() / 1000) * $("#txt-h-t").val());
       
    var y = 0-(temp_b - Math.sqrt(Math.pow(temp_b, 2) - 4 * temp_a * temp_c)) / (2 * temp_a);
    $("#txt-y").val(y.toFixed(1));
   

    var es_2 = $("#txt-ec").val() * ((h_bottom - y) / y);
    $("#txt-es-2").val(es_2.toFixed(5));
    $("#txt-es-2-perc").val(es_2.toFixed(2));

    var es_3 = $("#txt-ec").val() * ((y - h_top) / y);
    $("#txt-es-3").val(es_3.toFixed(5));
    $("#txt-es-3-perc").val(es_3.toFixed(2));


    var mrd = (0.8 * fcd * $("#txt-b").val() * y * (y - 0.4 * y) + as1 * fyd * (h_bottom - y)) * Math.pow(10, -6) + as2 * $("#txt-es").val() * (($("#txt-ec").val() / 1000)* (y - h_top) / y ) * (y - h_top) * Math.pow(10, -6);
    $("#txt-mrd").val(mrd.toFixed(1));
    

    var med_mrd = $("#txt-med").val() / $("#txt-mrd").val();
    $("#txt-mrd-med").val(med_mrd.toFixed(2));

    if (parseFloat($("#txt-mrd-med").val()) <= 1) {
        $("#txt-mrd-med-logic").val('OK');
    } else {
        $("#txt-mrd-med-logic").val('NOT OK');
    }
}