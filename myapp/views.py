from django.http import JsonResponse, FileResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from .models import  Avaluos, Clientes, Estados, Municipios, Colonias, Tipos, Valuadores, Estatus, Comentarios, Honorarios
from openpyxl import Workbook
import openpyxl
from openpyxl.styles import *
import decimal

import csv

from django.db.models import Q
import io
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
from reportlab.lib import pagesizes
from django.core.serializers import serialize
from reportlab.platypus import PageBreak
import json

from .forms import AvaluoForm, ColoniaForm

from django.core.paginator import Paginator 

import io
from django.http import HttpResponse
from django.views.generic import View
import os

from django.http.response import HttpResponse

from xlsxwriter.workbook import Workbook


from django.views import View
from django.conf import settings
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import Color
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle, KeepTogether, Paragraph
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle


from datetime import date

# Create your views here.




def index(request):
    return render(request,'core/index.html')

@login_required
def servicios(request):
    conteo_tipo_servicio = Tipos.objects.all()
    avaluos_por_mes = Avaluos.objects.raw("select '1' as avaluoid, CASE WHEN MONTH(dtcreate) = 1 THEN 'Enero' WHEN MONTH(dtcreate) = 2 THEN 'Febrero' WHEN MONTH(dtcreate) = 3 THEN 'Marzo' WHEN MONTH(dtcreate) = 4 THEN 'Abril' WHEN MONTH(dtcreate) = 5 THEN 'Mayo' WHEN MONTH(dtcreate) = 6 THEN 'Junio' WHEN MONTH(dtcreate) = 7 THEN 'Julio' WHEN MONTH(dtcreate) = 8 THEN 'Agosto' WHEN MONTH(dtcreate) = 9 THEN 'Septiembre' WHEN MONTH(dtcreate) = 10 THEN 'Octubre' WHEN MONTH(dtcreate) = 11 THEN 'Noviembre' WHEN MONTH(dtcreate) = 12 THEN 'Diciembre' ELSE 'Esto no es un mes' END AS 'mes', year(dtcreate) as anho,count(*) as numero from avaluos where colonia_id<>50144 group by month(dtcreate), year(dtcreate) order by year(dtcreate) desc, month(dtcreate) desc")
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
    p = Paginator(avaluos_dic,40)
    page = request.GET.get('page')
    avaluos_pag = p.get_page(page)
    nums = []
    for i in range(avaluos_pag.paginator.num_pages):
        nums.append(i)
    return render(request,'core/servicios.html',{
         'conteo_tipo_servicio': conteo_tipo_servicio,
         'avaluos_por_mes': avaluos_por_mes,
         'avaluos_pag': avaluos_pag,
         'nums': nums,
    })
   #return render(request,'core/servicios.html')


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
            p = Paginator(avaluos_dic,40)
            page = request.GET.get('page')
            avaluos_pag = p.get_page(page)
            nums = []
            for i in range(avaluos_pag.paginator.num_pages):
                nums.append(i)
            has_previous = avaluos_pag.has_previous()
            paginator_info = {
                'current_page': avaluos_pag.number,
                'num_pages': avaluos_pag.paginator.num_pages,
                'per_page': avaluos_pag.paginator.per_page,
                'count': avaluos_pag.paginator.count,
                'has_previous' : avaluos_pag.has_previous(),
                'has_next' : avaluos_pag.has_next(),
                'nums':nums,
            }

            data={'message':"Success",'paginator_info': paginator_info, "avaluos": avaluos_dic}
            
    else:
        data={'message': "Not Found"}
        
    #return render(request, 'core/paginacion.html', {'avaluos': avaluos_dic,'avaluos_pag': avaluos_pag,'nums':nums,'has_previous': avaluos_pag.has_previous(),'paginator_info': paginator_info})
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



def get_avaluo(request, avaluoid):
    avaluo = Avaluos.objects.raw("SELECT *,  m.nombre as municipio, c.nombre as colo, e.nombre as estado, t.descripcion as tip, cl.nombre as client, va.display as valua, t.descripcion as tipo_desc, es.nombre as est, tp.nombre as tipoimb FROM avaluos as a INNER JOIN colonias AS c on c.colonia_id = a.colonia_id INNER JOIN municipios AS m on m.municipio_id = c.municipio_id INNER JOIN estados AS e on e.estado_id = m.estado_id INNER JOIN tipos AS t on t.tipoid = a.tipo_id INNER JOIN tiposimb AS tp on tp.tipoimbid = a.tipoimbid INNER JOIN clientes AS cl on cl.clienteid = a.cliente_id INNER JOIN valuadores AS va on va.valuadorid = a.valuador_id INNER JOIN estatus AS es on es.estatusid = a.estatus_id where avaluoid = %s; ", [avaluoid])
    comentarios = Comentarios.objects.raw("Select * from comentarios where avaluo_id = %s", [avaluoid])

    honorarios = Honorarios.objects.raw("Select * from honorarios where avaluo_id = %s", [avaluoid])

    return render(request,'core/detalles.html',{
         'avaluo': avaluo,
         'comentarios': comentarios,
         'honorarios': honorarios
    })


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

        avaluos = Avaluos.objects.filter(reduce(operator_and,ids) & reduce(operator_or,ids_or)).order_by('-avaluoid').select_related('cliente','tipo','valuador','estatus')
    

    avaluos_tot = Avaluos.objects.values()
    count_avaluos = 1
    for avaluo in avaluos_tot:
        count_avaluos += 1
    
    
    avaluos_dic = []
    for avaluo in avaluos:
        id = str(avaluo.avaluoid)
        cliente = str(avaluo.cliente)
        municipioid = avaluo.colonia.municipio_id
        municipio = Municipios.objects.filter(municipio_id=municipioid)
        municipio_nombre = municipio[0].nombre
        #estadoid = Municipios.objects.filter(municipio_id=municipioid)
        estadoid = municipio[0].estado.estado_id
        estado = Estados.objects.filter(estado_id=estadoid)
        estado_nombre=estado[0].nombre
        colonia = avaluo.colonia.nombre
        ubicacion = str(avaluo.calle) 
        dtcreate = str(avaluo.dtcreate)
        dtsolicitud = str(avaluo.dtsolicitud)
        dtvaluador = str(avaluo.dtvaluador)
        dtcliente = str(avaluo.dtcliente)
        dtcobro = str(avaluo.dtcobro)
        dtpago = str(avaluo.dtpago)
        valuador = str(avaluo.valuador)
        estatus = str(avaluo.estatus)
        tipo = str(avaluo.tipo)
        consecutivo = str(avaluo.consecutivo)
        tipoimbid = str(avaluo.tipoimbid)
        valor = str(avaluo.valor)
        avaluos_dic.append({'id': id, 
                            'estado': estado_nombre,
                            'municipio': municipio_nombre,
                            'colonia': colonia,
                            'ubicacion': ubicacion, 
                            'dtcreate': dtcreate,
                            'dtsolicitud' : dtsolicitud,
                            'dtvaluador' : dtvaluador,
                            'dtcliente' : dtcliente,
                            'dtcobro' : dtcobro,
                            'dtpago' : dtpago,
                            'cliente': cliente,
                            'valuador':valuador,
                            'estatus': estatus,
                            'tipo': tipo,
                            'consecutivo':consecutivo,
                            'tipoimbid':tipoimbid,
                            'valor': valor
                            })
    
    if (len(avaluos_dic)>0):

            num_pags = len(avaluos_dic)//40 + 1
            num_pags_tot = count_avaluos//40 + 1
            data={'message':"Success",'avaluos': avaluos_dic, 'num_pags': num_pags, 'num_pags_tot': num_pags_tot}
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

def max_words_per_line(cell_width, font_size, text):
    """
    Calculate the maximum number of words that can fit in one line of a table cell.

    Parameters:
    - cell_width: Width of the table cell.
    - font_size: Font size of the text.
    - text: The text for which to calculate the maximum words.

    Returns:
    - The maximum number of words that can fit in one line.
    """
    words = text.split()
    word_widths = [len(word) * font_size * 0.4 for word in words]  # 0.6 is an estimation factor

    current_width = 0
    max_words = 0
    max_words_list = []
    amount_words = 0

    for i, word_width in enumerate(word_widths):
        if i == 0:
            max_words_list += [words[i]]
            amount_words += 1   
            #current_width += word_width
        else:
            current_width += word_width
            if current_width <= cell_width:
                max_words += 1
                amount_words += 1 
                if i==len(words)-1:#words[0: amount_words] == words:
                    max_words_list += ['^^'] + words[amount_words-max_words: amount_words+1]

            else:
                #amount_words += 1   
                if max_words > 0:
                    max_words_list += ['^^'] + words[amount_words-max_words: amount_words+1]
                #else:
                #    max_words_list += ['^^'] + [words[i]]
                current_width = 0
                max_words = 0
                


    return max_words_list


class GeneratePDFView(View):

    
    def get(self, request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id,*args, **kwargs):
        # Create a response object with PDF content type
        response = HttpResponse(content_type='application/pdf')

        # Set the Content-Disposition header to force download
        response['Content-Disposition'] = 'inline; filename="listado.pdf"'

        # Create the PDF using the ReportLab canvas
        p = canvas.Canvas(response, pagesize=letter+(2000,0))

        # Add an image at the beginning of the page
        image_path = os.path.join(settings.STATIC_ROOT, 'imagenes/logo.jpg')
        p.drawImage(image_path, inch - 20, letter[1] -inch -20, width=100, height=70)

        #p.setFont("Helvetica-Bold", 12)

        # Add the text "Hello World" below the image
        #p.drawString(inch + 80, letter[1] - inch + 35, "Avalúos, Proyectos y Servicios")

        p.setFont("Helvetica", 12)

        p.drawString(inch + 80, letter[1] - inch + 15 , "www.aep.com.mx")

        line_start = inch - 20
        line_end = line_start + 510 # Adjust based on text width
        line_y = letter[1] - inch - 20  # Adjust based on the position of the text
        p.line(line_start, line_y, line_end, line_y)

        fill_color_rgb = (207/238, 197/238, 238/238)
        fill_color = Color(*fill_color_rgb)
        p.setFillColor(fill_color)

        # Define the coordinates for the cell
        cell_x = inch -15
        cell_y = letter[1] - inch - 55
        cell_width = 500  # Adjust based on text width
        cell_height = 25  # Adjust based on the desired height

        # Draw a colored cell
        p.rect(cell_x, cell_y, cell_width, cell_height, fill=1,  stroke=0)

        # Set the fill color back to black for the text
        p.setFillColor("black")

        # Add text within the colored cell
        p.drawString(cell_x + 225, cell_y + 8, "Servicios")

        # Move to a new line before adding the table
        p.translate(inch, -2 * inch)

        # Define data for the table
        data = [['Parámetros',''],
                ['Estado', '0'],
                ['Municipio', '0'],
                ['Colonia', '0'],
                ['Tipo de servicio', '0'],
                ['Cliente', '0'],
                ['Valuador', '0'],
                ['Estatus', '0']]

        col_widths = [110, 110]

        # Create the table and set style
        table1 = Table(data,colWidths=col_widths)
        style = [('BACKGROUND', (0, 0), (-1, 0), fill_color),
                            ('TEXTCOLOR', (0, 0), (-1, 0), 'black'),
                            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                            ('INNERGRID', (0, 0), (-1, -1), 0.25, 'black'),
                            ('BOX', (0, 0), (-1, -1), 0.25, 'black'),
                            ('GRID',(0,0),(-1,-1),0.5,colors.black),
                            ('SPAN', (0, 0), (-1, 0))]
        # Add styles for alternating grey colors and border texture
        for i in range(1, len(data)):
            if i % 2 == 1:  # Alternating rows
                style += ([('BACKGROUND', (0, i), (-1, i), Color(0.9, 0.9, 0.9)),
                               ('BOX', (0, i), (-1, i), 0.25, 'black'),
                               ('BOTTOMPADDING', (0, i), (-1, i), 5)])
            if i % 2 == 0:  # Alternating rows
                style += ([('BACKGROUND', (0, i), (-1, i), Color(0.8, 0.8, 0.8)),
                            ('BOX', (0, i), (-1, i), 0.25, 'black'),
                            ('BOTTOMPADDING', (0, i), (-1, i), 5)])
        

        style = TableStyle(style)

        table1.setStyle(style)

        # Draw the table on the canvas
        table1.wrapOn(p, 400,400)
        table1.drawOn(p, inch-75, 635)
        
        data2 = [['Fechas','',''],
        ['Fecha','Inicio','Fin'],
        ['Solicitud', '',''],
        ['Alta', '',''],
        ['Entrega cliente', '',''],
        ['Entrega valuador', '',''],
        ['Cobro', '',''],
        ['Pago', '','']]

        col_widths2 = [80, 80]
        table2 = Table(data2,colWidths=col_widths2)
        style = [('BACKGROUND', (0, 0), (-1, 1), fill_color),
                            ('TEXTCOLOR', (0, 0), (-1, 0), 'black'),
                            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                            ('INNERGRID', (0, 0), (-1, -1), 0.25, 'black'),
                            ('BOX', (0, 0), (-1, -1), 0.25, 'black'),
                            ('GRID',(0,0),(-1,-1),0.5,colors.black),
                            ('SPAN', (0, 0), (-1, 0))]
        for i in range(2, len(data)):
            if i % 2 == 1:  # Alternating rows
                style += ([('BACKGROUND', (0, i), (-1, i), Color(0.9, 0.9, 0.9)),
                               ('BOX', (0, i), (-1, i), 0.25, 'black'),
                               ('BOTTOMPADDING', (0, i), (-1, i), 5)])
            if i % 2 == 0:  # Alternating rows
                style += ([('BACKGROUND', (0, i), (-1, i), Color(0.8, 0.8, 0.8)),
                            ('BOX', (0, i), (-1, i), 0.25, 'black'),
                            ('BOTTOMPADDING', (0, i), (-1, i), 5)])
            
        style = TableStyle(style)
        table2.setStyle(style)

        # Draw the table on the canvas
        table2.wrapOn(p, 400,400)
        table2.drawOn(p, inch+165, 637)


        #data3 = self.get_avaluos(request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id)
        avaluos = get_avaluos(request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id)
        avaluos = json.loads(avaluos.content)
        avaluos = avaluos['avaluos']
        
        data3 = []#[['Id','Dirección', 'Fechas','Cliente','Estatus', 'Folio','Tipo Inmueble','Valor']]

        col_widths3 = [35,95,70,65,62,75,67,63]

        for avaluo in avaluos:
            small_style = getSampleStyleSheet()
            custom_style = ParagraphStyle(
                'custom_style',
                parent=small_style['BodyText'],
                alignment=1,
                fontSize=8,  # Adjust the font size as needed
            )
            folio = avaluo['tipo']  + '-' + avaluo['cliente'] + '/' + '^^' + avaluo['dtcreate'][5:7] + '-' + avaluo['dtcreate'][2:4] + '/' + '^^' +avaluo['consecutivo'] + '-' + avaluo['valuador']
            folio = Paragraph(folio.replace('^^', '<br />'), custom_style)#getSampleStyleSheet()['BodyText'])
            #ubicacion = Paragraph(avaluo['ubicacion'].replace(' ', '<br />'), getSampleStyleSheet()['BodyText'])
            estado = max_words_per_line(col_widths3[1], 12, avaluo['estado'])
            #print(estado)
            estado = ' '.join([str(item) for item in estado])

            municipio = max_words_per_line(col_widths3[1], 12, avaluo['municipio'])
            municipio = ' '.join([str(item) for item in municipio])

            colonia = max_words_per_line(col_widths3[1], 12, avaluo['colonia'])
            colonia = ' '.join([str(item) for item in colonia])
            
            calle = max_words_per_line(col_widths3[1], 12, avaluo['ubicacion'])
            calle = ' '.join([str(item) for item in calle])
            
            ubicacion =  estado + ',' + '^^' + municipio + ',' + '^^' + colonia + ',' + '^^' + calle #avaluo['estado'] + ',' + '^^' + avaluo['municipio'] + ',' + '^^'  + avaluo['colonia']
            #estado = Paragraph(estado.replace('^^', '<br />'), getSampleStyleSheet()['BodyText'])
            fechas = avaluo['dtsolicitud'] + '^^' + avaluo['dtvaluador'] + '^^' + avaluo['dtcliente'] + '^^' + avaluo['dtcobro']
            fechas = Paragraph(fechas.replace('^^', '<br />'), custom_style)#getSampleStyleSheet()['BodyText'])
            #municipio = Paragraph(municipio.replace('^^', '<br />'), getSampleStyleSheet()['BodyText'])
            
        
            ubicacion = Paragraph(ubicacion.replace('^^', '<br />'), custom_style)#getSampleStyleSheet()['BodyText'], custom_style)
            
            #ubicacion.wrapOn(p,"Helvetica", 6)
            cliente = Paragraph(avaluo['cliente'].replace(' ', '<br />'), custom_style)#getSampleStyleSheet()['BodyText'])
            estatus = Paragraph(avaluo['estatus'].replace(' ', '<br />'), custom_style)#getSampleStyleSheet()['BodyText'])
            data3.append([avaluo['id'],ubicacion,fechas,cliente,estatus,folio,avaluo['tipoimbid'],avaluo['valor']])

        

        style = [('BACKGROUND', (0, 0), (-1, 0), fill_color),
                            ('TEXTCOLOR', (0, 0), (-1, 0), 'black'),
                            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                            ('INNERGRID', (0, 0), (-1, -1), 0.25, 'black'),
                            ('BOX', (0, 0), (-1, -1), 0.25, 'black'),
                            ('GRID',(0,0),(-1,-1),0.5,colors.black),
                            ('SPAN', (1, 0), (1, 0))]
        # Add styles for alternating grey colors and border texture
        page_size = letter[1]
        count = 0
        count_sec = [0]
        num_pages = 0
        data_global = []
        style_list = []
        for i in range(1, len(data3)):
            style_index = i - count
            if i % 2 == 1:  # Alternating rows
                style += ([('BACKGROUND', (0, style_index), (-1, style_index), Color(0.9, 0.9, 0.9)),
                               ('BOX', (0, style_index), (-1, style_index), 0.25, 'black'),
                               ('BOTTOMPADDING', (0, style_index), (-1, style_index), 5)])
            if i % 2 == 0:  # Alternating rows
                style += ([('BACKGROUND', (0, style_index), (-1, style_index), Color(0.8, 0.8, 0.8)),
                            ('BOX', (0, style_index), (-1, style_index), 0.25, 'black'),
                            ('BOTTOMPADDING', (0, style_index), (-1, style_index), 5)])
            new_data = [['Id','Dirección', 'Fechas','Cliente','Estatus', 'Folio','Tipo Inmueble','Valor']]+data3[count:i]
            table3 = Table(new_data, colWidths=col_widths3)
            table3.setStyle(style)
            w, h = table3.wrap(0, 0)

            # Check if adding the table to the current page exceeds the available space
            if num_pages == 0:
                logic_condition = h > (page_size - 510)
            else:
                logic_condition = h > (page_size - 370)
            if logic_condition:
                # Start a new page
                #p.showPage()
                num_pages += 1
                #current_page_height = 0 
                count = i
                count_sec.append(i)
                style_list.append(style)
                data_global.append(new_data)
                style = [('BACKGROUND', (0, 0), (-1, 0), fill_color),
                            ('TEXTCOLOR', (0, 0), (-1, 0), 'black'),
                            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                            ('INNERGRID', (0, 0), (-1, -1), 0.25, 'black'),
                            ('BOX', (0, 0), (-1, -1), 0.25, 'black'),
                            ('GRID',(0,0),(-1,-1),0.5,colors.black),
                            ('SPAN', (1, 0), (1, 0))]
                
            #else:
            #    current_page_height = h  # Update the current page height
        
        new_data = [['Id','Dirección', 'Fechas','Cliente','Estatus', 'Folio','Tipo Inmueble','Valor']]+data3[count:]
        data_global.append(new_data)
        style = [('BACKGROUND', (0, 0), (-1, 0), fill_color),
                                    ('TEXTCOLOR', (0, 0), (-1, 0), 'black'),
                                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                                    ('INNERGRID', (0, 0), (-1, -1), 0.25, 'black'),
                                    ('BOX', (0, 0), (-1, -1), 0.25, 'black'),
                                    ('GRID',(0,0),(-1,-1),0.5,colors.black),
                                    ('SPAN', (1, 0), (1, 0))]
        for i in range(1, len(data_global[-1])):
       
            if i % 2 == 1:  # Alternating rows
                style += ([('BACKGROUND', (0, i), (-1, i), Color(0.9, 0.9, 0.9)),
                               ('BOX', (0, i), (-1, i), 0.25, 'black'),
                               ('BOTTOMPADDING', (0, i), (-1, i), 5)])
            if i % 2 == 0:  # Alternating rows
                style += ([('BACKGROUND', (0,i), (-1, i), Color(0.8, 0.8, 0.8)),
                            ('BOX', (0, i), (-1, i), 0.25, 'black'),
                            ('BOTTOMPADDING', (0, i), (-1, i), 5)])
        style_list.append(style)
        if num_pages < 1:
            #print(len(data3))
            #print(len(style))
            data_global.append(data3)
            style_list.append(style)
            table3 = Table(data_global[0], colWidths=col_widths3)
            table3.setStyle(style_list[0]) #[count_sec[0]:3*(count_sec[1]+1)])
            w, h = table3.wrap(0, 0)

            table3.wrapOn(p, 800,800)
            table3.drawOn(p, inch-130, 610 - h)
            p.setFillColor("black")
            p.setFont("Helvetica", 8)
            footer = "Av. Río Mixcoac 88-201. Col. Actipan del Valle, Alcaldía Benito Juárez, Ciudad de México 03100 Teléfonos 5662-1573 "
            p.drawString(inch - 90, letter[1]/2-200, footer)

            p.showPage()

        else:
            for i in range(num_pages+1):

                table3 = Table(data_global[i], colWidths=col_widths3)
                table3.setStyle(style_list[i]) 
                w, h = table3.wrap(0, 0)
            
                table3.wrapOn(p, 800,800)
                
                if i==0:
                    x_coord = inch-100
                    y_coord = 610 - h
    
                else:

                    p.drawImage(image_path, inch - 20, letter[1] -inch -20, width=100, height=70)

                    #p.setFont("Helvetica-Bold", 12)

                    # Add the text "Hello World" below the image
                    #p.drawString(inch + 80, letter[1] - inch + 35, "Avalúos, Proyectos y Servicios")

                    p.setFont("Helvetica", 12)

                    p.drawString(inch + 80, letter[1] - inch + 15 , "www.aep.com.mx")

                    line_start = inch - 20
                    line_end = line_start + 510 # Adjust based on text width
                    line_y = letter[1] - inch - 20  # Adjust based on the position of the text
                    p.line(line_start, line_y, line_end, line_y)

                    fill_color_rgb = (207/238, 197/238, 238/238)
                    fill_color = Color(*fill_color_rgb)
                    p.setFillColor(fill_color)

                    

                    # Move to a new line before adding the table
                    p.translate(inch, -2 * inch)
                    
                    x_coord = inch-100
                    y_coord = 820 - h
                #p.setFont("Helvetica", 10)
                table3.drawOn(p, x_coord, y_coord)
                p.setFillColor("black")
                p.setFont("Helvetica", 8)
                footer1 = "Av. Río Mixcoac 88-201. Col. Actipan del Valle, Alcaldía Benito Juárez, Ciudad de México 03100 Teléfonos 5662-1573 "
                p.drawString(inch - 90, letter[1]/2-210, footer1)
                footer2 = "E-mail:info@aep.com.mx"
                p.drawString(inch - 90, letter[1]/2-220, footer2)
                footer3 = "5663-4892"
                p.drawString(inch + 293, letter[1]/2-220, footer3)
                tot_pags = num_pages + 1
                current_page = i+1
                current_page = 'página' + '' + str(current_page) + '/' + str(tot_pags)
                p.drawString(inch + 400, letter[1]/2-220, current_page)
                today = date.today()
                # dd/mm/YY
                d1 = today.strftime("%d/%m/%Y")
                p.drawString(inch + 400, letter[1]/2-210, d1)

                p.showPage()

        
        p.save()

        return response






def generar_excel(request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id):
    # Your dictionary data
    data = get_avaluos(request, cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id)
    data = json.loads(data.content)
    avaluos = data['avaluos']
    data = {
        'Id':[],
        'Ubicacion':[],
        'Fechas':[],
        'Cliente':[],
        'Valuador':[],
        'Estatus':[],
    }
    for avaluo in avaluos:
        data["Id"].append(avaluo["id"])
        data["Ubicacion"].append(avaluo["ubicacion"])
        data["Fechas"].append(avaluo["dtsolicitud"])
        data["Cliente"].append(avaluo["cliente"])
        data["Valuador"].append(avaluo["valuador"])
        data["Estatus"].append(avaluo["estatus"])



    # Create a response object with appropriate Excel headers
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="output.xlsx"'

    # Create a new Excel workbook and add a worksheet
    workbook = openpyxl.Workbook()
    worksheet = workbook.active

    # Write headers to the Excel file and apply formatting
    headers = list(data.keys())
    for col_num, header in enumerate(headers, start=1):
        cell = worksheet.cell(row=1, column=col_num, value=header)
        cell.font = openpyxl.styles.Font(bold=True)
        cell.fill = openpyxl.styles.PatternFill(start_color="C0C0C0", end_color="C0C0C0", fill_type="solid")

    # Write data to the Excel file and apply formatting
    num_rows = max(len(data[field]) for field in headers)
    for row_num in range(1, num_rows + 1):
        for col_num, field in enumerate(headers, start=1):
            cell = worksheet.cell(row=row_num + 1, column=col_num, value=data[field][row_num - 1])
            cell.alignment = openpyxl.styles.Alignment(wrap_text=True)

    # Save the workbook to the response
    workbook.save(response)
    

    return response


def nuevo_avaluo(request):
    if request.method == 'GET':       
        return render(request, 'core/nuevo_avaluo.html',{
            'AvaluoForm': AvaluoForm
        })
    else: 
        try:
            form = AvaluoForm(request.POST)
            nuevo_avaluo = form.save(commit=False)
            nuevo_avaluo.save()
            print(nuevo_avaluo)
            return redirect('servicios')
        except ValueError:
            return render(request, 'core/nuevo_avaluo.html',{
            'form': AvaluoForm,
            'error': 'Please provide valide data'
                })


def nueva_colonia(request):
    if request.method == 'GET':       
        return render(request, 'core/nueva_colonia.html',{
            'ColoniaForm': ColoniaForm
        })
    else: 
        try:
            form = ColoniaForm(request.POST)
            nueva_colonia = form.save(commit=False)
            nueva_colonia.save()
            print(nueva_colonia)
            return redirect('servicios')
        except ValueError:
            return render(request, 'core/nueva_colonia.html',{
            'form': ColoniaForm,
            'error': 'Please provide valide data'
                })