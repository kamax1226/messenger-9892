from django.db import models

from . import utils
from .conversation import Conversation


class Cmembers(utils.CustomModel):
    conversationId = models.IntegerField(null=False)
    userId = models.IntegerField(null=False)
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)
    