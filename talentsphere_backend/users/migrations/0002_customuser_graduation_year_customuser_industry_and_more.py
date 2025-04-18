# Generated by Django 5.0.2 on 2025-04-16 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="graduation_year",
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="industry",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="major",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="organization",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="position",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="university",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
