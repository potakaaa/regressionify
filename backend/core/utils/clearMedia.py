from django.core.files.storage import default_storage

def clearMedia():
    default_storage.delete('uploads/')
