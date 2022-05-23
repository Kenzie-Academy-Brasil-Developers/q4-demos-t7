# Generated by Django 4.0.4 on 2022-05-09 13:54

import accounts.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_accounts_is_admin'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='accounts',
            managers=[
                ('objects', accounts.models.AccountsManager()),
            ],
        ),
        migrations.RemoveField(
            model_name='accounts',
            name='username',
        ),
    ]