from django.forms import ModelForm
from .models import Avaluos,Colonias

class AvaluoForm(ModelForm):
    class Meta: 
        model = Avaluos
        fields=['colonia','cliente','tipo','valuador','estatus', 'calle','numero','manzana', 'lote']


class ColoniaForm(ModelForm):
    class Meta: 
        model = Colonias
        fields=['colonia_id', 'municipio', 'nombre']
