# Generated by Django 3.2.8 on 2021-11-24 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.AutoField(editable=False, primary_key=True, serialize=False),
        ),
    ]