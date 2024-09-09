# Generated by Django 5.1.1 on 2024-09-04 00:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("github", "0035_alter_issue_labels"),
    ]

    operations = [
        migrations.AlterField(
            model_name="issue",
            name="state",
            field=models.CharField(
                choices=[("open", "Open"), ("closed", "Closed")],
                default="open",
                max_length=20,
                verbose_name="State",
            ),
        ),
    ]