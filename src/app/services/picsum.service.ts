import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';

const BASE = 'https://picsum.photos';
const sizeLabels = ['ORIGINAL', 'LARGE', 'MEDIUM', 'SMALL'] as const;
type ImageSizeLabel = typeof sizeLabels[number];
export interface DownloadOption {
  label: string;
  sizes: string;
  url: string;
};
const enum sizeCoeficient {
  large = 1.37083,
  medium = 2.05625,
  small = 4.1125
};

@Injectable({
  providedIn: 'root'
})
export class PicsumService {

  lastX: boolean = true;

  constructor() { }

  public fetchPictures(page: number = 1, limit: number = 30): Promise<Image[]> {
    const query = BASE + '/v2/list?page=' + page + '&limit=' + limit;
    return fetch(query).then(response => response.json());
  }

  getOptimizedImage(img: Image, index: number) {
    if (index % 30 === 0) {
      this.lastX = true;
    }
    if (index % 10 === 0) {
      this.lastX = !this.lastX;
    }
    if (index % 2 !== 0) {
      return BASE + '/id/' + img.id + '/' + 412 + '/' + (this.lastX ? 520 : 276);
    } else {
      return BASE + '/id/' + img.id + '/' + 412 + '/' + (this.lastX ? 276 : 520);
    }
  }

  getDetailsImage(img: Image) {
    const maxWidth = 480
    const maxHeight = 600;
    var ratio = Math.min(maxWidth / img.width!, maxHeight / img.height!);

    const newWidth = Math.round(img.width! * ratio);
    const newHeight = Math.round(img.height! * ratio);

    return BASE + '/id/' + img.id + '/' + newWidth + '/' + newHeight;
  }

  getAlbumImage(imageId: string) {
    return BASE + '/id/' + imageId + '/' + 190 + '/' + 190;
  }

  getDownloadImageSizes(image: Image, label: ImageSizeLabel): DownloadOption {
    switch (label) {
      case 'ORIGINAL': return {
        label,
        sizes: `${image?.width}x${image?.height}`,
        url: `${BASE}/id/${image?.id}/${image?.width}/${image?.height}`
      };
      case 'LARGE': return {
        label,
        sizes: `${Math.floor((image?.width || 1) / sizeCoeficient.large)}x${Math.floor((image?.height || 1) / sizeCoeficient.large)}`,
        url: `${BASE}/id/${image?.id}/${Math.floor((image?.width || 1) / sizeCoeficient.large)}/${Math.floor((image?.height || 1) / sizeCoeficient.large)}`
      };
      case 'MEDIUM': return {
        label,
        sizes: `${Math.floor((image?.width || 1) / sizeCoeficient.medium)}x${Math.floor((image?.height || 1) / sizeCoeficient.medium)}`,
        url: `${BASE}/id/${image?.id}/${Math.floor((image?.width || 1) / sizeCoeficient.medium)}/${Math.floor((image?.height || 1) / sizeCoeficient.medium)}`
      };
      case 'SMALL': return {
        label,
        sizes: `${Math.floor((image?.width || 1) / sizeCoeficient.small)}x${Math.floor((image?.height || 1) / sizeCoeficient.small)}`,
        url: `${BASE}/id/${image?.id}/${Math.floor((image?.width || 1) / sizeCoeficient.small)}/${Math.floor((image?.height || 1) / sizeCoeficient.small)}`
      };
    }
  }

  getDownalodOptions(image: Image): DownloadOption[] {
    const options: DownloadOption[] = [];
    debugger;
    sizeLabels.forEach((sizeLabel: ImageSizeLabel) => {
      options.push(this.getDownloadImageSizes(image, sizeLabel));
    })
    return options;
  }

  async downloadImage(downloadUrl: string) {
    const image = await fetch(downloadUrl);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
  
    const link = document.createElement('a');
    link.href = imageURL;

    // Splits id, width and height to generate image name
    const parts = downloadUrl.replace(`${BASE}/id/`, '').split('/');
    link.download = `image-${parts[0]}-${parts[1]}x${parts[2]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
