# Generated by Django 4.2.7 on 2023-12-11 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avaluos',
            name='avaluoid',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]