import { createApi } from 'unsplash-js';
import fetch from 'node-fetch';
import fs from 'fs';

export class Unsplash {
  constructor(accessKey) {
    // Create an instance of the Unsplash API using the provided access key
    this.unsplash = createApi({ accessKey, fetch });
  }

  async getRandom(count, path, query) {
    try {
      const response  = await this.unsplash.photos.getRandom({
        topicIds: ['Wallpapers'],
        featured: true,
        count: count,
      });

      for (const { id: photoId, urls: { regular: photoUrl } } of response.response) {
        await this.fetchPhoto({ id: photoId, urls: { regular: photoUrl } }, path);
      }

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async fetchPhoto(photo, path) {
    const photoId = photo.id;
    const photoUrl = photo.urls.regular;
    const photoResponse = await fetch(photoUrl);
    const photoBuffer = await photoResponse.arrayBuffer();
    const image = Buffer.from(photoBuffer);
    const contentType = photoResponse.headers.get('Content-Type');
    const fileExtension = contentType.split('/')[1];
    const filePath = `${path}/${photoId}.${fileExtension}`;
    await this.savePhoto(filePath, image);
  }
  async savePhoto(filePath, image) {
    if (fs.existsSync(filePath)) {
      console.log(`${filePath} already exists`);
      return;
    }
  
    await fs.promises.writeFile(filePath, image);
    console.log(`${filePath} saved`);
  }
}

