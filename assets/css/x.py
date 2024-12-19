from google.cloud import storage

def download_json_files(bucket_name, source_folder, destination_folder):
    """Download only .json files from a GCS folder."""
    storage_client = storage.Client.from_service_account_json("C:/Users/boom0\Desktop/프기연(정보과학의 역사)/project/my-service-account-key-file.json")
    bucket = storage_client.bucket(bucket_name)
    blobs = bucket.list_blobs(prefix=source_folder)
    
    L = []
    for blob in blobs:
        destination_path = f"{destination_folder}/{blob.name.split('/')[-1]}"
        blob.download_to_filename(destination_path)
        print(f"Downloaded {blob.name} to {destination_path}")
        if blob.name.endswith('.json'):  # Only download .json files
            L.append(blob.name.split('/')[-1])
    return L

# Example usage
print(download_json_files("informatics_history_main", "posts", "./posts"))
