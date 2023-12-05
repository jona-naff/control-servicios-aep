from django.forms import ModelForm
from .models import Avaluos

class AvaluoForm(ModelForm):
    class Meta: 
        model = Avaluos
        fields=['avaluoid','calle','numero','manzana','lote']
