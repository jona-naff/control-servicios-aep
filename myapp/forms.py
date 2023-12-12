from django import forms
from django.forms import ModelForm
from .models import Avaluos,Colonias,Estados,Municipios
from django.contrib.auth.models import User, Group

class AvaluoForm(ModelForm):
    #colonias = forms.ModelChoiceField(queryset=Group.objects.all())
    class Meta: 
        model = Avaluos
        fields=['colonia','cliente', 'tipo','valuador','estatus', 'calle','numero','numeroint','entrecalle1','entrecalle2','edad','tipoimbid', 'manzana', 'lote','m2t','m2c','dtsolicitud','dtcreate','dtvaluador','dtcliente','dtcobro','dtpago','valor','nofactura','nofolio','monto']


class EstadoForm(ModelForm):
    class Meta: 
        model = Estados
        fields=['estado_id', 'nombre']


class MunicipioForm(ModelForm):
    class Meta: 
        model = Municipios
        fields=['municipio_id', 'estado', 'nombre']


class ColoniaForm(ModelForm):
    class Meta: 
        model = Colonias
        fields=['colonia_id', 'municipio', 'nombre']
