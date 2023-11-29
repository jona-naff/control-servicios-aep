from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name="index"),
    path('servicios/',views.servicios,name="servicios"),
    path('servicios/clientes',views.get_clientes,name="get_clientes"),
    path('servicios/tipos',views.get_tipos,name="get_tipos"),
    path('servicios/valuadores',views.get_valuadores,name="get_valuadores"),
    path('servicios/estatus',views.get_estatus,name="get_estatus"),
    path("servicios/estados/", views.get_estados, name="get_estados"),
    path("servicios/municipios/<int:estadoid>", views.get_municipios, name="get_municipios"),
    path("servicios/colonias/<int:municipioid>", views.get_colonias, name="get_colonias"),
    path("servicios/avaluos/", views.get_avaluos_inic, name="get_avaluos_inic"),
    path("servicios/avaluos/<str:dtsolicitud_inicial>/<str:dtsolicitud_final>/<str:dtcliente_inicial>/<str:dtcliente_final>/<str:dtvaluador_inicial>/<str:dtvaluador_final>/<str:dtcobro_inicial>/<str:dtcobro_final>", views.get_avaluos_bydate, name="get_avaluos_inic"),
    path("servicios/avaluos/<int:cliente_id>/<int:tipo_id>/<int:valuador_id>/<int:estatus_id>/<int:estadoid>/<int:coloniaid>", views.get_avaluos, name="get_avaluos"),
    path('logout/',views.exit,name='exit'),
]

