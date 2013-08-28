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
    $("#txt-es").val('206000');
    $("#txt-fyk").val('500');
    $("#txt-ys").val('1.15');
    $("#txt-yc").val('1.5');
    $("#txt-acc").val('0.85');
    $("#txt-fck").val('40');
    $("#txt-b").val('1000');
    $("#txt-h").val('250');
    $("#txt-cover").val('35');
    $("#txt-links").val('10');
    $("#txt-bars-diameter").val('25');
    $("#txt-n-bars").val('4');
    $("#txt-as1").val('');
    $("#txt-h2").val('');
    $("#txt-fcd").val('');
    $("#txt-fyd").val('');
    $("#txt-ec").val('');
    $("#txt-es-bilanced-cracking").val('');
    $("#txt-y").val('');
    $("#txt-es-2").val('');
    $("#txt-es-perc").val('');
    $("#txt-mrd").val('');
    $("#txt-med").val('100');
    $("#txt-mrd-med").val('');
}

function calculate() {
    var as1 = $("#txt-n-bars").val() * Math.PI * Math.pow($("#txt-bars-diameter").val(), 2) / 4;
    $("#txt-as1").val(as1.toFixed(2));

    var h2 = $("#txt-h").val() - $("#txt-cover").val() - $("#txt-links").val() - $("#txt-bars-diameter").val() / 2;
    $("#txt-h2").val(h2.toFixed(1));

    var fcd = $("#txt-acc").val() * $("#txt-fck").val() / $("#txt-yc").val();
    $("#txt-fcd").val(fcd.toFixed(2));

    var fyd = $("#txt-fyk").val() / $("#txt-ys").val();
    $("#txt-fyd").val(fyd.toFixed(2));

    $("#txt-ec").val(0.0035 * 1000);

    var es_bilanced_cracking = $("#txt-fyd").val() / $("#txt-es").val() * 1000;
    $("#txt-es-bilanced-cracking").val(es_bilanced_cracking.toFixed(3));

    var y = $("#txt-as1").val() * $("#txt-fyd").val() / (0.8 * $("#txt-fcd").val() * $("#txt-b").val());
    $("#txt-y").val(y.toFixed(1));

    var es_2 = $("#txt-ec").val() * (($("#txt-h2").val() - $("#txt-y").val()) / $("#txt-y").val());
    $("#txt-es-2").val(es_2.toFixed(3));

    $("#txt-es-perc").val(es_2.toFixed(2));

    var mrd = 0;
    if (parseFloat($("#txt-es-perc").val()) >= parseFloat($("#txt-es-bilanced-cracking").val())) {
        mrd = (0.8 * $("#txt-fcd").val() * $("#txt-b").val() * $("#txt-y").val() * ($("#txt-y").val() - 0.4 * $("#txt-y").val()) + $("#txt-as1").val() * $("#txt-fyd").val() * ($("#txt-h2").val() - $("#txt-y").val())) * Math.pow(10, -6);
        $("#txt-mrd").val(mrd.toFixed(1));
    } else {
        $("#txt-mrd").val('BARS NOT YIELDED')
    }

    if (parseFloat($("#txt-mrd").val()) >= parseFloat($("#txt-med").val())) {
        $("#txt-mrd-med").val('OK');
    } else {
        $("#txt-mrd-med").val('NOT OK');
    }
}