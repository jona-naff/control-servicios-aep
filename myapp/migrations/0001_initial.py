# Generated by Django 4.2.7 on 2023-12-06 17:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clientes',
            fields=[
                ('clienteid', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=250)),
            ],
            options={
                'db_table': 'clientes',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Estados',
            fields=[
                ('estado_id', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=250)),
                ('clave', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'estados',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Estatus',
            fields=[
                ('estatusid', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.CharField(max_length=250)),
            ],
            options={
                'db_table': 'estatus',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Tipos',
            fields=[
                ('tipoid', models.IntegerField(primary_key=True, serialize=False)),
                ('display', models.CharField(max_length=15)),
                ('descripcion', models.CharField(max_length=200)),
                ('consecutivo', models.IntegerField()),
            ],
            options={
                'db_table': 'tipos',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Valuadores',
            fields=[
                ('valuadorid', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=250)),
                ('appaterno', models.CharField(max_length=250)),
                ('apmaterno', models.CharField(max_length=250)),
                ('display', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'valuadores',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Municipios',
            fields=[
                ('municipio_id', models.IntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=250)),
                ('estado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.estados')),
            ],
            options={
                'db_table': 'municipios',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Colonias',
            fields=[
                ('colonia_id', models.IntegerField(primary_key=True, serialize=False)),
                ('cp', models.IntegerField()),
                ('homoclave', models.IntegerField()),
                ('nombre', models.CharField(max_length=250)),
                ('municipio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.municipios')),
            ],
            options={
                'db_table': 'colonias',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Avaluos',
            fields=[
                ('avaluoid', models.IntegerField(primary_key=True, serialize=False)),
                ('calle', models.CharField(max_length=100)),
                ('numero', models.IntegerField()),
                ('edad', models.IntegerField()),
                ('dtsolicitud', models.DateField()),
                ('dtvaluador', models.DateField()),
                ('dtcliente', models.DateField()),
                ('dtcobro', models.DateField()),
                ('dtpago', models.DateField()),
                ('manzana', models.CharField(max_length=50)),
                ('lote', models.CharField(max_length=50)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.clientes')),
                ('colonia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.colonias')),
                ('estatus', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.estatus')),
                ('tipo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.tipos')),
                ('valuador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.valuadores')),
            ],
            options={
                'db_table': 'avaluos',
                'managed': True,
            },
        ),
    ]
