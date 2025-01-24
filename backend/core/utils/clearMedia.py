from django.core.files.storage import default_storage
from file_upload.models import File
def clearMedia():
    File.objects.all().delete()
    
    files = default_storage.listdir('uploads/')
    for file in files[1]:
        default_storage.delete(f'uploads/{file}')
        
    

# this could be optimized.. somehow..