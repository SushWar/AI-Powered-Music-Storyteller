from django.conf import settings
from google.cloud import storage
import google.cloud.aiplatform as aiplatform

class CloudService(object):
    def __init__(self) -> None:
        self.__cred = settings.GS_CREDENTIALS
        self.__client = storage.Client(credentials=self.__cred)
        self.projectName = settings.PROJECT_NAME
        self.location = settings.LOCATION
        self.__bucket = settings.GS_BUCKET_NAME
        pass

    def get_storage_client(self):
        return self.__client
    
    def get_storage_bucket(self):
        return self.__bucket
    
    def project_name(self):
        return self.projectName
    
    def ai_platform_init(self) -> None:
        aiplatform.init(project=self.projectName, location=self.location, credentials=self.__cred, staging_bucket=self.__bucket)
        pass
    