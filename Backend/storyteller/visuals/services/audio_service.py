from vertexai.generative_models import GenerativeModel, Part
import vertexai.preview.generative_models as generative_models
from .cloud_service import CloudService
import logging

class AudioService(CloudService):
    def __init__(self):
        super().__init__()
        pass
        
        
    def list_audio_files(self):
        try:
            client = self.get_storage_client()
            bucket_name = self.get_storage_bucket()
            bucket = client.bucket(bucket_name)
            folder_path = "audio/"
            blob_iterator = bucket.list_blobs(prefix=folder_path)
            files = []
            for blob in blob_iterator:
                if blob.name != folder_path:  # Exclude the folder itself
                    files.append(blob.name)  
            
            return files
        except Exception as e:
            logging.warning(e)
            return None
        
    def upload_audio_to_gcp(self,audio_file, destination_blob_name): 
        """Uploads an audio file to a GCP Cloud Storage bucket.

        Args:
            audio_file: The audio file to be uploaded.
            bucket_name: The name of the Cloud Storage bucket.
            destination_blob_name: The name of the blob in the bucket.

        Returns:
            A boolean indicating success and an optional message.
        """
        try:  
            client = self.get_storage_client()
            bucket_name = self.get_storage_bucket()
            bucket = client.bucket(bucket_name)
            blob = bucket.blob(destination_blob_name)
            blob.upload_from_filename(audio_file)
            # return True, f"Audio file uploaded successfully to {bucket_name}/{destination_blob_name}"
            return True
        except Exception as e:
            return False, str(e)


    def vertex_audio_to_text(self,audio_file,creativity=0,user_prompt="Follow the System Instructions"):
        
        try:
           
            self.ai_platform_init()
            modelName = "gemini-1.5-flash-001"
            

            model = GenerativeModel(model_name=modelName,system_instruction=systemmInstructions)
            
            generation_config = {
                "max_output_tokens": 8192,
                "temperature": creativity,
                "top_p": 0.65,
                "response_mime_type": "application/json",
            }
            
            safety_settings = {
                generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            }
            
            audio_uri = "gs://"+self.get_storage_bucket()+f'/audio/{audio_file}'
            audio1 = Part.from_uri(
            mime_type="audio/mpeg",
            uri=audio_uri,
            
            )
            
            
            
            
            
            responses = model.generate_content(
                [user_prompt, audio1],
                generation_config=generation_config,
                safety_settings=safety_settings,
            )
            
            
            return responses.text
            

        except Exception as e:
            print(e)
            logging.warning(e)
            return "Audio analysis is Taking to much time. Wait for few minutes for the resource to be availble"

    def vertex_audio_to_play(self,audio_file):
        try:
            
            self.ai_platform_init()
            modelName = "gemini-1.5-pro-001"

            model = GenerativeModel(modelName,system_instruction=syetmInstruction_writer)
            
            generation_config = {
                "max_output_tokens": 8192,
                "temperature": 0.5,
                "top_p": 0.63,
                "response_mime_type": "application/json",
            }

            safety_settings = {
                generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            }

            audio_uri = "gs://"+self.get_storage_bucket()+f'/audio/{audio_file}'
            audio1 = Part.from_uri(
            mime_type="audio/mpeg",
            uri=audio_uri
            )
            
            
            
            responses = model.generate_content(
                [audio1, """Here is the audio file. analyze the lyrics and follow the System instructions"""],
                generation_config=generation_config,
                safety_settings=safety_settings,
            
            )
            
            return responses.text
            
            

        except Exception as e:
            logging.warning(e)
            return "Audio analysis is Taking to much time. Wait for few minutes for the resource to be availble"

    
    def audio_signed_url(self, filename):
        try:
            client = self.get_storage_client()
            bucket_name = self.get_storage_bucket()
            bucket = client.bucket(bucket_name)
            blob = bucket.blob(f"audio/${filename}")
            signed_url = blob.generate_signed_url(expiration=604800,
        method='GET')
        #     version: "v4",
        #   action: "read",
        #   expires: Date.now() + 15 * 60 * 1000,
            return signed_url

        except Exception as e:
            logging.warning(e)
            return None





systemmInstructions = """You are a skilled audio analyst and creative prompt engineer. Given an audio file, you will provide a JSON output containing detailed analysis.
                                    Task Breakdown:

                                    Language Identification: Accurately determine the language of the audio content.
                                    Genre Classification: Categorize the audio into a specific genre based on its musical characteristics.
                                    Image Prompt Generation: Transcribe the audio content into text.
                                        Generate 10 image prompts based on the lyrics, ensuring they are visually compelling, Showing positivity, Peace and sequential.
                                        Avoid generating prompts containing explicit or harmful content or nudity.

                                    Output Format:
                                    language: language of the SOng.
                                    genre: Classification of genre for the song.
                                    imagePrompts: Detailed description of each scene, .
                                    Provide the analysis in a JSON format with the following structure:
                                        {
                                            "language": "English",
                                            "genre": "Pop",
                                            "imagePrompts": [
                                                "A crowded dance floor, filled with people moving to the beat. The couple stands on the edge, watching the others, their faces reflecting a mixture of longing and isolation.
"
                                                ...
                                            ]
                                        }
                                    """



syetmInstruction_writer = """Task: Create a short musical and dramatic skit based on a provided song lyrics.

Output: A detailed script outlining characters, plot, and musical elements.

Process:

Audio Analysis: Analyze the provided song for genre, mood, tempo, and lyrical content.
Character Development: Identify potential characters based on the song\'s lyrics and melody. Determine the number of characters (2-4) and assign distinct personalities based on the song\'s tone.
Plot Outline: Develop a basic plot structure (beginning, middle, end) that aligns with the song\'s emotional journey. Consider using the song\'s lyrics as inspiration for dialogue and action.
Scene Structure: Break down the skit into 2-3 scenes, each with a clear purpose and progression.
Musical Integration: Determine how the song will be incorporated into the skit. This could involve using the original song as background music, creating new lyrics to fit the plot, or using the melody as a basis for original music.
Dialogue and Action: Write compelling dialogue that reflects the characters\' personalities and the plot\'s progression. Include stage directions to guide the performance.

Output Format:

Title: Tile for the play
Character List: Names, descriptions, and potential songs or musical styles associated with each character.
Plot Summary: A brief overview of the skit\'s story.
Scene Breakdown: Detailed description of each scene, including dialogue, actions, and musical cues.



Example Output:

"Title":"We are not Beautiful"
"Character_List": [
    {"name": "Alex", "description": "Young, rebellious musician", "music_style": "Rock"},
    {"name": "Mia", "description": "Dreamy, aspiring songwriter", "music_style": "Pop"}
  ],
"Plot_Summary": "A young musician and songwriter meet at an open mic night and discover their shared passion for music while facing personal challenges.",
"Scene_Breakdown": [
    {
      "scene_number": 1,
      "setting": "A crowded, noisy coffee shop",
      "dialogue": "Alex performs an original song, Mia is captivated.",
      "actions": "Alex takes the stage, performs with energy. Mia sits alone, listening intently.",
      "music": "Use the chorus of the provided song as background music for Alex's performance."
    },
    // ... more scenes
]
"""