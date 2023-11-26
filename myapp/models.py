from django.forms import ModelForm, Textarea
from django.db import models



class Clientes(models.Model):
    clienteid = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.nombre}"   
    
    class Meta:
        managed = True
        db_table = "clientes"


class Tipos(models.Model):
    tipoid = models.IntegerField(primary_key=True)
    display = models.CharField(max_length=15)
    descripcion = models.CharField(max_length=200)
    consecutivo = models.IntegerField()

    def __str__(self):
        return f"{self.display}"   
    
    class Meta:
        managed = True
        db_table = "tipos"
        
        
class Valuadores(models.Model):
    valuadorid = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=250)
    appaterno = models.CharField(max_length=250)
    apmaterno = models.CharField(max_length=250)
    display = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.display}"   
    class Meta:
        managed = True
        db_table = "valuadores"
 
     
        
class Estatus(models.Model):
    estatusid = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)
    
    def __str__(self):
        return f"{self.nombre}"   
    
    class Meta:
        managed = True
        db_table = "estatus"

class Avaluos(models.Model):
    avaluoid = models.IntegerField(primary_key=True)
    coloniaid = models.IntegerField()
    
    cliente = models.ForeignKey(Clientes, to_field='clienteid', on_delete=models.CASCADE)
    
    tipo = models.ForeignKey(Tipos, to_field='tipoid', on_delete=models.CASCADE)
    
    valuador = models.ForeignKey(Valuadores, to_field='valuadorid', on_delete=models.CASCADE)
    
    estatus = models.ForeignKey(Estatus, to_field='estatusid', on_delete=models.CASCADE)
    
    calle = models.CharField(max_length=100)
    numero = models.IntegerField()
    edad = models.IntegerField()
    dtsolicitud = models.DateField()
    dtvaluador = models.DateField()
    dtcliente = models.DateField()
    dtcobro = models.DateField()
    dtpago = models.DateField()
    manzana = models.CharField(max_length=50)
    lote = models.CharField(max_length=50)

    def __str__(self):
        return f"Avaluo {self.avaluoid}"    
    
    class Meta:
        managed = True
        db_table = "avaluos"
        
        
class Estados(models.Model):
    estadoid = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=250)
    clave = models.CharField(max_length=10)
    
    class Meta:
        managed = False
        db_table = "estados"
        

class Municipios(models.Model):
    municipioid = models.IntegerField(primary_key=True)
    estadoid = models.IntegerField()
    nombre = models.CharField(max_length=250)
    
    class Meta:
        managed = False
        db_table = "municipios"
        
        
class Colonias(models.Model):
    coloniaid = models.IntegerField(primary_key=True)
    municipioid = models.IntegerField()
    nombre = models.CharField(max_length=250)
    
    
    class Meta:
        managed = False
        db_table = "colonias"
  
