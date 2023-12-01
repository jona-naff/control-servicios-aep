from django.forms import ModelForm
from .models import Avaluos

class AvaluoForm(ModelForm):
    class Meta: 
        model = Avaluos
        fields=['calle','numero','manzana','lote']