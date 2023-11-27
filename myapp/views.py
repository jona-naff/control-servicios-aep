from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from .models import  Avaluos, Clientes, Estados, Municipios, Colonias, Tipos, Valuadores, Estatus
from django.db.models import Q
# Create your views here.

def index(request):
    return render(request,'core/index.html')

@login_required
def servicios(request):
    conteo_tipo_servicio = Tipos.objects.all()
    avaluos_por_mes = Avaluos.objects.raw("select '1' as avaluoid, CASE WHEN MONTH(dtcreate) = 1 THEN 'Enero' WHEN MONTH(dtcreate) = 2 THEN 'Febrero' WHEN MONTH(dtcreate) = 3 THEN 'Marzo' WHEN MONTH(dtcreate) = 4 THEN 'Abril' WHEN MONTH(dtcreate) = 5 THEN 'Mayo' WHEN MONTH(dtcreate) = 6 THEN 'Junio' WHEN MONTH(dtcreate) = 7 THEN 'Julio' WHEN MONTH(dtcreate) = 8 THEN 'Agosto' WHEN MONTH(dtcreate) = 9 THEN 'Septiembre' WHEN MONTH(dtcreate) = 10 THEN 'Octubre' WHEN MONTH(dtcreate) = 11 THEN 'Noviembre' WHEN MONTH(dtcreate) = 12 THEN 'Diciembre' ELSE 'Esto no es un mes' END AS 'mes', year(dtcreate) as anho,count(*) as numero from avaluos where coloniaid<>50144 group by month(dtcreate), year(dtcreate) order by year(dtcreate) desc, month(dtcreate) desc")
    return render(request,'core/servicios.html',{
         'conteo_tipo_servicio': conteo_tipo_servicio,
         'avaluos_por_mes': avaluos_por_mes
    })


def exit(request):
    logout(request)
    return redirect('index')


def get_clientes(request):
    clientes=list(Clientes.objects.values())
    
    if (len(clientes)>0):
        data={'message':"Success",'clientes':clientes}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)
  
  
    
def get_tipos(request):
    tipos=list(Tipos.objects.values())
    
    if (len(tipos)>0):
        data={'message':"Success",'tipos': tipos}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)



def get_valuadores(request):
    valuadores=list(Valuadores.objects.values())
    
    if (len(valuadores)>0):
        data={'message':"Success",'valuadores': valuadores}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def get_estatus(request):
    estatus=list(Estatus.objects.values())
    
    if (len(estatus)>0):
        data={'message':"Success",'estatus': estatus}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)
   


def get_estados(request):
    estados=list(Estados.objects.values())
    
    if (len(estados)>0):
        data={'message':"Success",'estados':estados}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def get_municipios(request, estadoid):
    if estadoid < 1:
        municipios = list(Municipios.objects.values())[0:200]
    else:
        municipios = [list(Municipios.objects.values())[0]]
        municipios += list(Municipios.objects.filter(estadoid=estadoid).values())
    
    if (len(municipios)>1):
            data={'message':"Success",'municipios': municipios}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def get_colonias(request, municipioid):
    if municipioid<1:
        colonias = list(Colonias.objects.values())[0:200]
    else:
        colonias = [list(Colonias.objects.values())[0]]
        colonias += list(Colonias.objects.filter(municipioid=municipioid).values())
    
    if (len(colonias)>1):
            data={'message':"Success",'colonias': colonias}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def get_avaluos_inic(request):
    avaluos = Avaluos.objects.select_related('cliente','tipo','valuador','estatus')
    avaluos_dic = []
    for avaluo in avaluos:
        id = str(avaluo.avaluoid)
        cliente = str(avaluo.cliente)
        ubicacion = str(avaluo.calle) 
        fechas = str(avaluo.dtsolicitud)
        valuador = str(avaluo.valuador)
        estatus = str(avaluo.estatus)
        tipo = str(avaluo.tipo)
        
        avaluos_dic.append({'id': id, 
                            'ubicacion': ubicacion, 
                            'fechas' : fechas,
                            'cliente': cliente,
                            'valuador':valuador,
                            'estatus': estatus,
                            'tipo': tipo
                            })
    if (len(avaluos_dic)>0):
            data={'message':"Success",'avaluos': avaluos_dic}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def reduce(function, iterable):
    it = iter(iterable)
    value = next(it)
    for element in it:
        value = function(value, element)
    return value

def operator_and(val1,val2):
    return val1 & val2


def get_avaluos(request, cliente_id, tipo_id, valuador_id, estatus_id, coloniaid):

    ids=[]

    data = [cliente_id, tipo_id, valuador_id, estatus_id, coloniaid]
    compare = [0,0,0,0,0]
    
    if data == compare:
        avaluos = Avaluos.objects.select_related('cliente','tipo','valuador','estatus')
  
    else:
        if cliente_id != 0:
            ids.append(Q(cliente_id=cliente_id))
        if tipo_id != 0:
            ids.append(Q(tipo_id=tipo_id))
        if valuador_id != 0:
            ids.append(Q(valuador_id=valuador_id))
        if estatus_id != 0:
            ids.append(Q(estatus_id=estatus_id))
        if coloniaid != 0:
            ids.append(Q(coloniaid=coloniaid))
            

        avaluos = Avaluos.objects.filter(reduce(operator_and,ids)).select_related('cliente','tipo','valuador','estatus')

          
    avaluos_dic = []
    for avaluo in avaluos:
        id = str(avaluo.avaluoid)
        cliente = str(avaluo.cliente)
        ubicacion = str(avaluo.calle) 
        fechas = str(avaluo.dtsolicitud)
        valuador = str(avaluo.valuador)
        estatus = str(avaluo.estatus)
        tipo = str(avaluo.tipo)
        
        avaluos_dic.append({'id': id, 
                            'ubicacion': ubicacion, 
                            'fechas' : fechas,
                            'cliente': cliente,
                            'valuador':valuador,
                            'estatus': estatus,
                            'tipo': tipo
                            })
        
    if (len(avaluos_dic)>0):
            data={'message':"Success",'avaluos': avaluos_dic}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)

