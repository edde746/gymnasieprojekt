# Generated by Django 3.2.7 on 2021-10-26 11:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('description', models.TextField(null=True)),
                ('image', models.ImageField(blank=True, upload_to='staticfiles/uploads/')),
                ('hidden', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Variation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('price', models.IntegerField()),
                ('stock_type', models.IntegerField(choices=[(0, 'Code'), (1, 'Link'), (2, 'Service')], default=0)),
                ('stock', models.TextField(blank=True)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.product')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('variation', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.variation')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('email', models.EmailField(max_length=254)),
                ('paid', models.BooleanField()),
                ('shipped', models.BooleanField()),
                ('payment_id', models.CharField(max_length=256, unique=True)),
                ('products', models.ManyToManyField(to='api.OrderItem')),
            ],
        ),
    ]
