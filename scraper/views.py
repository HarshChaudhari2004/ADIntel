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

# Set up Google Gemini API
API_KEY = "AIzaSyASev_q7HSEJGfTbZXtBWOw7Clhlps_yxQ"
# Use the API key with the GenAI configuration
genai.configure(api_key=API_KEY)

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
def analyze_image_with_gemini(image_path):
    try:
        # Load the image using PIL
        image = Image.open(image_path)
        
        # Initialize the Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")

        # Define a prompt to send to Gemini for analyzing competitor ads
        prompt = '''The image is of my competitor. Extract and analyze competitor ads and strategies 
        to uncover high-performing hooks, CTAs, and content formats. Generate actionable insights and suggestions 
        to help marketers craft effective, user-centric ads.'''

        # Request content generation from Gemini (ground the response with live data)
        response = model.generate_content([prompt, image])

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
    if not image_url:
        return JsonResponse({"error": "No image URL provided."}, status=400)

    # Define the path to save the downloaded image
    image_path = "temp_image.jpg"

    # Download the image from the URL
    downloaded_image = download_image_from_url(image_url, image_path)

    if downloaded_image:
        # Process the image using Gemini (extracting insights)
        generated_content = analyze_image_with_gemini(downloaded_image)

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
