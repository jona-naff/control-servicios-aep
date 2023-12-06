from django.forms import ModelForm
from .models import Avaluos

class AvaluoForm(ModelForm):
    class Meta: 
        model = Avaluos
        fields=['colonia','cliente','tipo','valuador','estatus', 'calle','numero','manzana', 'lote']
