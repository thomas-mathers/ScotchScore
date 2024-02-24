import { ReactImageGalleryItem } from 'react-image-gallery';

function mapImageToGalleryItem(src: string): ReactImageGalleryItem {
  return {
    original: src,
    thumbnail: src,
  };
}

export default mapImageToGalleryItem;
