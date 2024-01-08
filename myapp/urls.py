from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.index,name="index"),
    path('servicios/',views.servicios,name="servicios"),
    path('servicios/clientes',views.get_clientes,name="get_clientes"),
    path('servicios/tipos',views.get_tipos,name="get_tipos"),
    path('servicios/tiposimb',views.get_tiposimb,name="get_tiposimb"),
    path('servicios/valuadores',views.get_valuadores,name="get_valuadores"),
    path('servicios/estatus',views.get_estatus,name="get_estatus"),
    path("servicios/estados/", views.get_estados, name="get_estados"),
    path("servicios/municipios/<int:estado_id>", views.get_municipios, name="get_municipios"),
    path("servicios/colonias/<int:municipio_id>", views.get_colonias, name="get_colonias"),
    path("servicios/avaluos/", views.get_avaluos_inic, name="get_avaluos_inic"),
    path("servicios/avaluos/bydate/<str:dtsolicitud_inicial>/<str:dtsolicitud_final>/<str:dtcliente_inicial>/<str:dtcliente_final>/<str:dtvaluador_inicial>/<str:dtvaluador_final>/<str:dtcobro_inicial>/<str:dtcobro_final>", views.get_avaluos_bydate, name="get_avaluos_inic"),
    path("servicios/avaluos/<int:cliente_id>/<int:tipo_id>/<int:valuador_id>/<int:estatus_id>/<int:estado_id>/<int:municipio_id>/<int:colonia_id>/<str:dtcreate_inicial>/<str:dtcreate_final>/<str:dtsolicitud_inicial>/<str:dtsolicitud_final>/<str:dtcliente_inicial>/<str:dtcliente_final>/<str:dtvaluador_inicial>/<str:dtvaluador_final>/<str:dtcobro_inicial>/<str:dtcobro_final>/<str:dtpago_inicial>/<str:dtpago_final>", views.get_avaluos, name="get_avaluos"),
    #path('servicios/avaluos/generar_pdf/<int:cliente_id>/<int:tipo_id>/<int:valuador_id>/<int:estatus_id>/<int:estado_id>/<int:municipio_id>/<int:colonia_id>',views.generar_pdf,name="generar_pdf"),
    path('servicios/avaluos/generar_pdf/<int:cliente_id>/<int:tipo_id>/<int:valuador_id>/<int:estatus_id>/<int:estado_id>/<int:municipio_id>/<int:colonia_id>/<str:dtcreate_inicial>/<str:dtcreate_final>/<str:dtsolicitud_inicial>/<str:dtsolicitud_final>/<str:dtcliente_inicial>/<str:dtcliente_final>/<str:dtvaluador_inicial>/<str:dtvaluador_final>/<str:dtcobro_inicial>/<str:dtcobro_final>/<str:dtpago_inicial>/<str:dtpago_final>',views.GeneratePDFView.as_view(),name="GeneratePDFView"),
    path("servicios/avaluos/generar_excel/<int:cliente_id>/<int:tipo_id>/<int:valuador_id>/<int:estatus_id>/<int:estado_id>/<int:municipio_id>/<int:colonia_id>/<str:dtcreate_inicial>/<str:dtcreate_final>/<str:dtsolicitud_inicial>/<str:dtsolicitud_final>/<str:dtcliente_inicial>/<str:dtcliente_final>/<str:dtvaluador_inicial>/<str:dtvaluador_final>/<str:dtcobro_inicial>/<str:dtcobro_final>/<str:dtpago_inicial>/<str:dtpago_final>", views.generar_excel, name="generar_excel"),
    path("servicios/avaluos/nuevo_avaluo", views.nuevo_avaluo, name="nuevo_avaluo"),
    path("servicios/avaluos/nueva_colonia", views.nueva_colonia, name="nueva_colonia"),
    path('logout/',views.exit,name='exit'),
    path("servicios/avaluo/<int:avaluoid>", views.get_avaluo, name="get_avaluo"),
    path("servicios/last_serv", views.get_details, name="get_details"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)