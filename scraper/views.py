# scraper/views.py

import os
import requests
import csv
from PIL import Image
from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import default_storage
import google.generativeai as genai
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import json

# Set up Google Gemini API
API_KEY = "AIzaSyASev_q7HSEJGfTbZXtBWOw7Clhlps_yxQ"
# Use the API key with the GenAI configuration
genai.configure(api_key=API_KEY)

# Gemini model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    tools=[
        genai.protos.Tool(
            google_search_retrieval=genai.protos.GoogleSearchRetrieval(
                dynamic_retrieval_config=genai.protos.DynamicRetrievalConfig(
                    mode=genai.protos.DynamicRetrievalConfig.Mode.MODE_DYNAMIC,
                    dynamic_threshold=0.3,
                ),
            ),
        ),
    ],
)

# Initialize chat session with context
def initialize_chat_session():
    return model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
                    """Context: The objective of ART Finder is to streamline the research phase of ad creation by automating data gathering and analysis. This tool will:
                    Identify user pain points and triggers from multiple data sources such as Google, YouTube, Reddit, Quora, and app reviews.
                    Analyze competitor ads and strategies to uncover high-performing hooks, CTAs, and content formats.
                    Generate actionable insights and suggestions to help marketers craft effective, user-centric ads."""
                ],
            },
        ]
    )

# Function to download image from URL
def download_image_from_url(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
        return save_path
    else:
        return None

# Function to process the image with Gemini (using grounding)
def analyze_image_with_gemini(image_path, prompt=None):
    try:
        # Load the image using PIL
        image = Image.open(image_path)
        
        # Initialize the Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")

        # Define a prompt to send to Gemini for analyzing competitor ads
        base_prompt = '''The image is of my competitor. Extract and analyze competitor ads and strategies 
        to uncover high-performing hooks, CTAs, and content formats. Generate actionable insights and suggestions 
        to help marketers craft effective, user-centric ads.'''

        final_prompt = prompt if prompt else base_prompt

        # Request content generation from Gemini (ground the response with live data)
        response = model.generate_content([final_prompt, image])

        # Return the response text (generated insights)
        return response.text
    except Exception as e:
        return f"Error processing image: {str(e)}"

# Function to save data into a CSV file
def save_data_to_csv(data):
    # Define the CSV file path (this could be absolute or relative)
    csv_file_path = 'scraped_data.csv'

    # Check if the CSV file already exists
    file_exists = os.path.exists(csv_file_path)

    # Open the CSV file in append mode
    with open(csv_file_path, mode='a', newline='') as file:
        writer = csv.writer(file)

        # If the file does not exist, write the header row
        if not file_exists:
            writer.writerow(['Timestamp', 'Image Path', 'Source', 'Generated Content'])

        # Write the new data as a row
        writer.writerow(data)

# View to handle image URL input
def process_image_url(request):
    image_url = request.GET.get('image_url', None)
    prompt = request.GET.get('prompt')  # Get the custom prompt
    if not image_url:
        return JsonResponse({"error": "No image URL provided."}, status=400)

    # Define the path to save the downloaded image
    image_path = "temp_image.jpg"

    # Download the image from the URL
    downloaded_image = download_image_from_url(image_url, image_path)

    if downloaded_image:
        # Process the image using Gemini (extracting insights)
        generated_content = analyze_image_with_gemini(downloaded_image, prompt=prompt)

        # Collect the data to save in the CSV
        data = [datetime.now().strftime('%Y-%m-%d %H:%M:%S'), image_path, 'URL', generated_content]

        # Save the data into a CSV file
        save_data_to_csv(data)

        # Return the generated content in the response
        return JsonResponse({"response": generated_content})
    else:
        return JsonResponse({"error": "Failed to download image from the URL."}, status=400)

# View to handle image upload
def upload_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        uploaded_image = request.FILES['image']
        
        # Save the uploaded image using default_storage
        saved_path = default_storage.save("temp_uploaded_image.jpg", uploaded_image)
        
        # Get the full local filesystem path
        full_path = default_storage.path(saved_path)

        # Process the image using Gemini (pass the absolute path)
        generated_content = analyze_image_with_gemini(full_path)

        # Collect the data to save in the CSV
        data = [datetime.now().strftime('%Y-%m-%d %H:%M:%S'), full_path, 'Upload', generated_content]

        # Save the data into a CSV file
        save_data_to_csv(data)

        # Return the generated content in the response
        return JsonResponse({"response": generated_content})
    else:
        return JsonResponse({"error": "No image uploaded."}, status=400)

def image_form(request):
    return render(request, 'scraper/image_form.html')

@csrf_exempt
def analyze_ads(request):
    if request.method == 'POST':
        try:
            # Parse the JSON data from request body
            data = json.loads(request.body)
            query = data.get('query', '')

            # Initialize chat session
            chat_session = initialize_chat_session()

            # Get response from Gemini
            response = chat_session.send_message(query)

            # Return the response as JSON
            return JsonResponse({
                'status': 'success',
                'response': response.text
            })

        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)

    return JsonResponse({
        'status': 'error',
        'message': 'Method not allowed'
    }, status=405)

def home(request):
    return render(request, 'index.html')
