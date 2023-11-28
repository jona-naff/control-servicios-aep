$(".nav a").on("click", function(){
    $(".nav a").removeClass("nav-link active");
    $(".nav a").addClass("nav-link");
    $(this).addClass("nav-link active");
    elemento = $(this).attr('href');
    $("#caracteristicas").removeClass();
    $("#caracteristicas").addClass("tab-pane fade");
    $("#fechas").removeClass();
    $("#fechas").addClass("tab-pane fade");
    $("#informacion").removeClass();
    $("#informacion").addClass("tab-pane fade");
    $("#fichas").removeClass();
    $("#fichas").addClass("tab-pane fade");
    $(elemento).removeClass();
    $(elemento).addClass("tab-pane fade active show");
    $('#date').datepicker({
        autoclose:true,
        clearBtn:true,
        container:'.datepicker',
        //endDate:'0d',
        //startDate:'-5d',
        format:'dd-mm-yyyy',
        todayHighlight:true,
    });
  });
