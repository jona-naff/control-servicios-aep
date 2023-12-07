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
        
class Estados(models.Model):
    estado_id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=250)
    clave = models.CharField(max_length=10)
    
    class Meta:
        managed = True
        db_table = "estados"
        

class Municipios(models.Model):
    municipio_id = models.IntegerField(primary_key=True)
    #estadoid = models.IntegerField()
    estado = models.ForeignKey(Estados, to_field='estado_id', on_delete=models.CASCADE)

    nombre = models.CharField(max_length=250)
    
    class Meta:
        managed = True
        db_table = "municipios"
        
        
class Colonias(models.Model):
    colonia_id = models.IntegerField(primary_key=True)
    #municipioid = models.IntegerField()
    municipio = models.ForeignKey(Municipios, to_field='municipio_id', on_delete=models.CASCADE)
    cp = models.IntegerField()
    homoclave = models.IntegerField()
    nombre = models.CharField(max_length=250)
    
    
    class Meta:
        managed = True
        db_table = "colonias"
  

class Avaluos(models.Model):
    avaluoid = models.IntegerField(primary_key=True)
    #colonia_id = models.IntegerField()
    
    colonia = models.ForeignKey(Colonias, to_field='colonia_id', on_delete=models.CASCADE)

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
        return f"Servicio {self.avaluoid}"    
    
    class Meta:
        managed = True
        db_table = "avaluos"