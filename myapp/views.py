from django.http import JsonResponse, FileResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from .models import  Avaluos, Clientes, Estados, Municipios, Colonias, Tipos, Valuadores, Estatus
import csv

from django.db.models import Q
import io
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
from reportlab.lib import pagesizes

import json

# Create your views here.




def index(request):
    return render(request,'core/index.html')

@login_required
def servicios(request):
   # conteo_tipo_servicio = Tipos.objects.all()
   # avaluos_por_mes = Avaluos.objects.raw("select '1' as avaluoid, CASE WHEN MONTH(dtcreate) = 1 THEN 'Enero' WHEN MONTH(dtcreate) = 2 THEN 'Febrero' WHEN MONTH(dtcreate) = 3 THEN 'Marzo' WHEN MONTH(dtcreate) = 4 THEN 'Abril' WHEN MONTH(dtcreate) = 5 THEN 'Mayo' WHEN MONTH(dtcreate) = 6 THEN 'Junio' WHEN MONTH(dtcreate) = 7 THEN 'Julio' WHEN MONTH(dtcreate) = 8 THEN 'Agosto' WHEN MONTH(dtcreate) = 9 THEN 'Septiembre' WHEN MONTH(dtcreate) = 10 THEN 'Octubre' WHEN MONTH(dtcreate) = 11 THEN 'Noviembre' WHEN MONTH(dtcreate) = 12 THEN 'Diciembre' ELSE 'Esto no es un mes' END AS 'mes', year(dtcreate) as anho,count(*) as numero from avaluos where coloniaid<>50144 group by month(dtcreate), year(dtcreate) order by year(dtcreate) desc, month(dtcreate) desc")
   # return render(request,'core/servicios.html',{
   #      'conteo_tipo_servicio': conteo_tipo_servicio,
   #      'avaluos_por_mes': avaluos_por_mes
   # })
   return render(request,'core/servicios.html')


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


def get_municipios(request, estado_id):
    if estado_id < 1:
        municipios = list(Municipios.objects.values())[0:200]
    else:
        municipios = [list(Municipios.objects.values())[0]]
        municipios += list(Municipios.objects.filter(estado_id=estado_id).values())
    
    if (len(municipios)>1):
            data={'message':"Success",'municipios': municipios}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def get_colonias(request, municipio_id):
    if municipio_id<1:
        colonias = list(Colonias.objects.values())[0:200]
    else:
        colonias = [list(Colonias.objects.values())[0]]
        colonias += list(Colonias.objects.filter(municipio_id=municipio_id).values())
    
    if (len(colonias)>1):
            data={'message':"Success",'colonias': colonias}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def get_avaluos_inic(request):
    avaluos = Avaluos.objects.order_by('-dtsolicitud').select_related('cliente','tipo','valuador','estatus')
    avaluos_dic = []
    for avaluo in avaluos:
        id = str(avaluo.avaluoid)
        cliente = str(avaluo.cliente)
        ubicacion = str(avaluo.calle) 
        dtsolicitud = str(avaluo.dtsolicitud)
        dtvaluador = str(avaluo.dtvaluador)
        dtcliente = str(avaluo.dtcliente)
        dtcobro = str(avaluo.dtcobro)
        dtpago = str(avaluo.dtpago)
        valuador = str(avaluo.valuador)
        estatus = str(avaluo.estatus)
        tipo = str(avaluo.tipo)
        colonia = str(avaluo.colonia.municipio_id)
        avaluos_dic.append({'id': id, 
                            'ubicacion': ubicacion, 
                            'dtsolicitud' : dtsolicitud,
                            'dtvaluador' : dtvaluador,
                            'dtcliente' : dtcliente,
                            'dtcobro' : dtcobro,
                            'dtpago' : dtpago,
                            'cliente': cliente,
                            'valuador':valuador,
                            'estatus': estatus,
                            'tipo': tipo,
                            'colonia':colonia
                            })
    if (len(avaluos_dic)>0):
            data={'message':"Success",'avaluos': avaluos_dic}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def reduce(function, iterable):
    it = iter(iterable)
    if len(list(iterable))>0:
        value = next(it,Q())
        for element in it:
            value = function(value, element)
    else:
        value = Q()
    return value

def operator_and(val1,val2):
    return val1 & val2

def operator_or(val1,val2):
    return val1 | val2



def get_avaluos(request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id):

    ids=[]

    data = [cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id]
    compare = [0,0,0,0,0,0]
    
    if data == compare:
        avaluos = Avaluos.objects.order_by('-dtsolicitud').select_related('cliente','tipo','valuador','estatus')
  
    else:
        if cliente_id != 0:
            ids.append(Q(cliente_id=cliente_id))
        if tipo_id != 0:
            ids.append(Q(tipo_id=tipo_id))
        if valuador_id != 0:
            ids.append(Q(valuador_id=valuador_id))
        if estatus_id != 0:
            ids.append(Q(estatus_id=estatus_id))
        if colonia_id != 0:
            ids.append(Q(colonia_id=colonia_id))
        if municipio_id != 0:
            ids.append(Q(colonia__municipio_id=municipio_id))

        ids_or = []
        if estado_id != 0:
            municipios = list(Municipios.objects.filter(estado_id=estado_id).values())
            if len(municipios)>0:
                for municipio in municipios:
                    municipio_id_loc = municipio["municipio_id"]
                    ids_or.append(Q(colonia__municipio_id=municipio_id_loc))
                    
            else:
                pass

        avaluos = Avaluos.objects.filter(reduce(operator_and,ids) & reduce(operator_or,ids_or)).order_by('-dtsolicitud').select_related('cliente','tipo','valuador','estatus')
    
          
    avaluos_dic = []
    for avaluo in avaluos:
        id = str(avaluo.avaluoid)
        cliente = str(avaluo.cliente)
        ubicacion = str(avaluo.calle) 
        dtsolicitud = str(avaluo.dtsolicitud)
        dtvaluador = str(avaluo.dtvaluador)
        dtcliente = str(avaluo.dtcliente)
        dtcobro = str(avaluo.dtcobro)
        dtpago = str(avaluo.dtpago)
        valuador = str(avaluo.valuador)
        estatus = str(avaluo.estatus)
        tipo = str(avaluo.tipo)
        avaluos_dic.append({'id': id, 
                            'ubicacion': ubicacion, 
                            'dtsolicitud' : dtsolicitud,
                            'dtvaluador' : dtvaluador,
                            'dtcliente' : dtcliente,
                            'dtcobro' : dtcobro,
                            'dtpago' : dtpago,
                            'cliente': cliente,
                            'valuador':valuador,
                            'estatus': estatus,
                            'tipo': tipo,
                            })
        
    if (len(avaluos_dic)>0):
            data={'message':"Success",'avaluos': avaluos_dic}
    else:
        data={'message': "Not Found"}
        
    return JsonResponse(data)


def get_avaluos_bymunicipio(request,municipio_id):
    avaluos = Avaluos.objects.filter(colonia__municipio_id=municipio_id).order_by('-dtsolicitud').select_related('cliente','tipo','valuador','estatus')
    avaluos_dic = []
    if len(avaluos)>0:
        for avaluo in avaluos:
            colonia = str(avaluo.colonia.municipio_id)
            avaluos_dic.append({'colonia': colonia})

        if (len(avaluos_dic)>0):
            data={'message':"Success",'avaluos': avaluos_dic}
    else:
        data={'message': "Not Found"}
    return JsonResponse(data)


def get_avaluos_bydate(request, dtsolicitud_inicial, dtsolicitud_final, dtvaluador_inicial, dtvaluador_final, dtcliente_inicial, dtcliente_final, dtcobro_inicial, dtcobro_final):

    solicitud_range =  Q()
    valuador_range =  Q()
    cliente_range =  Q()
    cobro_range =  Q()

    if (dtsolicitud_inicial != '0000-00-00' and dtsolicitud_inicial != '') and (dtsolicitud_final != '0000-00-00' and dtsolicitud_final != ''):
        solicitud_range = Q(dtsolicitud__range=[dtsolicitud_inicial,dtsolicitud_final])

    if (dtvaluador_inicial != '0000-00-00' and dtvaluador_inicial != '') and (dtvaluador_final != '0000-00-00' and dtvaluador_final != ''):
        valuador_range = Q(dtvaluador__range=[dtvaluador_inicial,dtvaluador_final])

    if (dtcliente_inicial != '0000-00-00' and dtcliente_inicial != '') and (dtcliente_final != '0000-00-00' and dtcliente_final != ''):
        cliente_range = Q(dtcliente__range=[dtcliente_inicial,dtcliente_final])

    if (dtcobro_inicial != '0000-00-00' and dtcobro_inicial != '') and (dtcobro_final != '0000-00-00' and dtcobro_final != ''):
        cobro_range = Q(dtcobro__range=[dtcobro_inicial,dtcobro_final])


    avaluos = Avaluos.objects.filter(solicitud_range & valuador_range & cliente_range & cobro_range).order_by('-dtsolicitud').select_related('cliente','tipo','valuador','estatus')
    
    avaluos_dic = []
    for avaluo in avaluos:
        id = str(avaluo.avaluoid)
        cliente = str(avaluo.cliente)
        ubicacion = str(avaluo.calle) 

        dtsolicitud = str(avaluo.dtsolicitud)
        dtvaluador = str(avaluo.dtvaluador)
        dtcliente = str(avaluo.dtcliente)
        dtcobro = str(avaluo.dtcobro)
        dtpago = str(avaluo.dtpago)

        valuador = str(avaluo.valuador)
        estatus = str(avaluo.estatus)
        tipo = str(avaluo.tipo)
        
        avaluos_dic.append({'id': id, 
                            'ubicacion': ubicacion, 
                            'dtsolicitud' : dtsolicitud,
                            'dtvaluador' : dtvaluador,
                            'dtcliente' : dtcliente,
                            'dtcobro' : dtcobro,
                            'dtpago' : dtpago,
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


def generar_pdf(request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id,colonia_id):
    #Crear Bytestream buffer
    buf = io.BytesIO()
    # Crear canvas
    c = canvas.Canvas(buf,pagesize=letter, bottomup=0)
    #Create a text object
    textob = c.beginText()
    textob.setTextOrigin(inch,inch)
    textob.setFont("Helvetica", 14)

    data = get_avaluos(request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id)
    data = json.loads(data.content)
    avaluos = data['avaluos']
    lines =[]

    for avaluo in avaluos:
        renglon = str(avaluo['id']) + ' ' 
        renglon += avaluo['ubicacion'] + ' '
        renglon += avaluo['cliente'] + ' '
        renglon += avaluo['valuador'] + ' '
        lines.append(renglon)
    #Loop
    for line in lines:
        textob.textLine(line)

    #Finish Up
    c.drawText(textob)
    c.showPage()
    c.save()
    buf.seek(0)

    #Return stuff
    return FileResponse(buf, as_attachment=True, filename='servicios.pdf')


def nuevo_avaluo(request):
    return render(request, 'core/nuevo_avaluo.html')