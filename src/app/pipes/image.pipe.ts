import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( image: any, type: string = 'user'): any {

    let url = URL_SERVICES + '/img';

    if (!image) {
      // return defaul image
      return url + '/users/xxx';
    }

    if (image.indexOf('https') >= 0) {
      return image;
    }

    switch (type) {
      case 'user':
        url += '/users/' + image;
        break;
      case 'doctor':
        url += '/doctors/' + image;
        break;
      case 'hospital':
        url += '/hospitals/' + image;
        break;
      default:
        console.log('type of image not supported');
        url += '/users/xxx';
        break;
    }
    return url;
  }

}
