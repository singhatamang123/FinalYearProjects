from django.db.models.signals import pre_save
from django.contrib.auth.models import User


def updateUser(sender, instance, **kwargs): # to update the user name
    user = instance
    if user.email != '': # if the user has an email address set then set the name to the email address
        user.username = user.email # to set the username as the email

    # print('Signal triggered')


pre_save.connect(updateUser, sender=User)