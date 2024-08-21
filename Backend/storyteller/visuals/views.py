from django.shortcuts import HttpResponse
from django.http import JsonResponse, HttpRequest
from .services.audio_service import AudioService
from django.conf import settings

# Create your views here.
def home(request):
    return HttpResponse("Hello world")


def songList(request):
    try:
        auth = request.META.get('HTTP_AUTHORIZATION')

        if(auth == settings.API_KEY):
            audioCall = AudioService()
            t1 = audioCall.list_audio_files()
            return JsonResponse({"audio": t1})
        
        return JsonResponse({'error': "Not Authorized"}, status=500)
    except Exception as e:
        error_message = str(e)
        return JsonResponse({'error': error_message}, status=500)
    

def songToSkit(request:HttpRequest):
    try:
        auth = request.META.get('HTTP_AUTHORIZATION')
        if(auth == settings.API_KEY):
            audio = request.GET.get('audio')
            audioCall = AudioService()
            t1 = audioCall.vertex_audio_to_play(audio_file=audio)
            return JsonResponse({"output": t1})
            
        return JsonResponse({'error': "Not Authorized"}, status=500)
    except Exception as e:
        error_message = str(e)
        return JsonResponse({'error': error_message}, status=500)


def storyline(request:HttpRequest):
    try:
        auth = request.META.get('HTTP_AUTHORIZATION')
        if(auth == settings.API_KEY):
           
            audioFromStroyLine = request.GET.get('audio')
            getTemp = request.GET.get('temp')
            tempFromStoryLine = float(getTemp)
            promptFromStoryLine = request.GET.get('prompt')

            
            
            audio = AudioService()
            
            
            # invokeAi = audio.vertex_audio_to_text(audio_file=audioFromStroyLine, creativity=tempFromStoryLine, user_prompt=promptFromStoryLine)
            
            # cleaned_output = invokeAi.strip("`").strip("json")
            return JsonResponse({'output': "Option is disabled"},status=200)
        

        return JsonResponse({'error': "Not Authorized"}, status=500)
    except Exception as e:
        error_message = str(e)
        return JsonResponse({'error': error_message}, status=500)


def testing(request:HttpRequest):
    try:
        return JsonResponse({"testing":"Backend testing"})
    except Exception as e:
        error_message = str(e)
        return JsonResponse({'error': error_message}, status=500)


