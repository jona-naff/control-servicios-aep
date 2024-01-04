from django import forms
from django.forms import ModelForm
from .models import Avaluos,Colonias,Estados,Municipios,Comentarios,Honorarios
from django.contrib.auth.models import User, Group

class AvaluoForm(ModelForm):
    #colonias = forms.ModelChoiceField(queryset=Group.objects.all())
    class Meta: 
        model = Avaluos
        fields=['colonia','cliente', 'tipo','valuador','estatus', 'calle','numero','numeroint','entrecalle1','entrecalle2','edad','tipoimb', 'manzana', 'lote','m2t','m2c','dtcreate','dtsolicitud','dtvaluador','dtcliente','dtcobro','dtpago','valor','nofactura','nofolio','monto','imagen']




class ColoniaForm(ModelForm):
    class Meta: 
        model = Colonias
        fields=['colonia_id', 'municipio', 'nombre','cp']


class ComentariosForm(ModelForm):
    class Meta: 
        model = Comentarios
        fields=['avaluo_id','fecha', 'comentario']


class HonorariosForm(ModelForm):
    class Meta: 
        model = Honorarios
        fields=['razon', 'monto']