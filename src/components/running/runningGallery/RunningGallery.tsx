import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './RunningGallery.module.css';
import GalleryData from '../../Gallery/galleryJSON.json';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

interface Gallery {
  string: string[],
}

interface RunningGalleryProps {
  galleryKey: 'galleryOne';
}

type ImageObject = {
  original: string;
  thumbnail: string;
  originalHeight: string;
}

interface RunningGalleryState {
  galleryData: string[] | null;
  moduleGalleryData: ReactImageGalleryItem[] | null;
}

export class RunningGallery
  extends React.Component<RunningGalleryProps, RunningGalleryState> {
  constructor(props: RunningGalleryProps) {
    super(props);

    this.state = {
      galleryData: [],
      moduleGalleryData: [],
    };
  }

  componentDidMount(): void {
    this.findUrls();
  }

  componentDidUpdate(prevProps: Readonly<RunningGalleryProps>, prevState: Readonly<RunningGalleryState>, snapshot?: any): void {
    const {galleryData} = this.state;

    if(galleryData && !prevState.galleryData) {
    }
  }

  findUrls = () => {
    const {galleryKey} = this.props;

    const galleryData: string[] = GalleryData[galleryKey];
    const moduleGalleryData: ReactImageGalleryItem[] = [...GalleryData.galleryTwo];
    moduleGalleryData.map((imgObj) => {
      const height = (window.innerHeight/2)
      imgObj.originalHeight = height;
      // imgObj.thumbnail = `../../../img/${imgObj.thumbnail}`;
    })



    this.setState({ galleryData, moduleGalleryData });
  }

  createGallery = () => {
    const {galleryData} = this.state;
    return galleryData.map((image) => {
      const imageThumb = require(`../../../img/${image}`)
      return (
        <div className={styles.galleryImage}
          style={
            {
              backgroundImage: `url(${imageThumb}`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',          }
          }
        >
        </div>
      )
    })
  }

  render() {
    const {} = this.props;
    const {galleryData, moduleGalleryData} = this.state;

    return (
      <div className={styles.RunningGallery}>
        gallery
          {/* {galleryData && this.createGallery()} */}
          {moduleGalleryData.length && 
            <div className={styles.galleryContainer}>
              <ImageGallery
                showBullets
                items={moduleGalleryData}
              />
            </div>
          }
      </div>
    );
  }
}

export default RunningGallery;