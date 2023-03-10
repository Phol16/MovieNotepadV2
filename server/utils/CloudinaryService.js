import cloudinary from 'cloudinary'

class CloudinaryService {
  static serviceName = 'CloudinaryService';

  constructor(cloudName, apiKey, apiSecret){
    this.cloudinary = cloudinary.v2;
    this.cloudName = cloudName;
    this.config = this.cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }
  get uploader() {
    return this.cloudinary.uploader;
  }

}

export default CloudinaryService;