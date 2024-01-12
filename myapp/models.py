from django.forms import ModelForm, Textarea
from django.db import models



class Clientes(models.Model):
    clienteid = models.IntegerField(primary_key=True,blank=True)
    nombre = models.CharField(max_length=250)
    #estatusclt = models.BooleanField(default=1)
    def __str__(self):
        return f"{self.nombre}"   
    
    class Meta:
        managed = True
        db_table = "clientes"


class Tipos(models.Model):
    tipoid = models.IntegerField(primary_key=True,blank=True)
    display = models.CharField(max_length=15)
    descripcion = models.CharField(max_length=200)
    consecutivo = models.IntegerField()
    

    def __str__(self):
        return f"{self.display}"   
    
    class Meta:
        managed = True
        db_table = "tipos"
        
        
class Valuadores(models.Model):
    valuadorid = models.IntegerField(primary_key=True,blank=True)
    nombre = models.CharField(max_length=250)
    appaterno = models.CharField(max_length=250)
    apmaterno = models.CharField(max_length=250)
    display = models.CharField(max_length=10)
    #estatusval = models.BooleanField(default=1)
    
    def __str__(self):
        return f"{self.display}"   
    class Meta:
        managed = True
        db_table = "valuadores"
 
     
        
class Estatus(models.Model):
    estatusid = models.IntegerField(primary_key=True,blank=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=250)
    
    def __str__(self):
        return f"{self.nombre}"   
    
    class Meta:
        managed = True
        db_table = "estatus"
        
class Estados(models.Model):
    estado_id = models.IntegerField(primary_key=True,blank=True)
    nombre = models.CharField(max_length=250)
    clave = models.CharField(max_length=10)
    
    class Meta:
        managed = True
        db_table = "estados"
        

class Municipios(models.Model):
    municipio_id = models.IntegerField(primary_key=True,blank=True)
    #estadoid = models.IntegerField()
    estado = models.ForeignKey(Estados, to_field='estado_id', on_delete=models.CASCADE)

    nombre = models.CharField(max_length=250)
    
    class Meta:
        managed = True
        db_table = "municipios"
        
        
class Colonias(models.Model):
    colonia_id = models.AutoField(primary_key=True)
    #municipioid = models.IntegerField()
    municipio = models.ForeignKey(Municipios, to_field='municipio_id', on_delete=models.CASCADE)
    cp = models.IntegerField()
    homoclave = models.IntegerField()
    nombre = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.nombre}"        
    
    class Meta:
        managed = True
        db_table = "colonias"


class Tiposimb(models.Model):
    tipoimbid = models.IntegerField(primary_key=True,blank=True)
    nombre = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.nombre}"        
    
    class Meta:
        managed = True
        db_table = "tiposimb"
  

class Avaluos(models.Model):
    avaluoid = models.AutoField(primary_key=True)
    #colonia_id = models.IntegerField()
    
    colonia = models.ForeignKey(Colonias, to_field='colonia_id', on_delete=models.CASCADE)

    cliente = models.ForeignKey(Clientes, to_field='clienteid', on_delete=models.CASCADE)
    
    tipo = models.ForeignKey(Tipos, to_field='tipoid', on_delete=models.CASCADE)
    
    valuador = models.ForeignKey(Valuadores, to_field='valuadorid', on_delete=models.CASCADE)
    
    estatus = models.ForeignKey(Estatus, to_field='estatusid', on_delete=models.CASCADE)
    
    calle = models.CharField(max_length=100,blank=True)
    numero = models.IntegerField(blank=True,null=True)
    numeroint = models.IntegerField(blank=True,null=True)

    entrecalle1 = models.CharField(max_length=200,blank=True)
    entrecalle2 = models.CharField(max_length=200,blank=True)

    edad = models.IntegerField(blank=True)

    dtcreate = models.DateField(blank=True)
    dtsolicitud = models.DateField(blank=True)
    dtvaluador = models.DateField(blank=True)
    dtcliente = models.DateField(blank=True)
    dtcobro = models.DateField(blank=True)
    dtpago = models.DateField(blank=True)

    manzana = models.CharField(max_length=50,blank=True)
    lote = models.CharField(max_length=50,blank=True)
    consecutivo = models.IntegerField(blank=True)

    m2t = models.FloatField(blank=True)
    m2c = models.FloatField(blank=True)

    valor = models.FloatField(blank=True)
    nofactura = models.CharField(max_length=50,blank=True)
    monto = models.FloatField(blank=True)
    nofolio = models.ImageField(max_length=50,blank=True)

    tipoimb = models.ForeignKey(Tiposimb, to_field='tipoimbid', blank = True, default='80', on_delete=models.CASCADE)

    dictamen = models.CharField(max_length=100,blank=True)
    proyecto = models.CharField(max_length=200,blank=True)

    imagen = models.ImageField(upload_to="fotos", blank=True,null=True)

    #def __str__(self):
    #    return f"Servicio {self.avaluoid}"    
    
    class Meta:
        managed = True
        db_table = "avaluos"



class Comentarios(models.Model):
    comentario_id = models.AutoField(primary_key=True)
    avaluo_id = models.IntegerField(blank=True)
    fecha = models.DateField(blank=True)
    comentario = models.TextField(max_length=1000,blank=True)
    

    class Meta:
        managed = True
        db_table = "comentarios"

class Honorarios(models.Model):
    honorario_id = models.AutoField(primary_key=True)
    avaluo_id = models.IntegerField(blank=True)
    razon = models.CharField(max_length=250,blank=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2,blank=True)

    class Meta:
        managed = True
        db_table = "honorarios"